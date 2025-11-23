import { create } from "zustand";

export type PhoneItem = {
  brand: string;
  model: string;
  color: string;
  price: number;
  image: string;
};

export type FilterState = {
  selectedBrands: string[];
  selectedSellers: string[];
  toggleBrand: (brand: string) => void;
  toggleSeller: (seller: string) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  selectedBrands: [],
  selectedSellers: [],
  toggleBrand: (brand) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter((b) => b !== brand)
        : [...state.selectedBrands, brand],
    })),
  toggleSeller: (seller) =>
    set((state) => ({
      selectedSellers: state.selectedSellers.includes(seller)
        ? state.selectedSellers.filter((s) => s !== seller)
        : [...state.selectedSellers, seller],
    })),
  clearFilters: () => set({ selectedBrands: [], selectedSellers: [] }),
}));

export function filterPhoneItems(
  items: PhoneItem[],
  filters: { selectedBrands: string[]; selectedSellers: string[] }
) {
  return items.filter((item) => {
    if (
      filters.selectedBrands.length > 0 &&
      !filters.selectedBrands.includes(item.brand)
    ) {
      return false;
    }
    return true;
  });
}
