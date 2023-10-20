import { create } from "zustand";
import { RetailProduct } from "../types";

type RetailProductUpdate = {
  updateData: RetailProduct | null;
  isOpen: boolean;
};

type Actions = {
  setUpdateData: (
    retailProductUpdate: RetailProductUpdate["updateData"]
  ) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const useRetailProductUpdate = create<RetailProductUpdate & Actions>((set) => ({
  updateData: null,
  isOpen: false,
  setUpdateData: (updateDataTerm) =>
    set(() => ({ updateData: updateDataTerm })),
  setIsOpen: (isOpenTerm) => set(() => ({ isOpen: isOpenTerm })),
}));

export default useRetailProductUpdate;
