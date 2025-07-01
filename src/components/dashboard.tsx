"use client";

import {
  ArrowRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ItineraryOptimizer } from "./itinerary-optimizer";
import { destinations, recommendations, trips } from "@/lib/data";
import { TripCard } from "./trip-card";
import { DestinationCard } from "./destination-card";
import { RecommendationCard } from "./recommendation-card";
import { FlightTracker } from "./flight-tracker";

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
              <Button variant="link" className="text-primary" asChild>
                <Link href="/trips">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-headline text-xl font-semibold">
                  AI Itinerary Optimizer
                </h2>
              </div>
              <ItineraryOptimizer />
            </section>
             <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-headline text-xl font-semibold">
                        Flight Status
                    </h2>
                </div>
                <FlightTracker />
             </section>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-headline text-xl font-semibold">
                    Explore Destinations
                  </h2>
                   <Button variant="link" className="text-primary" asChild>
                     <Link href="/destinations">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
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
