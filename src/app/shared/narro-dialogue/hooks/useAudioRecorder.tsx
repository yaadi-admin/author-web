'use client';
import { BASE_URL } from '@/config/bots';
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useRef, useState } from 'react';

const BARS = 8;
const useAudioRecorder = () => {
  const currentUser = currentSession() as any;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const workerRef = React.useRef<Worker | null>(null);

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




  const spawnNewWorker = () => {
    workerRef.current = new Worker(new URL(`${window.location.origin}/pulseWorker.js`));

    // Handle the message received from the worker


    workerRef.current.onmessage = (event: any) => {
      // console.log('asd', event.data);
      setFrequencyData(new Uint8Array(event.data));
    };
  };

  const unmountWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  };

  const uploadToFirestoreAndGetDownloadUrl = async () => {
    // audioChunksRef.current BLOB Voice
    const audioBlob = new Blob(audioChunksRef.current, {
      type: 'audio/mp3',
    });

    const rand = Math.floor(Math.random() * (2000000 - 100 + 1)) + 100;
    const storageRef = ref(
      firebase.storage,
      `documents/${`audio_` + rand}.mp3`
    );
    await uploadBytes(storageRef, audioBlob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleStartRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support audio recording');
      return;
    }

    if (!workerRef.current) {
      spawnNewWorker()
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

          // Send data to the worker for processing
          if (workerRef.current) {
            workerRef.current.postMessage({
              dataArray: dataArrayRef.current,
              bars: BARS,
            });
          }
          requestAnimationFrame(updateFrequencyData)
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
    return new Promise(async (resolve, reject) => {
      try {
        if (mediaRecorderRef.current) {
          mediaRecorderRef.current.onstop = async () => {
            const downloadURL = await uploadToFirestoreAndGetDownloadUrl();

            audioChunksRef.current = [];
            setAudioUrl(downloadURL);

            resolve(downloadURL);  // Resolve the promise with the audioBlob

          }
          mediaRecorderRef.current.stop();
          setFrequencyData(new Uint8Array(BARS).fill(0));
          setIsRecording(false);
          analyserRef.current = null;

        } else {
          // throw new Error('Media Recorder is not available')
        }
      } catch (error) {
        reject(error);  // Reject the promise in case of an error
      } finally {
        unmountWorker()

      }
    })
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

        // Send data to the worker for processing
        if (workerRef.current) {
          workerRef.current.postMessage({
            dataArray: dataArrayRef.current,
            bars: BARS,
          });
        }
        requestAnimationFrame(updateFrequencyData)
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


  const handleAudioStream = async (message: string, cb: any, aigentVoice: string) => {
    const voice = aigentVoice || 'nova';
    const params = new URLSearchParams({ message, voice });
    const url = `${BASE_URL}/api/voice/speak/stream?${params.toString()}`;

    if (!workerRef.current) {
      spawnNewWorker()
    }
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

            // Send data to the worker for processing
            if (workerRef.current) {
              workerRef.current.postMessage({
                dataArray: dataArrayRef.current,
                bars: BARS,
              });
            }
            requestAnimationFrame(updateFrequencyData)

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
            let callbackCalled = false; // Flag to ensure the callback is called only once

            try {
              while (true) {
                const { done, value } = await reader.read(); // Read the next chunk

                if (done) {
                  if (!sourceBuffer.updating) {
                    mediaSource.endOfStream(); // Signal the end of the media stream
                  }
                  break; // Exit the loop when done
                }

                if (value) {
                  chunkQueue.push(value);

                  // Call the callback once when the first chunk is processed
                  if (!callbackCalled) {
                    cb();
                    callbackCalled = true; // Ensure the callback is not called again
                  }

                  // Append the buffer if the sourceBuffer is not updating
                  if (!sourceBuffer.updating) {
                    sourceBuffer.appendBuffer(chunkQueue.shift() as Uint8Array);
                  }
                }
              }
            } catch (error) {
              console.error("Error while reading chunks:", error);
            }
          };

          readChunks();
        });

        // Connect audio to analyser and play
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        // Start the frequency data update loop
        updateFrequencyData();

        try {
          await audioElement.play();
        } catch {
          setIsPlaying(false);
          setFrequencyData(new Uint8Array(BARS).fill(0));
          unmountWorker()
        }
        // When the audio ends
        audioElement.onended = () => {
          setIsPlaying(false);
          setFrequencyData(new Uint8Array(BARS).fill(0));
          unmountWorker()
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
    unmountWorker()
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
    handleAudioStream
  };
};

export { useAudioRecorder };

