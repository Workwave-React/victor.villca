export interface ImageModalData {
  imageUrl: string;
  title: string;
}

export interface ModalState {
  isOpen: boolean;
  data: ImageModalData | null;
}
