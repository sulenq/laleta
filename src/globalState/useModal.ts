import { create } from "zustand";

type Work = {
  isOpen: boolean;
};
type Actions = {
  setIsOpen: (isOpen: boolean) => void;
};

const useModal = create<Work & Actions>((set) => ({
  isOpen: false,
  setIsOpen: (isOpenTerm) => set(() => ({ isOpen: isOpenTerm })),
}));

export default useModal;
