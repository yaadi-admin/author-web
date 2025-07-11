import ChatDialog from "./chat/dialog";
import {
  useStepperOne,
} from '../multi-step';

interface DialogueDataProps {
  aigent: string,
  aigentPrompt: string,
  isShown: boolean,
  synthesizerPrompt: string,
  title: string,
}


interface CommonDialogProps {
  card: any,
  isLoading: boolean,
  setLoading: (val: boolean) => void,
  dialog: DialogueDataProps,
  id: string,
  intake: any,
  intakeSource: string,
  isButtonLoading: boolean,
  onFinish: (data: any) => void,
  setButtonLoading: (val: boolean) => void,
}
export default function Dialog(props: CommonDialogProps) {

  const {
    id, dialog,
    intakeSource,
    setLoading, isLoading,
    isButtonLoading, setButtonLoading,
    onFinish,
    intake
  } = props;

  const { step, gotoNextStep } = useStepperOne();
  return (
    <div className="mt-10 col-span-full">

      <ChatDialog
        onFinish={onFinish}
        id={id}
        key={`chat-${step.toString()}`}
        setLoading={setLoading}
        isLoading={isLoading}
        isButtonLoading={isButtonLoading}
        setButtonLoading={setButtonLoading}
        intake={intake}
        intakeSource={intakeSource}
        dialog={dialog}
        title={dialog.title}
        aigentPrompt={dialog.aigentPrompt}
        synthesizerPrompt={dialog.synthesizerPrompt}
        step={step}

        goToNextStep={gotoNextStep}
      />
    </div>
  )

}