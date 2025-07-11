import { useAtom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

const stepperAtomOne = atomWithReset(1);
const totalSteps = atomWithReset(2);

function useMultiStep() {

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