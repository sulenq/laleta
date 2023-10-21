import { create } from "zustand";
import { Employee, Outlet } from "../types";

type State = {
  outlet: Outlet | null;
  employee: Employee | null;
};

type Actions = {
  setOutlet: (input: Outlet) => void;
  setEmployee: (input: Employee) => void;
};

const useWorkOutlet = create<State & Actions>((set) => ({
  outlet: null,
  employee: null,
  setOutlet: (input) => set(() => ({ outlet: input })),
  setEmployee: (input) => set(() => ({ employee: input })),
}));

export default useWorkOutlet;
