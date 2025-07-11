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
    // architectDialog: string,
    aigent: string,
    aigentPrompt: string,
    rosettaPrompt: string,
  }
  id: string,
  intake: any,
  isButtonLoading: boolean,
  onNext: any,
  setButtonLoading: (val: boolean) => void,
}
export default function Dialog(props: Dialog1Props) {

  const { onNext, id, card, dialog, setLoading, isLoading, isButtonLoading, setButtonLoading, setThreadId, threadId, intake } = props;

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
        dialog={dialog}
        title={dialog.title}
        step={step}
        onNext={onNext}
        goToNextStep={gotoNextStep}
      />
    </div>
  )

}