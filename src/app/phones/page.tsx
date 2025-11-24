"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PHONE_ITEMS } from "@/contants";
import { useFilterStore, filterPhoneItems } from "@/lib/store";
import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PhoneCardSkeleton } from "@/components/phone-card-skeleton";

export default function PhonesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const selectedSellers = useFilterStore((state) => state.selectedSellers);
  const setFilters = useFilterStore((state) => state.setFilters);

  // sync url on mount
  useEffect(() => {
    const brandsParam = searchParams.get("brands");
    const sellersParam = searchParams.get("sellers");

    if (brandsParam || sellersParam) {
      const brands = brandsParam ? brandsParam.split(",") : [];
      const sellers = sellersParam ? sellersParam.split(",") : [];
      setFilters(brands, sellers);
    }

    // simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, [searchParams]);

  // sync store to url params when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    }
    if (selectedSellers.length > 0) {
      params.set("sellers", selectedSellers.join(","));
    }

    const newUrl = params.toString() ? `?${params.toString()}` : "/phones";
    router.replace(newUrl, { scroll: false });
  }, [selectedBrands, selectedSellers]);

  const filteredPhones = useMemo(
    () =>
      filterPhoneItems(PHONE_ITEMS, {
        selectedBrands,
        selectedSellers,
      }),
    [selectedBrands, selectedSellers]
  );

  if (isLoading) {
    return (
      <ul className="container grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index} className="max-h-150">
            <PhoneCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="container grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {filteredPhones.map((phone) => (
        <li key={phone.id} className="max-h-150">
          <Link href={`/phones/${phone.id}`}>
            <Card className="h-full flex flex-col justify-between">
              <CardContent className="h-100 max-h-90 p-2">
                <img
                  className="w-full h-full object-cover"
                  src={phone.image}
                  alt={`${phone.brand} ${phone.model}`}
                />
              </CardContent>
              <CardContent>
                Мобільний телефон {phone.brand} {phone.model} {phone.color}
              </CardContent>
              <CardFooter>Ціна: {phone.price} грн</CardFooter>
              <CardAction className="px-4 w-full">
                <Button className="cursor-pointer w-full">Buy</Button>
              </CardAction>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
