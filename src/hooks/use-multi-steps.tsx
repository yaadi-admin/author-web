import { useAtom } from 'jotai';
import { atomWithReset } from 'jotai/utils';



interface useMultiStepProps {
  step: number,
  totalSteps: number
}

function useMultiStep(props: useMultiStepProps) {
  const { totalSteps: _totalSteps, step: _step } = props;
  const stepperAtomOne = atomWithReset(_step);
  const totalSteps = atomWithReset(_totalSteps);

  const [step, setStep] = useAtom(stepperAtomOne);

  function gotoNextStep() {
    setStep(step + 1);
  }
  function gotoPrevStep() {
    setStep(step > 1 ? step - 1 : step);
  }
  function resetStepper() {
    setStep(1);
  }


  return {
    step,
    setStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
    totalSteps
  }
}

export { useMultiStep }