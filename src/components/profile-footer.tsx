'use client';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';

import dynamic from 'next/dynamic';
import UploadIntake from '@/app/shared/upload-intake';
import UploadLogo from '@/app/shared/upload-logo';
import ImageUpload from '@/app/shared/image-upload';
import IntakeUpload from '@/app/shared/intake-upload';
import ProfilePhotoUpload from '@/app/shared/photo-upload';
import UploadProfilePhoto from '@/app/shared/upload-profile-photo';
const FileUpload = dynamic(() => import('@/app/shared/file-upload'), {
  ssr: false,
});

interface FormFooterProps {
  className?: string;
  altBtnText?: string;
  submitBtnText?: string;
  isLoading?: boolean;
  isFiles?: boolean;
  logo?: string;
  intake?: string;
  profile?: string;
  handleAltBtn?: () => void;
}

export const negMargin = '-mx-4 md:-mx-5 lg:-mx-6 3xl:-mx-8 4xl:-mx-10';

export default function ProfileFooter({
  isLoading,
  altBtnText = 'Save draft',
  submitBtnText = 'Update',
  className,
  handleAltBtn,
}: FormFooterProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 left-0 right-0 z-10 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50',
        className,
        negMargin
      )}
    >
      <Button type="submit" isLoading={isLoading} className="w-full @xl:w-auto">
        {submitBtnText}
      </Button>
    </div>
  );
}
