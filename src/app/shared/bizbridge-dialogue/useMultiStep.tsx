import { useAtom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

function useMultiStep() {
    const stepperAtomOne = atomWithReset(1);
    const totalSteps = atomWithReset(2);
    const [step, setStep] = useAtom(stepperAtomOne);

    function gotoNextStep() {
        setStep(step + 1);
    }
    function gotoPrevStep() {
        setStep(step > 0 ? step - 1 : step);
    }
    function resetStepper() {
        setStep(0);
    }

    return {
        step,
        setStep,
        resetStepper,
        gotoNextStep,
        gotoPrevStep,
        stepperAtomOne,
        totalSteps
    }
}

export { useMultiStep };

