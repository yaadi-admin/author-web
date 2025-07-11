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
import { BASE_URL } from '@/config/bots';

const BARS = 8;
const useAudioRecorder = () => {
  const currentUser = currentSession() as any;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>('');
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(
    new Uint8Array(BARS).fill(0)
  ); // 6 bars

  const audioElementRef = useRef<HTMLAudioElement | null>(null);

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

  const handleStopRecording = async (
    collectionToUpdate?: string,
    updateCb?: any
  ) => {
    const collectionD = collectionToUpdate ? collectionToUpdate : 'sellerspan';
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/mp3',
        });
        // const audioUrl = URL.createObjectURL(audioBlob);
        localStorage.setItem('audioBlob', JSON.stringify(audioBlob));
        const rand = Math.floor(Math.random() * (2000000 - 100 + 1)) + 100;
        const storageRef = ref(
          firebase.storage,
          `documents/${`audio_` + rand}.mp3`
        );
        await uploadBytes(storageRef, audioBlob);
        const downloadURL = await getDownloadURL(storageRef);
        setAudioUrl(downloadURL);
        // console.log(audioUrl);
        if (collectionD === 'cim') {
          updateCb(downloadURL);
        } else if (collectionD === 'succession_plan') {
          updateCb(downloadURL);
        } else if (collectionD === 'real-estate-intakes') {
          const q = query(
            collection(firebase.firestore, 'real-estate-intakes'),
            where('seller.id', '==', currentUser.id)
          );
          const docs = await getDocs(q);
          let lastData: any = null;
          docs.forEach((d) => {
            lastData = d.data();
          });
          if (lastData) {
            console.log(lastData);
            updateDoc(doc(firebase.firestore, collectionD, lastData?.id), {
              chatAudio: downloadURL,
            }).then(() => {
              console.log('Audio Saved');
            });
          }
        } else {
          updateDoc(doc(firebase.firestore, collectionD, currentUser?.id), {
            chatAudio: downloadURL,
          }).then(() => {
            console.log('Audio Saved');
          });
        }

        // localStorage.setItem('newAudio', downloadURL);
        setAudioUrl(downloadURL);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.stop();
      setFrequencyData(new Uint8Array(BARS).fill(0));
      setIsRecording(false);
      analyserRef.current = null; // Stop updating frequency data

      // return audioUrl;
    }
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
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
      setIsPlaying(false);
      setFrequencyData(new Uint8Array(BARS).fill(0));
    } else if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current.disconnect();
      sourceRef.current = null;
      setIsPlaying(false);
      setFrequencyData(new Uint8Array(BARS).fill(0));
    }
  };

  const handleAudioStream = async (message: string, cb: any) => {
    const voice = 'nova';
    const params = new URLSearchParams({ message, voice });
    const url = `${BASE_URL}/api/voice/speak/stream?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType !== 'audio/mpeg') {
        throw new Error('Expected audio/mpeg content type');
      }

      const body = response.body;
      if (body) {
        setIsPlaying(true);

        const reader = body.getReader();
        const mediaSource = new MediaSource();
        const audioElement = document.createElement('audio');
        audioElementRef.current = audioElement;
        audioElement.classList.add('hidden');
        audioElement.controls = true;
        document.body.appendChild(audioElement);

        audioElement.src = URL.createObjectURL(mediaSource);

        // Setting up AudioContext and Analyser
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

        mediaSource.addEventListener('sourceopen', () => {
          const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
          const chunkQueue: Uint8Array[] = []; // Ensure this is typed as an array of Uint8Array

          sourceBuffer.addEventListener('updateend', () => {
            if (chunkQueue.length > 0 && !sourceBuffer.updating) {
              sourceBuffer.appendBuffer(chunkQueue.shift() as Uint8Array);
            }
          });

          const readChunks = async () => {
            reader.read().then(({ done, value }) => {
              cb();
              if (done) {
                mediaSource.endOfStream();
                return;
              }
              if (value) {
                chunkQueue.push(value);
                if (!sourceBuffer.updating) {
                  sourceBuffer.appendBuffer(chunkQueue.shift() as Uint8Array);
                }
              }
              readChunks();
            });
          };
          readChunks();
        });

        // Connect audio to analyser and play
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        // Start the frequency data update loop
        updateFrequencyData();

        audioElement.play();

        // When the audio ends
        audioElement.onended = () => {
          setIsPlaying(false);
          setFrequencyData(new Uint8Array(BARS).fill(0));
        };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching audio:', error);
        alert('Error: ' + error.message);
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred');
      }
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
    handleAudioStream,
  };
};

export { useAudioRecorder };
