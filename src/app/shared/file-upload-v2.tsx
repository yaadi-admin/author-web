'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  PiArrowLineDownBold,
  PiFile,
  PiFileCsv,
  PiFileDoc,
  PiFilePdf,
  PiFileXls,
  PiFileZip,
  PiTrashBold,
  PiXBold,
} from 'react-icons/pi';
import { ActionIcon, Title, Text, Button, Input } from 'rizzui';
import cn from '@/utils/class-names';
import Upload from '@/components/ui/upload';
import { useModal } from '@/app/shared/modal-views/use-modal';
import SimpleBar from '@/components/ui/simplebar';
import { toast } from 'react-hot-toast';
import { doc, onSnapshot, setDoc, addDoc, collection, query, where, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import firebase from '@/config/firebase.config';
import { currentSession } from '@/config/session';

type AcceptedFiles = 'img' | 'pdf' | 'csv' | 'imgAndPdf' | 'all';

export default function FileUpload({
  label = '',
  btnLabel = 'Upload',
  fieldLabel,
  multiple = false,
  accept = 'all',
  onImageUploaded,
}: {
  label?: string;
  fieldLabel?: string;
  btnLabel?: string;
  multiple?: boolean;
  accept?: AcceptedFiles;
  onImageUploaded?: any,
}) {
  const { closeModal } = useModal();

  return (
    <div className="m-auto px-5 pb-8 @2xl:px-7">
      <div className="mb-6 flex items-center justify-between">
        {/* <Title as="h3" className="text-lg">
          {label}
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon> */}
      </div>

      <FileInput
        onImageUploaded={onImageUploaded}
        accept={accept}
        multiple={multiple}
        label={fieldLabel}
        btnLabel={btnLabel}
      />
    </div>
  );
}

const fileType = {
  'text/csv': <PiFileCsv className="h-5 w-5" />,
  'text/plain': <PiFile className="h-5 w-5" />,
  'application/pdf': <PiFilePdf className="h-5 w-5" />,
  'application/xml': <PiFileXls className="h-5 w-5" />,
  'application/zip': <PiFileZip className="h-5 w-5" />,
  'application/gzip': <PiFileZip className="h-5 w-5" />,
  'application/msword': <PiFileDoc className="h-5 w-5" />,
} as { [key: string]: React.ReactElement };

export const FileInput = ({
  label,
  btnLabel = 'Upload',
  multiple = true,
  accept = 'img',
  className,
  onImageUploaded
}: {
  className?: string;
  label?: React.ReactNode;
  multiple?: boolean;
  btnLabel?: string;
  accept?: AcceptedFiles;
  onImageUploaded?: any,
}) => {
  const [files, setFiles] = useState<Array<File>>([]);
  const imageRef = useRef<HTMLInputElement>(null);



  function handleFileDrop(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = (event.target as HTMLInputElement).files;
    const newFiles = Object.entries(uploadedFiles as object)
      .map((file) => {
        if (file[1]) return file[1];
      })
      .filter((file) => file !== undefined);
    handleFileUpload(newFiles, () => {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    })
  }

  function handleImageDelete(index: number) {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    (imageRef.current as HTMLInputElement).value = '';
  }

  const storeFiles = async (files: any) => {
    const fileUploadPromises = files.map(async (file: any) => {
      const storageRef = ref(firebase.storage, `${file?.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL);
      return downloadURL;
    });

    const fileUrls = await Promise.all(fileUploadPromises);
    return fileUrls;
  };


  async function handleFileUpload(files: any, cb: any) {
    if (files.length) {
      const urls = await storeFiles(files);
      console.log(files);
      await cb();
      await onImageUploaded(urls);
    } else {
      toast.error(<Text as="b">Please drop your file</Text>);
    }
  }

  return (
    <div className={className}>
      <Upload
        label={label}
        ref={imageRef}
        accept={accept}
        multiple={multiple}
        onChange={(event) => handleFileDrop(event)}
        className="mb-6 min-h-[50px] justify-center border-dashed bg-gray-50 dark:bg-transparent"
      />

      {files.length > 1 ? (
        <Text className="mb-2 text-gray-500">{files.length} files</Text>
      ) : null}

      {files.length > 0 && (
        <SimpleBar className="max-h-[100px]">
          <div className="grid grid-cols-1 gap-4">
            {files?.map((file: File, index: number) => (
              <div
                className="flex min-h-[58px] w-full items-center rounded-xl border border-muted px-3 dark:border-gray-300"
                key={file.name}
              >
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-muted bg-gray-50 object-cover px-2 py-1.5 dark:bg-transparent">
                  {file.type.includes('image') ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      fill
                      className=" object-contain"
                      priority
                      alt={file.name}
                      sizes="(max-width: 768px) 100vw"
                    />
                  ) : (
                    <>{fileType[file.type]}</>
                  )}
                </div>
                <div className="truncate px-2.5">{file.name}</div>
                <ActionIcon
                  onClick={() => handleImageDelete(index)}
                  size="sm"
                  variant="flat"
                  color="danger"
                  className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20"
                >
                  <PiTrashBold className="w-6" />
                </ActionIcon>
              </div>
            ))}
          </div>
        </SimpleBar>
      )}


    </div>
  );
};


