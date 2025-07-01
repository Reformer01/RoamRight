'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { destinations, attractions } from '@/lib/data';
import { SidebarTrigger } from './ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AIGuide } from './ai-guide';
import { WeatherForecast } from './weather-forecast';

type Attraction = {
  name: string;
  description: string;
  image: string;
  hint: string;
};

function AttractionCard({ name, description, image, hint }: Attraction) {
    return (
        <Card>
            <CardHeader className="p-0">
                <Image
                    src={image}
                    alt={name}
                    width={600}
                    height={400}
                    data-ai-hint={hint}
                    className="aspect-video w-full rounded-t-lg object-cover"
                />
            </CardHeader>
            <CardContent className="p-4">
                <h3 className="font-headline text-lg font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}

export function DestinationDetailPage({ slug }: { slug: string }) {
  const destination = destinations.find((d) => d.slug === slug);
  const destinationAttractions = (attractions as any)[slug] || [];

  if (!destination) {
    notFound();
  }

  return (
    <div className="flex h-full min-h-svh flex-col">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="truncate font-headline text-2xl font-semibold">
            {destination.name}
          </h1>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="relative h-64 w-full md:h-96">
          <Image
            src={destination.image}
            alt={destination.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={destination.hint}
            className="opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="p-4 md:p-6">
          <h1 className="font-headline text-4xl font-bold md:text-5xl -mt-16 relative z-10">
            {destination.name}
          </h1>

          <Tabs defaultValue="overview" className="mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="ai-guide">AI Guide</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6 space-y-8">
               <section>
                    <h2 className="font-headline text-2xl font-semibold mb-4">About {destination.name}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Welcome to {destination.name}! This is a placeholder description. You can use the AI Guide to ask specific questions and get detailed information about your trip, including insider tips, cultural etiquette, and hidden gems. Start by asking something like, "What are some family-friendly activities?" or "What's the best way to get around the city?"
                    </p>
                </section>
                <section>
                    <h2 className="font-headline text-2xl font-semibold mb-4">Map</h2>
                    <div className="aspect-video w-full overflow-hidden rounded-lg border">
                        <Image
                            src="https://placehold.co/1200x400.png"
                            alt={`Map of ${destination.name}`}
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
                    {destinationAttractions.map((attraction: Attraction, index: number) => (
                        <AttractionCard key={index} {...attraction} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="weather" className="mt-6">
                <WeatherForecast destinationName={destination.name} />
            </TabsContent>
            <TabsContent value="ai-guide" className="mt-6">
                <AIGuide destinationName={destination.name} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
