"use client";

import { useFilterStore } from "@/lib/store";
import { SIDEBAR_FILTER_PHONE_ITEMS, SIDEBAR_FILTER_SELLERS } from "@/contants";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { X } from "lucide-react";

export function FilterSection() {
  // Subscribe to filter state and actions
  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const selectedSellers = useFilterStore((state) => state.selectedSellers);
  const toggleBrand = useFilterStore((state) => state.toggleBrand);
  const toggleSeller = useFilterStore((state) => state.toggleSeller);
  const clearFilters = useFilterStore((state) => state.clearFilters);
  //   const hasActiveFilters = useFilterStore((state) => state.hasActiveFilters());

  return (
    <>
      {/* Clear Filters Button */}
      {
        <SidebarGroup>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="w-full cursor-pointer"
          >
            <X className="size-4 mr-2" />
            Clear all filters
          </Button>
        </SidebarGroup>
      }

      {/* Seller Filters */}
      <SidebarGroup>
        <SidebarGroupLabel>Sellers</SidebarGroupLabel>
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
                    <span className="ml-auto text-xs">+</span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Brand Filters */}
      <SidebarGroup>
        <SidebarGroupLabel>Brands</SidebarGroupLabel>
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
                    <span className="ml-auto text-xs">+</span>
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
