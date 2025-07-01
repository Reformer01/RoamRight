'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HeartCrack } from 'lucide-react';
import { DestinationCard } from './destination-card';
import { BottomNavBar } from './bottom-nav-bar';

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const router = useRouter();

  return (
    <div className="min-h-svh bg-background text-foreground pb-24">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
            <div className="container mx-auto flex h-16 items-center px-4">
            <Button variant="ghost" size="icon" className="rounded-full mr-2" onClick={() => router.back()}>
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-xl font-bold font-headline">My Wishlist</h1>
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
            <h2 className="text-2xl font-bold font-headline mb-2">Your Wishlist is Empty</h2>
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
