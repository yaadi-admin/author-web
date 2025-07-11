import { BASE_URL, ROSETTA_ID } from '@/config/bots';
import firebase from '@/config/firebase.config';
import { cim } from '@/config/seller/cim';
import { useCurrentSession } from '@/config/seller/seller-lite-session';
import { useAudioRecorder } from '@/hooks/use-audio-recorder';
import axios from 'axios';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ThreadEvents } from '../types';

export function useDialogue(props: any) {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('id');
  const listingId = searchParams.get('listingId');

  const { session: currentUser } = useCurrentSession() as any;




  const [audio, setAudio] = useState(null) as any;
  const audioRecorder = useAudioRecorder();
  const botAudioRecorder = useAudioRecorder();


  const [threadId, setThreadId] = useState('');
  const { updateMyCIM, findNextStep } = cim(`${listingId}`);

  // Fetch User Audio from Firestore
  const fetchUserAudio = () => {
    const cimRef = doc(firebase.firestore, 'cim', `${listingId}`, 'cards', `${cardId}`);
    const unsubscribeSnapshot = onSnapshot(cimRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        if (userData?.chatAudio) {
          setAudio(userData.chatAudio);
        }
      }
    });
    return () => unsubscribeSnapshot();
  };

  // Stop Recording and Update Firestore
  const handleStopRecording = async () => {
    const updateCb = (downloadURL: string) => {
      updateDoc(doc(firebase.firestore, 'cim', `${listingId}`, 'cards', `${cardId}`), {
        chatAudio: downloadURL,
      }).then(() => console.log('Audio Saved'));
    };
    await audioRecorder.handleStopRecording('cim', updateCb);
    fetchUserAudio();
  };

  // Replace Placeholders in a message string
  const replacePlaceholders = (message: string, data: { [key: string]: any }) => {
    return message.replace(/{{(.*?)}}/g, (match, key) => data[key] || '');
  };

  // Fetch and Introduce Intake Information into a Prompt
  const introduceIntakeInformation = async (prompt: string) => {
    const response = await axios.post(
      `${BASE_URL}/api/bizbridge/serv/authenticate`,
      {
        type: cardId,
        subKey: listingId,
        key: 'intake',
        userID: currentUser?.id,
        function: 'getIntakeData',
      },
      {
        headers: { Authorization: 'skl-bhdbjcbcbcbdjb' },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );
    let modifiedPrompt = prompt;
    const msg = response?.data?.Message || '';

    modifiedPrompt = replacePlaceholders(modifiedPrompt, JSON.parse(msg) as any);
    return modifiedPrompt;
  };

  // Submit function with all the logic for sending data
  const onSubmit = async (e: any, goToNextStep: any, dialog: any, card: any, setLoading: any) => {
    e.preventDefault();
    setLoading(true);
    await botAudioRecorder.handleStopPlaying();

    const submit = async () => {
      if (threadId) {
        const relevance = card?.section2?.relevance || [];
        for (const item of relevance) {
          const response = await axios.post(
            `${BASE_URL}/api/bizbridge/serv/authenticate`,
            {
              type: 'financial',
              function: 'getKnowledgeData',
              userID: currentUser?.id,
              key: item.value,
            },
            { headers: { Authorization: 'skl-bhdbjcbcbcbdjb' }, maxContentLength: Infinity, maxBodyLength: Infinity }
          );
          const prompt2 = (card?.section1?.fields || []).find((f: any) => f.key === item.value)?.prompt2 || '';
          if (prompt2.length > 0) {
            let promptWithData = replacePlaceholders(prompt2, { aigent2Output: response?.data?.Message });
            await axios.post(`${BASE_URL}/api/finnCal/processFinnCal`, {
              promptFinnCal: promptWithData,
            });
          }
        }
        const rosettaPrompt = dialog?.rosettaPrompt;
        const promptWithKnowledge = await introduceIntakeInformation(rosettaPrompt);
        const response = await axios.post(`${BASE_URL}/api/threads/${threadId}/messages`, {
          message: promptWithKnowledge,
        });

        if (response) {
          const eventSource = new EventSource(
            `${BASE_URL}/api/threads/${threadId}/runs/text?assistantId=${ROSETTA_ID}&threadId=${threadId}`
          );
          eventSource.onmessage = async (event) => {
            const eventData = JSON.parse(event.data) as any;
            if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
              const output = eventData.data.content[0].text.value;
              await updateMyCIM({
                listingId: `${listingId}`,
                cardId: `${cardId}`,
                params: { summary: output },
              });
              const nextStep = findNextStep('section2', `${cardId}`);
              goToNextStep(nextStep);
              setLoading(false);
            }
          };
          eventSource.onerror = (error) => console.error('EventSource error:', error);
          return () => eventSource.close();
        }
      }
    };

    submit();
  };

  return {
    audio,
    handleStopRecording,
    fetchUserAudio,
    onSubmit,
    replacePlaceholders,
    introduceIntakeInformation,
  };
}
