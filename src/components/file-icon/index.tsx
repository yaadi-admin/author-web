'use client';
import React from 'react';
import { Text } from 'rizzui'

import PDFIcon from '@/components/icons/pdf-solid';
import DocIcon from '@/components/icons/doc-solid';
import ImageIcon from '@/components/icons/image-solid';
import XMLIcon from '@/components/icons/xml-solid';

type FileType = 'pdf' | 'doc' | 'image' | 'xml';

interface FileIconProps {
  fileUrl: string;
}

const fileIcons = {
  'pdf': <PDFIcon />,
  'doc': <DocIcon />,
  'image': <ImageIcon />,
  'xml': <XMLIcon />,
  default: null,  // Return null for unknown file types to display a default icon.  You can replace this with your own logic.  For example, you could return a fallback icon or a loading spinner.  Or, you could use a different icon library that supports different icon types.  For example, Font Awesome or Material Icons.  Or, you could use a generic icon or a placeholder icon.  Or, you could use a service
};



function FileIcon(props: FileIconProps) {
  const { fileUrl } = props;

  const getFileInfo = (fileUrl: string) => {
    const fileInfo = fileUrl.split('/').pop()?.split('?')[0].split('.') || [];
    return {
      fileName: fileInfo[0],
      fileExtension: fileInfo[1]
    };
  };

  const { fileName, fileExtension } = getFileInfo(fileUrl);

  const icon = (fileExtension in fileIcons ? fileIcons[fileExtension as FileType] : fileIcons.default);
  return (
    <div
      onClick={() => window.open(fileUrl)}
      className={
        'cursor-pointer relative flex flex-col items-center justify-center rounded-lg bg-gray-50 p-7 dark:bg-gray-100/50'
      }
    >
      {icon && (
        <div className="w-14">
          {icon}
        </div>
      )}
      <Text className="mt-5 w-full truncate text-center text-sm font-medium text-gray-700">
        {fileName}
      </Text>
    </div>
  );
}
export default FileIcon;

