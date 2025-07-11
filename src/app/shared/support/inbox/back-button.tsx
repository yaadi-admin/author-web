'use client';

import { useRouter } from 'next/navigation';
import { PiArrowLeft } from 'react-icons/pi';
import { Button } from 'rizzui';

export default function BackButton({ onClick }: any) {
  const router = useRouter();
  const onBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.back()
    }
  }
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => onBack()}
      className="flex items-center gap-2"
    >
      <PiArrowLeft />
      Back
    </Button>
  );
}
