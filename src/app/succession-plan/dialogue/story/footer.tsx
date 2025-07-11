import { Button } from 'rizzui';
import cn from '@/utils/class-names';


interface FooterProps {
  onNext: () => void;
  btnRightLabel?: string,
}

export default function Footer({ onNext, btnRightLabel = 'Next' }: FooterProps) {
  return (
    <footer
      className={cn(
        'fixed bottom-0 left-0 right-0 flex items-center justify-between p-8',
      )}
    >
      <div className="ml-auto gap-1">

        <Button
          rounded="pill"
          type={'submit'}
          variant='solid'
          color="primary"
          onClick={onNext}
        >
          {btnRightLabel}
        </Button>
      </div>

    </footer>
  );
}