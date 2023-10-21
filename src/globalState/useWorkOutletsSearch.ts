import { create } from "zustand";

type WorkOutletsSearch = {
  workOutletsSearch: string;
};

type Actions = {
  setWorkOutletsSearch: (workOutletsSearch: string) => void;
};

const useWorkOutletsSearch = create<WorkOutletsSearch & Actions>((set) => ({
  workOutletsSearch: "",
  setWorkOutletsSearch: (searchTerm) =>
    set(() => ({ workOutletsSearch: searchTerm })),
}));

export default useWorkOutletsSearch;
