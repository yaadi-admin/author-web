/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { Text, Badge, Button, ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';
import { PiXBold } from 'react-icons/pi';
import Modal from '@/components/ui/modal';

const statusColors = {
  Accepted: 'info',
  'In Transit': 'secondary',
  'Out For Delivery': 'primary',
  Delivered: 'success',
};

const placeholderImage = 'https://via.placeholder.com/150';

export default function TrackingHistoryTable({
  className,
  listing,
}: {
  className?: string;
  listing?: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const mainImage = listing?.file1 || placeholderImage;
  const otherImages = listing?.otherFiles?.length ? listing.otherFiles.slice(0, 4) : [placeholderImage, placeholderImage, placeholderImage, placeholderImage];

  return (
    <div className={cn('relative flex w-auto items-center overflow-hidden', className)}>
      <div className="grid grid-cols-2 gap-2 col-span-full">
        <div className="flex-grow">
          <img
            style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '100%', height: '500px', objectFit: 'cover' }}
            alt="main image"
            className="object-cover w-full cursor-pointer"
            src={mainImage}
            onClick={() => openImageModal(mainImage)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          {otherImages.map((file: string, index: number) => (
            <div key={file} className="w-full flex-grow">
              <img
                style={{
                  borderTopRightRadius: index === 1 ? 10 : 0,
                  borderBottomRightRadius: index === 3 ? 10 : 0,
                  width: '100%',
                  height: '246px',
                  objectFit: 'cover',
                }}
                alt={`image ${index + 1}`}
                className="object-cover w-full cursor-pointer"
                src={file}
                onClick={() => openImageModal(file)}
              />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedImage && (
        <Modal
        title={``}
          content={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75" onClick={closeImageModal}>
              <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                <ActionIcon
                  size="sm"
                  variant="text"
                  onClick={closeImageModal}
                  className="absolute top-[-35px] right-0 z-50 bg-gray-500 text-white rounded-full hover:bg-red-500"
                >
                  <PiXBold className="h-auto w-5" />
                </ActionIcon>
                <img src={selectedImage} alt="Selected" className="w-auto h-auto max-w-[700px] max-h-full object-contain" />
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
