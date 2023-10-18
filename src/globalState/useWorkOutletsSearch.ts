import { create } from "zustand";

type WorkOutletsSearch = {
  workOutletsSearch: string;
};

type Actions = {
  setWorkOutletsSearch: (
    workOutletsSearch: WorkOutletsSearch["workOutletsSearch"]
  ) => void;
};

const useWorkOutletsSearch = create<WorkOutletsSearch & Actions>((set) => ({
  workOutletsSearch: "",
  setWorkOutletsSearch: (searchTerm) =>
    set(() => ({ workOutletsSearch: searchTerm })),
}));

export default useWorkOutletsSearch;
