"use client";

import { TripCard } from "@/components/trip-card";
import { trips } from "@/lib/data";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MyTripsPage() {
  return (
    <div className="flex h-full min-h-svh flex-col">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="font-headline text-2xl font-semibold">My Trips</h1>
        </div>
        <Button>
          <Plus className="mr-2" /> Create New Trip
        </Button>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trips.map((trip, index) => (
            <TripCard key={index} {...trip} />
          ))}
        </div>
      </main>
    </div>
  );
}
