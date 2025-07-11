'use client';

import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

type ModalTypes = {
  view: React.ReactNode;
  isOpen: boolean;
  customSize?: string;
  isActive: boolean;
};

type ModalsState = Record<string, ModalTypes>;

export const modalsAtom = atom<ModalsState>({});

export const activeModalIdAtom = atom<string>('biz-modal');


export function useModal(modalId: string = 'biz-modal') {
  const [modalsState, setModalsState] = useAtom(modalsAtom);


  const closeModal = () => {
    setModalsState({
      ...modalsState,
      [modalId]: {
        ...modalsState[modalId],
        isOpen: false,
        isActive: false,
      },
    });
  };

  const openModal = ({
    view,
    customSize,
  }: {
    view: React.ReactNode;
    customSize?: string;
  }) => {
    setModalsState({
      ...modalsState,
      [modalId]: {
        isOpen: true,
        view,
        customSize,
        isActive: true,
      },
    });

  };



  const modalState = modalsState[modalId] || { isOpen: false, view: null, customSize: '320px', isActive: false };

  return {
    ...modalState,
    openModal,
    closeModal,
  };
}
