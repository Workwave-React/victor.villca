import { useState, useCallback } from 'react';
import type { ImageModalData, ModalState } from '../types/modal.types';

interface UseModalReturn {
  isOpen: boolean;
  modalData: ImageModalData | null;
  openModal: (data: ImageModalData) => void;
  closeModal: () => void;
}

export function useModal(): UseModalReturn {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    data: null,
  });

  //use callback to memoize functions and prevent unnecessary re renders
  // like instead of writing a recipe each time, use a card to represent the recipe, and only
  // change the card when the recipe changes.
  //use memo is the same but for values, like saving the result of a long math calculation
  // you only recalculate if the numbers you use change.
  const openModal = useCallback((data: ImageModalData) => {
    setModalState({
      isOpen: true,
      data,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      data: null,
    });
  }, []);

  return {
    isOpen: modalState.isOpen,
    modalData: modalState.data,
    openModal,
    closeModal,
  };
}