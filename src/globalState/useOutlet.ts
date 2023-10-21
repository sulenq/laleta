import { create } from "zustand";
import { Outlet } from "../types";

type ThisOutlet = {
  outlet: Outlet | null;
};

type Actions = {
  setOutlet: (employee: Outlet) => void;
};

const useOutlet = create<ThisOutlet & Actions>((set) => ({
  outlet: null,
  setOutlet: (outletTerm) => set(() => ({ outlet: outletTerm })),
}));

export default useOutlet;
