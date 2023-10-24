import {
  Basket,
  BeerStein,
  DotsThreeCircle,
  FirstAidKit,
  ForkKnife,
  Lightning,
  PencilLine,
  Shower,
  Sparkle,
} from "@phosphor-icons/react";

const useProductCategoryIcon = (category: string) => {
  switch (category) {
    case "Food":
      return ForkKnife;
    case "Ingredient":
      return Basket;
    case "Drink":
      return BeerStein;
    case "Stationery":
      return PencilLine;
    case "Hygiene":
      return Shower;
    case "Medicine":
      return FirstAidKit;
    case "Electronic":
      return Lightning;
    case "Cosmetic":
      return Sparkle;
    default:
      return DotsThreeCircle;
  }
};

export default useProductCategoryIcon;
