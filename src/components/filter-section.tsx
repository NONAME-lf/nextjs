"use client";

import { useFilterStore } from "@/lib/store";
import { SIDEBAR_FILTER_PHONE_ITEMS, SIDEBAR_FILTER_SELLERS } from "@/contants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useState } from "react";

export function FilterSection() {
  const [filterName, setFilterName] = useState("");

  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const selectedSellers = useFilterStore((state) => state.selectedSellers);
  const toggleBrand = useFilterStore((state) => state.toggleBrand);
  const toggleSeller = useFilterStore((state) => state.toggleSeller);
  const clearFilters = useFilterStore((state) => state.clearFilters);
  const savedFilters = useFilterStore((state) => state.savedFilters);
  const saveCurrentFilter = useFilterStore((state) => state.saveCurrentFilter);
  const applySavedFilter = useFilterStore((state) => state.applySavedFilter);
  const deleteSavedFilter = useFilterStore((state) => state.deleteSavedFilter);

  const hasActiveFilters =
    selectedBrands.length > 0 || selectedSellers.length > 0;

  const handleSaveFilter = () => {
    if (filterName.trim() && hasActiveFilters) {
      saveCurrentFilter(filterName.trim());
      setFilterName("");
    }
  };

  return (
    <>
      {/* Save Current Filter */}
      {hasActiveFilters && (
        <SidebarGroup>
          <SidebarGroupLabel>Зберегти фільтр</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex gap-2 px-2">
              <Input
                placeholder="Назва фільтру"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="h-8"
              />
              <Button size="sm" onClick={handleSaveFilter}>
                Зберегти
              </Button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Saved Filters */}
      {savedFilters.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Збережені фільтри</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {savedFilters.map((filter) => (
                <SidebarMenuItem key={filter.id}>
                  <div className="flex items-center gap-2 px-2 py-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => applySavedFilter(filter.id)}
                      className="flex-1 justify-start cursor-pointer"
                    >
                      {filter.name}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSavedFilter(filter.id)}
                      className="px-2 cursor-pointer"
                    >
                      ×
                    </Button>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <SidebarGroup>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="w-full cursor-pointer"
          >
            Очистити всі фільтри
          </Button>
        </SidebarGroup>
      )}

      {/* Seller Filters */}
      <SidebarGroup>
        <SidebarGroupLabel>Продавці</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {SIDEBAR_FILTER_SELLERS.map((seller) => (
              <SidebarMenuItem key={seller}>
                <SidebarMenuButton
                  onClick={() => toggleSeller(seller)}
                  isActive={selectedSellers.includes(seller)}
                >
                  <span>{seller}</span>
                  {selectedSellers.includes(seller) && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Brand Filters */}
      <SidebarGroup>
        <SidebarGroupLabel>Бренди</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {SIDEBAR_FILTER_PHONE_ITEMS.map((brand) => (
              <SidebarMenuItem key={brand}>
                <SidebarMenuButton
                  onClick={() => toggleBrand(brand)}
                  isActive={selectedBrands.includes(brand)}
                >
                  <span>{brand}</span>
                  {selectedBrands.includes(brand) && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
