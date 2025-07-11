'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Modal } from 'rizzui';
import { useModal, modalAtom } from './use-modal';
import { useAtom } from 'jotai';

export default function GlobalModal() {
  const [modalsState, setModalState] = useAtom(modalAtom);


  const pathname = usePathname();
  const modals = Object.values(modalsState || {});
  const modalKeys = Object.keys(modalsState);

  // const closeModal = (key: string) => {
  //   let newModals = {};
  //   modalKeys.forEach((modalKey) => {
  //     if (modalKey === key) {
  //       newModals = {
  //         [modalKey]: { ...modalsState[modalKey], isOpen: false, isActive: false }
  //       }
  //     }
  //   })
  //   setModalState({ ...modalsState, ...newModals });
  // }
  // useEffect(() => {
  //   let newModals = {};
  //   modalKeys.forEach((modalKey) => {
  //     newModals = {
  //       [modalKey]: { ...modalsState[modalKey], isOpen: false, isActive: false }
  //     }
  //   })
  //   setModalState(newModals);
  // }, [pathname]);

  return (
    <div>
      {modals.map((modal: any, index: number) => {
        const zIndex = `z-[${index + 9999}`;

        return (<Modal
          key={modalKeys[index]}
          isOpen={modal.isOpen || false}
          onClose={() => {
            // if (activeModal === modalKeys[index]) {
            //   console.log('hereee');
            //   closeModal(modalKeys[index])
            // }
          }}
          customSize={modal.customSize}
          overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
          containerClassName="dark:bg-gray-100"
          className={zIndex}
        >
          {modal.view}
        </Modal>)
      }
      )}
    </div>

  );
}
