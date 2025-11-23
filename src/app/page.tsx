import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <h1 className="text-5xl font-bold tracking-tight">
            Каталог телефонів
          </h1>
        </Badge>
        <p className="text-xl text-muted-foreground">
          Знайдіть ідеальний телефон для себе. Широкий вибір брендів та моделей
          за найкращими цінами.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/phones">
            <Button size="lg">Переглянути телефони →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
