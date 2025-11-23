"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PHONE_ITEMS } from "@/contants";
import { useFilterStore, filterPhoneItems } from "@/lib/store";
import { useMemo } from "react";
import Link from "next/link";

export default function PhonesList() {
  const selectedBrands = useFilterStore((state) => state.selectedBrands);
  const selectedSellers = useFilterStore((state) => state.selectedSellers);

  const filteredPhones = useMemo(
    () =>
      filterPhoneItems(PHONE_ITEMS, {
        selectedBrands,
        selectedSellers,
      }),
    [selectedBrands, selectedSellers]
  );

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
