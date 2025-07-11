import ChatDialog from "./chat/dialog";
import {
  useStepperOne,
} from '../multi-step';
import { NarroDialogue, replacePlaceholders } from "../../bizbridge-dialogue";
import { sellerSpanCollection } from "@/config/ref/sellerSpanLiteCollections";
import firebase from '@/config/firebase.config';
import { collection, doc, onSnapshot, updateDoc, } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { currentSession } from "@/config/session";
import axios from "axios";
import { BASE_URL, ROSETTA_ID } from "@/config/bots";
import { sellerSpanLite } from "@/config/seller/sellerSpanLite";
import { ThreadEvents } from "./chat/types";
import { useListings } from "@/config/seller/useListings";
import { routes } from "@/config/routes";
interface Dialog1Props {
  card: any,
  isLoading: boolean,
  setThreadId: (val: string) => void,
  threadId: string,
  setLoading: (val: boolean) => void,
  dialog: {
    title: string,
    promptMessage: string,
  }
  id: string,
  intake: any,
  isButtonLoading: boolean,
  setButtonLoading: (val: boolean) => void,
}



export default function Dialog(props: Dialog1Props) {
  const { sellerSpan } = sellerSpanCollection();
    const { data, updateIntake, getIntake } = sellerSpanLite() as any;
  const { push } = useRouter();
  const configCardData = sellerSpan[0]
  const currentUser = currentSession() as any;      
    const { fetchBySellerEmail } = useListings('pending');
  // const cardData = data.find((card: any) => card.id === id);

  const onStart = async (): Promise<string | null> => {
    // const existingThread = cardData?.threadId || null;
    // if (existingThread) {
    //   return existingThread;
    // } else {
    //   return null;
    // }
    return null;
  }

  const onThreadCreated = (threadId: string) => {
    console.log('Thread created', threadId);
  }
  
  if(!configCardData) {
    return null;
  }
  const dialogueSection = configCardData.section2;

  const promptWithIntake = replacePlaceholders(dialogueSection.aigentPrompt, {})
  
  const { id, card, dialog, setLoading, isLoading, isButtonLoading, setButtonLoading, setThreadId, threadId, intake } = props;

  // const onSubmit = async (threadId: string, onFinish: () => void) => {
  //   onFinish();
  //   // setLoading(true);

  // };

  const onSubmit = async (threadId: string, onFinish: () => void) => {
    // e.preventDefault();
    setLoading(true);
    // await botAudioRecorder.handleStopPlaying()

    const submit = async () => {
      if (threadId) {
        const userRef = doc(collection(firebase.firestore, "users"), currentUser?.id);

        let rosettaPrompt = card?.section2?.rosettaPrompt;

        rosettaPrompt = replacePlaceholders(rosettaPrompt, intake);

        const response = await axios.post(
          `${BASE_URL}/api/threads/${threadId}/messages`,
          {
            message: rosettaPrompt || 'Synthesize the response',
          }
        );
        if (response) {
          // TODO:: Add the logic to handle the response
          const eventSource = new EventSource(`${BASE_URL}/api/threads/${threadId}/runs/text?assistantId=${ROSETTA_ID}&threadId=${threadId}`);

          eventSource.onmessage = async (event) => {
            const eventData = JSON.parse(event.data) as any;
            if (eventData.event === ThreadEvents.THREAD_MESSAGE_COMPLETED) {
              const output = eventData.data.content[0].text.value;


              const response = await axios.post(
                `${BASE_URL}/api/test/processSWOT`,
                {
                  message: output,
                }
              );
              const data = response.data.data;

              const cleanedData = data.replace(/```json\n|\n```/g, '').trim();
              const actualJSON = JSON.parse(cleanedData) as any;

              const intake = await getIntake();
              const dialogueIntakeObj = {
                rosettaOutput: output,
                swotOutput: response?.data || '',
                screenName: actualJSON?.['Anonymized Business Name'] || '',
                aboutTheBusiness: actualJSON?.['About the Business'] || '',
                aboutTheCompany: actualJSON?.['About the Company'] || '',
                businessStrengths: actualJSON?.['Business Strengths'] || [],
                growthOpportunities: actualJSON?.['Growth Opportunities'] || [],
                customerProfile: actualJSON?.['Customer Profile'] || '',
                whatCustomerSays: actualJSON?.['What Customers Says'] || '',
                locationProfile: actualJSON?.['Real Estate & Location Profile'] || '',
                transitionSupport: actualJSON?.['Transition Support'] || '',
                storyCategory: actualJSON?.['Category'] || '',
                storyThreadId: threadId || '',
                isSellerCompleted: true,
                isBrokerCompleted: false,
                sellerID: currentUser?.id,
                seller: currentUser,
              }
              const listing = await fetchBySellerEmail(currentUser?.email);
              const listingRef = doc(collection(firebase.firestore, "listings"), listing?.id);
              await updateIntake({
                brokerEmail: listing?.broker?.email,
                broker: listing?.broker,
                ...dialogueIntakeObj
              });
              const { id, intakeObj } = intake;
              await updateDoc(listingRef, {
                ...intakeObj,
                ...dialogueIntakeObj,
                status: 'in-progress',
              });

              await updateDoc(userRef, {
                isIntake: true,
              });

              push(routes.seller.congratulations)
              setLoading(false);
            }
          };

          eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
            eventSource.close();
          };

          return () => {
            eventSource.close();
          };
        }


      }
    }
    submit();
  };

  // const { step, gotoNextStep } = useStepperOne();
  return (
    <div className="mt-10 col-span-full">
  <NarroDialogue
      id={'1'}
      step={1}
      onStart={onStart}
      onThreadCreated={onThreadCreated}
      aigent={dialogueSection.aigent}
      prompt={promptWithIntake}
      injectData={intake}
      title={dialogueSection.title}
      info={dialogueSection.info}
      onSubmit={onSubmit}
      wisdomMessages={['Summarizing your conversation']}
      estimatedTime={15}
    />
    </div>
  )

}

