"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNavBar } from "./bottom-nav-bar";
import { ItineraryOptimizer } from "./itinerary-optimizer";
import { FlightTracker } from "./flight-tracker";

export function Dashboard() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <main className="p-4 md:p-6 space-y-8 pb-24">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Welcome back,</p>
            <h1 className="text-3xl font-bold font-headline">Alex</h1>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://i.pravatar.cc/48?u=roamright`}
              alt="User Avatar"
            />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </header>

        <div className="space-y-8">
            <FlightTracker />
            <ItineraryOptimizer />
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
}
