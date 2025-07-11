import { useState, useRef, useEffect } from 'react';
import { json } from 'stream/consumers';
import axios from 'axios';
import firebase from '@/config/firebase.config';
import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
import {
  doc,
  onSnapshot,
  query,
  collection,
  getDocs,
  where,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { currentSession } from '@/config/session';

const BARS = 8;
const useAudioRecorder = () => {
  const currentUser = currentSession() as any;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>('');
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(
    new Uint8Array(BARS).fill(0)
  ); // 6 bars
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array>(new Uint8Array(16)); // fftSize/2

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support audio recording');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new window.AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 32; // Small fftSize for 16 frequency bins
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      analyserRef.current = analyser;

      source.connect(analyser);

      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      const updateFrequencyData = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArrayRef.current);

          // Aggregate into 4 bars
          const aggregatedData = new Uint8Array(BARS);
          const binsPerBar = dataArrayRef.current.length / BARS;
          for (let i = 0; i < BARS; i++) {
            let sum = 0;
            for (let j = 0; j < binsPerBar; j++) {
              sum += dataArrayRef.current[i * binsPerBar + j];
            }
            aggregatedData[i] = sum / binsPerBar;
          }

          setFrequencyData(aggregatedData);
          requestAnimationFrame(updateFrequencyData);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      updateFrequencyData(); // Start updating frequency data
    } catch (error) {
      console.error('Error accessing microphone', error);
    }
  };

  const handleStopRecording = async () => {
    // const collectionD = collectionToUpdate ? collectionToUpdate : 'sellerspan';
    return new Promise((resolve, reject) => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.onstop = async () => {
          try {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: 'audio/mp3',
            });
            localStorage.setItem('audioBlob', JSON.stringify(audioBlob));
            const rand = Math.floor(Math.random() * (2000000 - 100 + 1)) + 100;

            const storageRef = ref(
              firebase.storage,
              `documents/${`audio_` + rand}.mp3`
            );
            await uploadBytes(storageRef, audioBlob);
            const downloadURL = await getDownloadURL(storageRef);
            audioChunksRef.current = [];
            console.log('blob', downloadURL);

            resolve(downloadURL);  // Resolve the promise with the audioBlob
          } catch (error) {
            reject(error);  // Reject the promise in case of an error
          }
        };

        mediaRecorderRef.current.stop();  // This triggers the onstop event
        setFrequencyData(new Uint8Array(BARS).fill(0));
        setIsRecording(false);
        analyserRef.current = null; // Stop updating frequency data
      } else {
        reject(new Error('MediaRecorder is not initialized'));
      }
    });
  };

  const handlePlayAudio = async (base64Audio: string) => {
    setIsPlaying(true);
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }
    const audioContext = audioContextRef.current;
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 32;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    analyserRef.current = analyser;

    const updateFrequencyData = () => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        const aggregatedData = new Uint8Array(BARS);
        const binsPerBar = dataArrayRef.current.length / BARS;
        for (let i = 0; i < BARS; i++) {
          let sum = 0;
          for (let j = 0; j < binsPerBar; j++) {
            sum += dataArrayRef.current[i * binsPerBar + j];
          }
          aggregatedData[i] = sum / binsPerBar;
        }

        setFrequencyData(aggregatedData);
        requestAnimationFrame(updateFrequencyData);
      }
    };

    const binaryString = base64Audio ? atob(base64Audio) : '';
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const arrayBuffer = bytes.buffer;
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    source.connect(audioContext.destination);
    source.start();

    source.onended = () => {
      setIsPlaying(false);
      setFrequencyData(new Uint8Array(BARS).fill(0));
    };

    sourceRef.current = source;
    setIsPlaying(true);
    updateFrequencyData();
  };

  const handleStopPlaying = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current.disconnect();
      sourceRef.current = null;
      setIsPlaying(false);
      setFrequencyData(new Uint8Array(BARS).fill(0));
    }
  };

  return {
    isRecording,
    isPlaying,
    handleStopPlaying,
    audioUrl,
    frequencyData,
    handlePlayAudio,
    handleStartRecording,
    handleStopRecording,
  };
};

export { useAudioRecorder };
