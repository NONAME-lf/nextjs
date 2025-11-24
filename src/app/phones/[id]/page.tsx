import { PHONE_ITEMS } from "@/contants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PhonePage({ params }: { params: { id: string } }) {
  const phone = PHONE_ITEMS.find((p) => p.id === +params.id);
  if (!phone) {
    return <div className="p-8">Phone not found</div>;
  }

  return (
    <div className="detail-phone-component p-8 max-w-300 mx-auto">
      <Link
        href="/phones"
        className="inline-flex items-center gap-2 text-sm hover:underline"
      >
        {"<- Back"}
      </Link>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:grid-cols-1 ">
        <div className="bg-card p-4 rounded-lg border">
          <img
            src={phone.image}
            alt={`${phone.brand} ${phone.model}`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">
              {phone.brand} {phone.model}
            </h1>
            <Badge variant="secondary" className="mt-2">
              {phone.color}
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Опис</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {phone.description}
              </CardDescription>
            </CardContent>
          </Card>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">
              {phone.price} грн
            </span>
          </div>

          <Button className="w-full" size="lg">
            Купити
          </Button>
        </div>
      </div>
    </div>
  );
}
