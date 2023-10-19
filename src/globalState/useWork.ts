import { create } from "zustand";
import { Work as WorkTerm } from "../types";

type Work = {
  work: WorkTerm | null;
};
type Actions = {
  setWork: (work: WorkTerm) => void;
};

const useWork = create<Work & Actions>((set) => ({
  work: null,
  setWork: (work) => set(() => ({ work: work })),
}));

export default useWork;
