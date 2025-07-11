import ChatDialog from "./chat/dialog";
import {
  useStepperOne,
} from '../multi-step';
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

  const { id, card, dialog, setLoading, isLoading, isButtonLoading, setButtonLoading, setThreadId, threadId, intake } = props;

  const { step, gotoNextStep } = useStepperOne();
  return (
    <div className="mt-10 col-span-full">

      <ChatDialog
        id={id}
        key={`chat-${step.toString()}`}
        setLoading={setLoading}
        isLoading={isLoading}
        setThreadId={setThreadId}
        isButtonLoading={isButtonLoading}
        setButtonLoading={setButtonLoading}
        threadId={threadId}
        intake={intake}
        card={card}
        promptMessage={dialog.promptMessage}
        title={dialog.title}
        step={step}
        goToNextStep={gotoNextStep}
      />
    </div>
  )

}