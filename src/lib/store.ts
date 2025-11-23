import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PhoneItem = {
  id: number;
  brand: string;
  model: string;
  color: string;
  price: number;
  image: string;
  description?: string;
};

export type SavedFilter = {
  id: string;
  name: string;
  brands: string[];
  sellers: string[];
};

export type FilterState = {
  selectedBrands: string[];
  selectedSellers: string[];
  savedFilters: SavedFilter[];
  toggleBrand: (brand: string) => void;
  toggleSeller: (seller: string) => void;
  clearFilters: () => void;
  setFilters: (brands: string[], sellers: string[]) => void;
  saveCurrentFilter: (name: string) => void;
  applySavedFilter: (id: string) => void;
  deleteSavedFilter: (id: string) => void;
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      selectedBrands: [],
      selectedSellers: [],
      savedFilters: [],
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
      setFilters: (brands, sellers) =>
        set({ selectedBrands: brands, selectedSellers: sellers }),
      saveCurrentFilter: (name) => {
        const { selectedBrands, selectedSellers, savedFilters } = get();
        const newFilter: SavedFilter = {
          id: Date.now().toString(),
          name,
          brands: selectedBrands,
          sellers: selectedSellers,
        };
        set({ savedFilters: [...savedFilters, newFilter] });
      },
      applySavedFilter: (id) => {
        const filter = get().savedFilters.find((f) => f.id === id);
        if (filter) {
          set({
            selectedBrands: filter.brands,
            selectedSellers: filter.sellers,
          });
        }
      },
      deleteSavedFilter: (id) =>
        set((state) => ({
          savedFilters: state.savedFilters.filter((f) => f.id !== id),
        })),
    }),
    {
      name: "phone-filters-storage",
      partialize: (state) => ({ savedFilters: state.savedFilters }),
    }
  )
);

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
