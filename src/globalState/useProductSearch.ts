import { create } from "zustand";

type ProductSearch = {
  productSearch: string;
};

type Actions = {
  setProductSearch: (search: ProductSearch["productSearch"]) => void;
};

const useProductSearch = create<ProductSearch & Actions>((set) => ({
  productSearch: "",
  setProductSearch: (search) => set(() => ({ productSearch: search })),
}));

export default useProductSearch;
