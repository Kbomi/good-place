import { categories, price } from "@/constants/restaurant";

export const getCategoryLabel = (_category: string) => {
  return categories.find((item) => item.value === _category)?.label ?? "";
};

export const getPriceLabel = (_label: number) => {
  return price.find((item) => item.value === _label)?.label ?? "";
};
