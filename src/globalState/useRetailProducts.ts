import { create } from "zustand";
import { RetailProduct } from "../types";

type RetailProducts = {
  retailProducts: RetailProduct[] | null;
};

type Actions = {
  setRetailProducts: (productsTerm: RetailProducts["retailProducts"]) => void;
};

const useRetailProducts = create<RetailProducts & Actions>((set) => ({
  retailProducts: null,
  setRetailProducts: (productsTerm) =>
    set(() => ({ retailProducts: productsTerm })),
}));

export default useRetailProducts;
