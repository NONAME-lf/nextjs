import {
  Card,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PhoneCardSkeleton() {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardContent className="h-100 max-h-90 p-2">
        <Skeleton className="w-full h-full" />
      </CardContent>
      <CardContent>
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-24" />
      </CardFooter>
      <CardAction className="px-4 w-full">
        <Skeleton className="h-10 w-full" />
      </CardAction>
    </Card>
  );
}
