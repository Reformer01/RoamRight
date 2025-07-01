'use client';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { destinations, attractions } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIGuide } from './ai-guide';
import { WeatherForecast } from './weather-forecast';
import { Button } from './ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { AttractionCard } from './attraction-card';
import { useFavorites } from '@/hooks/use-favorites';
import { cn } from '@/lib/utils';
import type { Destination } from './destination-card';

export function DestinationDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const destination = destinations.find((d) => d.slug === slug);
  const destinationAttractions = (attractions as any)[slug] || [];

  if (!destination) {
    notFound();
  }
  
  const destinationFullName = `${destination.place}, ${destination.country}`;

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-lg font-bold truncate">{destination.place}</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => toggleFavorite(destination as Destination)}
            >
            <Heart className={cn('transition-colors', isFavorite(slug) ? 'fill-red-500 text-red-500' : '')} />
            <span className="sr-only">Favorite</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 container mx-auto">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="ai-guide">AI Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
              <section>
                  <div className="relative w-full h-64 overflow-hidden rounded-2xl mb-4">
                      <Image
                        src={destination.image}
                        alt={destination.place}
                        fill
                        data-ai-hint={destination.hint}
                        className="object-cover"
                      />
                  </div>
                  <h2 className="font-bold text-2xl mb-2">About {destination.place}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                      Welcome to {destination.place}! This is a placeholder description. You can use the AI Guide to ask specific questions and get detailed information about your trip, including insider tips, cultural etiquette, and hidden gems. Start by asking something like, "What are some family-friendly activities?" or "What's the best way to get around the city?"
                  </p>
              </section>
              <section>
                  <h2 className="font-bold text-2xl mb-2">Map</h2>
                  <div className="aspect-video w-full overflow-hidden rounded-2xl border">
                      <Image
                          src="https://placehold.co/1200x400.png"
                          alt={`Map of ${destination.place}`}
                          width={1200}
                          height={400}
                          data-ai-hint="city map"
                          className="h-full w-full object-cover"
                      />
                  </div>
              </section>
          </TabsContent>

          <TabsContent value="attractions" className="mt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {destinationAttractions.length > 0 ? (
                    destinationAttractions.map((attraction: any, index: number) => (
                        <AttractionCard key={index} {...attraction} />
                    ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground">No attractions listed yet. Ask the AI Guide!</p>
                  </div>
                )}
              </div>
          </TabsContent>

          <TabsContent value="weather" className="mt-6">
              <WeatherForecast destinationName={destinationFullName} />
          </TabsContent>

          <TabsContent value="ai-guide" className="mt-6">
              <AIGuide destinationName={destinationFullName} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
