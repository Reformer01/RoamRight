import Image from "next/image";
import { Star, CircleArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

export type Trip = {
    name: string;
    image: string;
    hint: string;
    duration: string;
    price: number;
    rating: number;
    reviews: number;
    slug: string;
};

export function TripCard({ name, image, hint, duration, price, rating, reviews, slug }: Trip) {
  return (
    <Link href={`/trips`}>
        <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-none bg-secondary/50">
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            data-ai-hint={hint}
            className="aspect-square w-full object-cover rounded-t-2xl"
          />
          <CardContent className="p-3 space-y-2">
            <h3 className="font-bold text-base truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">{duration} &bull; from ${price}/person</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold text-sm">{rating}</span>
                    <span className="text-xs text-muted-foreground">({reviews})</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <CircleArrowRight />
                </Button>
            </div>
          </CardContent>
        </Card>
    </Link>
  );
}
