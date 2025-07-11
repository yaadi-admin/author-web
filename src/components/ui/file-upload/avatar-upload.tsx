'use client';

import Image from 'next/image';
import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useDropzone } from '@uploadthing/react/hooks';
import {
  generateClientDropzoneAccept,
} from 'uploadthing/client';
import { useUploadThing } from '@/utils/uploadthing';
import UploadIcon from '@/components/shape/upload';
import { FieldError, Loader, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { PiPencilSimple } from 'react-icons/pi';
import { LoadingSpinner } from '@/components/ui/file-upload/upload-zone';
import { FileWithPath } from 'react-dropzone';
import { doc, onSnapshot, setDoc, addDoc, collection, query, where, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';

interface UploadZoneProps {
  name: string;
  getValues?: any;
  setValue?: any;
  className?: string;
  error?: string;
}

export default function AvatarUpload({
  name,
  error,
  className,
  getValues,
  setValue,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);

  const formValue = getValues(name);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    'avatar',
    {
      onClientUploadComplete: (res: any | undefined) => {
        if (setValue) {
          const respondedUrls = res?.map((r: any) => ({
            name: r.name,
            size: r.size,
            url: r.url,
          }));
          setValue(name, respondedUrls?.[0]);
        }
        toast.success(
          <Text as="b" className="font-semibold">
            Avatar updated
          </Text>
        );
      },
      onUploadError: (error: Error) => {
        console.error(error);
        toast.error(error.message);
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFiles([
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);

      storePhoto(acceptedFiles[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const storePhoto = async (file: any) => {
    const storageRef = ref(firebase.storage, `${file?.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
    localStorage.setItem('profilePhoto', downloadURL);
  };

  return (
    <div className={cn('grid gap-5', className)}>
      <div
        className={cn(
          'relative grid h-40 w-40 place-content-center rounded-full border-[1.8px]'
        )}
      >
        {formValue ? (
          <>
            <figure className="absolute inset-0 rounded-full">
              <Image
                fill
                alt="user avatar"
                src={formValue?.url}
                className="rounded-full"
              />
            </figure>
            <div
              {...getRootProps()}
              className={cn(
                'absolute inset-0 grid place-content-center rounded-full bg-black/70'
              )}
            >
              {isUploading ? (
                <LoadingSpinner />
              ) : (
                <PiPencilSimple className="h-5 w-5 text-white" />
              )}

              <input {...getInputProps()} />
            </div>
          </>
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              'absolute inset-0 z-10 grid cursor-pointer place-content-center'
            )}
          >
            <input {...getInputProps()} />
            <UploadIcon className="mx-auto h-12 w-12" />

            {isUploading ? (
              <Loader variant="spinner" className="justify-center" />
            ) : (
              <Text className="font-medium">Drop or select file</Text>
            )}
          </div>
        )}
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}
