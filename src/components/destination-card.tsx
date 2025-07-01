"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';

export type Destination = {
  place: string;
  country: string;
  image: string;
  hint: string;
  slug: string;
  rating: number;
  reviews: number;
};

export function DestinationCard(destination: Destination) {
  const { place, country, image, hint, slug, rating, reviews } = destination;
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-3xl group">
       <Link href={`/destinations/${slug}`} className="block h-full w-full">
        <Image
          src={image}
          alt={place}
          fill
          data-ai-hint={hint}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
       </Link>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-sm border-none hover:bg-black/40"
        onClick={(e) => {
            e.preventDefault();
            toggleFavorite(destination);
        }}
        >
        <Heart className={cn('transition-colors', isFavorite(slug) ? 'fill-red-500 text-red-500' : '')} />
      </Button>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div>
          <p className="font-semibold text-white">{country}</p>
          <h3 className="text-2xl font-bold text-white">{place}</h3>
        </div>
        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-white">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{rating.toFixed(1)}</span>
                <span className="text-sm text-neutral-300">({reviews} reviews)</span>
            </div>
            <Link href={`/destinations/${slug}`} className="block">
                <Button className="rounded-full bg-white/30 text-white backdrop-blur-sm hover:bg-white/40">
                    See more
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
