'use client';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { destinations, attractions } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIGuide } from './ai-guide';
import { WeatherForecast } from './weather-forecast';
import { Button } from './ui/button';
import { ChevronLeft, Heart } from 'lucide-react';

export function DestinationDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const destination = destinations.find((d) => d.slug === slug);
  const destinationAttractions = (attractions as any)[slug] || [];

  if (!destination) {
    notFound();
  }
  
  const destinationFullName = `${destination.place}, ${destination.country}`;

  return (
    <div className="flex min-h-svh flex-col bg-card">
      <main className="flex-1 overflow-auto">
        <div className="relative h-80 w-full">
          <Image
            src={destination.image}
            alt={destination.place}
            layout="fill"
            objectFit="cover"
            data-ai-hint={destination.hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 left-4">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/20 text-white backdrop-blur-sm border-none hover:bg-black/40" onClick={() => router.back()}>
                <ChevronLeft />
              </Button>
          </div>
           <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" className="rounded-full bg-black/20 text-white backdrop-blur-sm border-none hover:bg-black/40">
                <Heart />
              </Button>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-background rounded-t-3xl -mt-8 relative z-10">
          <div>
            <p className="text-sm text-muted-foreground">{destination.country}</p>
            <h1 className="font-bold text-3xl">
              {destination.place}
            </h1>
          </div>
          

          <Tabs defaultValue="overview" className="mt-6 w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="ai-guide">AI Guide</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6 space-y-8">
               <section>
                    <h2 className="font-bold text-xl mb-2">About {destination.place}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Welcome to {destination.place}! This is a placeholder description. You can use the AI Guide to ask specific questions and get detailed information about your trip, including insider tips, cultural etiquette, and hidden gems. Start by asking something like, "What are some family-friendly activities?" or "What's the best way to get around the city?"
                    </p>
                </section>
                <section>
                    <h2 className="font-bold text-xl mb-2">Map</h2>
                    <div className="aspect-video w-full overflow-hidden rounded-lg border">
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                   <p className="text-muted-foreground">No attractions listed yet. Ask the AI Guide!</p>
                </div>
            </TabsContent>
            <TabsContent value="weather" className="mt-6">
                <WeatherForecast destinationName={destinationFullName} />
            </TabsContent>
            <TabsContent value="ai-guide" className="mt-6">
                <AIGuide destinationName={destinationFullName} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
