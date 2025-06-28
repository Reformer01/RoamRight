"use client";

import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Plus,
  Share2,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ItineraryOptimizer } from "./itinerary-optimizer";
import { cn } from "@/lib/utils";

const trips = [
  {
    name: "Summer in Santorini",
    date: "July 15-25, 2024",
    image: "https://placehold.co/600x400.png",
    hint: "greece santorini",
    collaborators: [
      "https://i.pravatar.cc/40?u=a",
      "https://i.pravatar.cc/40?u=b",
      "https://i.pravatar.cc/40?u=c",
    ],
  },
  {
    name: "Kyoto Cherry Blossoms",
    date: "April 5-12, 2025",
    image: "https://placehold.co/600x400.png",
    hint: "kyoto japan",
  },
  {
    name: "Adventure in Costa Rica",
    date: "Jan 10-20, 2025",
    image: "https://placehold.co/600x400.png",
    hint: "costa rica",
  },
  {
    name: "New York Christmas",
    date: "Dec 20-27, 2024",
    image: "https://placehold.co/600x400.png",
    hint: "new york",
  },
];

const destinations = [
  { name: "Paris, France", image: "https://placehold.co/600x400.png", hint: "paris france" },
  { name: "Rome, Italy", image: "https://placehold.co/600x400.png", hint: "rome italy" },
  { name: "Bali, Indonesia", image: "https://placehold.co/600x400.png", hint: "bali indonesia" },
  { name: "Machu Picchu, Peru", image: "https://placehold.co/600x400.png", hint: "machu picchu" },
];

const recommendations = [
    { title: "Hiking Diamond Head", category: "Activity", image: "https://placehold.co/600x400.png", hint: "hawaii volcano", location: "Oahu, Hawaii" },
    { title: "Gjelina", category: "Restaurant", image: "https://placehold.co/600x400.png", hint: "modern restaurant", location: "Venice, CA" },
    { title: "Musée d'Orsay", category: "Museum", image: "https://placehold.co/600x400.png", hint: "art museum", location: "Paris, France" },
    { title: "Snorkeling at the Great Barrier Reef", category: "Activity", image: "https://placehold.co/600x400.png", hint: "snorkeling reef", location: "Queensland, Australia" },
]

export function Dashboard() {
  return (
    <div className="flex h-full min-h-svh flex-col">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="font-headline text-2xl font-semibold">Dashboard</h1>
        </div>
        <Button>
          <Plus className="mr-2" /> Create New Trip
        </Button>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="space-y-12">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-headline text-xl font-semibold">My Trips</h2>
              <Button variant="link" className="text-primary">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {trips.map((trip, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <TripCard {...trip} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden lg:flex" />
              <CarouselNext className="hidden lg:flex" />
            </Carousel>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-headline text-xl font-semibold">
                AI Itinerary Optimizer
              </h2>
            </div>
            <ItineraryOptimizer />
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-headline text-xl font-semibold">
                    Explore Destinations
                  </h2>
                   <Button variant="link" className="text-primary">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {destinations.map((dest, index) => (
                    <DestinationCard key={index} {...dest} />
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-headline text-xl font-semibold">For You</h2>
                   <Button variant="link" className="text-primary">
                    More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {recommendations.map((rec, index) => (
                        <RecommendationCard key={index} {...rec} />
                    ))}
                 </div>
              </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function TripCard({ name, date, image, hint, collaborators }: (typeof trips)[0]) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={image}
          alt={name}
          width={600}
          height={400}
          data-ai-hint={hint}
          className="aspect-video w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-headline text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex items-center">
          {collaborators && (
            <div className="flex -space-x-2">
              {collaborators.map((c, i) => (
                <Avatar
                  key={i}
                  className="h-8 w-8 border-2 border-card"
                >
                  <AvatarImage src={c} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
           {collaborators && <Users className="ml-2 h-5 w-5 text-muted-foreground" />}
        </div>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function DestinationCard({ name, image, hint }: (typeof destinations)[0]) {
  return (
    <Card className="group relative overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={name}
        width={600}
        height={400}
        data-ai-hint={hint}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="font-headline text-lg font-semibold text-primary-foreground">
          {name}
        </h3>
      </div>
    </Card>
  );
}

function RecommendationCard({ title, category, image, hint, location }: (typeof recommendations)[0]) {
    return (
        <Card className="group flex items-center gap-4 p-3 transition-all hover:bg-card/90">
             <Image
                src={image}
                alt={title}
                width={80}
                height={80}
                data-ai-hint={hint}
                className="aspect-square h-20 w-20 rounded-md object-cover"
            />
            <div className="flex-1">
                <Badge variant="secondary" className="mb-1 text-xs">{category}</Badge>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <Activity className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Card>
    );
}
