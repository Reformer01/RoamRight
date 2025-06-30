"use client";

import { destinations } from "@/lib/data";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DestinationCard } from "./destination-card";

export function DestinationsPage() {
  return (
    <div className="flex h-full min-h-svh flex-col">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <h1 className="font-headline text-2xl font-semibold">Destinations</h1>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest, index) => (
            <DestinationCard key={index} {...dest} />
          ))}
        </div>
      </main>
    </div>
  );
}
