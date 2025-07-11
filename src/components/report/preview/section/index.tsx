import Markdown from '@/components/markdown';
import Loader from '@/components/ui/loader';
import React, { ReactNode, useState } from 'react';
import { Button, Textarea } from 'rizzui';
import styles from './section.module.css';

interface Card {
  cardId: string;
  threadId: string;
  index: number;
  title: string;
  runId: string;
  cards: any;
  isOpen: boolean;
  rosettaPrompt: string;
  image: ReactNode;
  clientId?: string;
  primaryColor: string;
  onFinish: (cardId: string, output: string) => void;
}


import { successionPlan } from '@/config/client/successionPlan';
import { useCurrentSession } from '@/config/succession-session';
import { MdDone } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';



const SimpleCardWithToggle = (props: Card) => {
  const { cardId, title, index, onFinish, isOpen: isCardOpen, image, primaryColor, clientId } = props;

  const [isOpen, setIsOpen] = useState(isCardOpen);
  const [summary, setSummary] = useState('')
  const [recommendations, setRecommendations] = useState('')
  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  // const [formResponses, setFormResponses] = useState([]);
  const [formResponses, setFormResponses] = useState([]);
  const { getCard } = successionPlan() as any;
  const { session: currentUser } = useCurrentSession() as any;

  React.useEffect(() => {
    if (isCardOpen === true) {
      setIsOpen(true);
    }
  }, [isCardOpen]);




  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  const MAX_RETRIES = 1000;
  const DELAY = 5000; // 5 seconds in milliseconds

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const retrieveOutput = async (retries = 0) => {
    try {
      const nextClientId = clientId || currentUser.id;
      const card = await getCard(nextClientId, cardId);
      setLoading(true);

      if (card && card.output) {
        setLoading(false);

        setSummary(card.output);
        setRecommendations(card.luigiOuput);

        setFormResponses(card.assessmentFormResponses)
      } else if (retries < MAX_RETRIES) {
        await delay(DELAY);
        await retrieveOutput(retries + 1);
      } else {
        console.error('Max retries reached');
      }
    } catch (error) {
      if (retries < MAX_RETRIES) {
        await delay(DELAY);
        await retrieveOutput(retries + 1);
      } else {
        console.error('Max retries reached due to error:', error);
      }
    } finally {
      setLoading(false); // Ensure loading is set to false in the end
    }
  };


  React.useEffect(() => {
    async function retrieveOutputFromFireBase() {
      try {
        if (currentUser?.id || clientId) {
          const id = clientId || currentUser.id;
          const card = await getCard(id, cardId);

          if (card?.output) {

            setSummary(card.output);
            setRecommendations(card.luigiOuput);
            setScore(card.assessmentScore);
            setFormResponses(card.assessmentFormResponses);
          } else {
            retrieveOutput();
          }
        }
      } catch (error) {
        console.error('Error retrieving output from Firebase:', error);
      }
    }
    if (currentUser?.id || clientId) {
      retrieveOutputFromFireBase();
    }
  }, [cardId, currentUser?.id, clientId, index]);

  const onEdit = () => {
    setEditing(true);
  }

  const onEditDone = async () => {
    await onFinish(cardId, summary);
    setEditing(false);
  }


  return (
    <div className={`w-full h-full rounded overflow-hidden bg-white ${styles.page}`} style={{
      borderTop: `4px solid ${primaryColor}`,
      boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.1)',
    }}>
      <div className="px-6 pt-4">
        <div className=" flex justify-between items-center">
          <h1 id={title}>{title}</h1>
          <div className='ml-auto mr-6 flex'>
            {
              isLoading && <div className='flex mr-6'>
                <Loader size="lg" />
              </div>
            }
            {isEditing ?
              <div className='flex'>
                <Button variant="flat" color="primary" className="ml-auto mt-4 mr-4" onClick={onEditDone}><MdDone className='ml-auto me h-5 w-5 mr-1' /> Save Changes </Button>
              </div>
              :
              <div className='flex'>
                <Button id="edit-button" variant="flat" disabled={isLoading} color="primary" onClick={onEdit} className='ml-auto'><TbEdit className='ml-auto h-5 w-5 mr-1' />Edit</Button>
              </div>
            }
          </div>

          <button onClick={toggleContent}>
            <svg
              className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <>
            {isEditing ?
              <>
                <Textarea
                  placeholder=""
                  rows={20}
                  className='mt-4'
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </>
              :
              <>
                <Markdown
                  output={summary}
                  recommendations={recommendations}
                  score={score}
                  image={image}
                  formResponses={formResponses}
                  cardId={cardId}
                  primaryColor={primaryColor}
                />
              </>
            }
          </>
        )}

      </div>
    </div>
  );
};

export default SimpleCardWithToggle;
