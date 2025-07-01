'use client';

import Link from 'next/link';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HeartCrack } from 'lucide-react';
import { DestinationCard } from './destination-card';
import { BottomNavBar } from './bottom-nav-bar';

export function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-svh bg-background text-foreground pb-24">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" passHref>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <ArrowLeft />
                    <span className="sr-only">Back to Home</span>
                </Button>
            </Link>
            <h1 className="text-lg font-bold">My Wishlist</h1>
            <div className="w-10"></div> {/* Spacer */}
            </div>
      </header>
      <main className="p-4 md:p-6 container mx-auto">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {favorites.map((dest) => (
              <DestinationCard key={dest.slug} {...dest} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <HeartCrack className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added any destinations yet.
            </p>
            <Link href="/">
                <Button>Explore Destinations</Button>
            </Link>
          </div>
        )}
      </main>
      <BottomNavBar />
    </div>
  );
}
