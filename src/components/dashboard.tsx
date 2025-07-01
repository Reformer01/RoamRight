"use client";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { destinations, trips } from "@/lib/data";
import { TripCard } from "./trip-card";
import { DestinationCard } from "./destination-card";
import { BottomNavBar } from "./bottom-nav-bar";

export function Dashboard() {
  const featuredDestination = destinations[0];

  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="p-4 md:p-6 space-y-6 pb-24">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hello, Alex</h1>
            <p className="text-muted-foreground">Welcome to RoamRight</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={`https://i.pravatar.cc/40?u=roamright`}
              alt="User Avatar"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </header>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search" className="pl-10 h-12 bg-secondary border-none" />
          <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
            <SlidersHorizontal />
          </Button>
        </div>

        <section>
          <h2 className="text-xl font-bold mb-3">Select your next trip</h2>
          <div className="flex gap-2">
            <Button variant="secondary" className="rounded-full font-semibold bg-primary text-primary-foreground">Asia</Button>
            <Button variant="secondary" className="rounded-full font-semibold">Europe</Button>
            <Button variant="secondary" className="rounded-full font-semibold">South America</Button>
          </div>
        </section>

        <section>
          <DestinationCard {...featuredDestination} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold">Upcoming tours</h2>
            <Link href="/trips" className="text-sm font-semibold text-primary">See all</Link>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent>
              {trips.map((trip, index) => (
                <CarouselItem key={index} className="basis-2/3 md:basis-1/3">
                  <TripCard {...trip} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </main>
      <BottomNavBar />
    </div>
  );
}
