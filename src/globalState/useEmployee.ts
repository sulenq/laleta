import { create } from "zustand";
import { Employee } from "../types";

type ThisEmployee = {
  employee: Employee | null;
};

type Actions = {
  setEmployee: (employee: Employee) => void;
};

const useEmployee = create<ThisEmployee & Actions>((set) => ({
  employee: null,
  setEmployee: (employeeTerm) => set(() => ({ employee: employeeTerm })),
}));

export default useEmployee;
