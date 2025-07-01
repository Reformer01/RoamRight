"use client";

import { destinations } from "@/lib/data";
import { DestinationCard } from "./destination-card";
import { Button } from "./ui/button";
import { ArrowLeft, Menu, Star, Hiking, Bike } from "lucide-react";

// Lucide doesn't have a Kayak icon, so we use a generic Ship icon
const KayakIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sailboat" {...props}><path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"/><path d="M21 14 10 2 3 14h18Z"/><path d="M12 2v10"/></svg>
);


export function DestinationsPage() {
  return (
    <div className="bg-background text-foreground font-body">
      <div className="mx-auto flex min-h-svh max-w-md flex-col space-y-6 p-4">
        <header className="flex items-center justify-between">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Star />
          </Button>
        </header>

        <div className="space-y-4">
            <h1 className="text-3xl font-bold font-headline">Select destination</h1>
            <div className="flex space-x-2">
            <Button variant="secondary" className="rounded-full font-medium">
                <Hiking className="mr-2 h-4 w-4" /> Hiking
            </Button>
            <Button variant="secondary" className="rounded-full font-medium">
                <KayakIcon className="mr-2 h-4 w-4" /> Kayaking
            </Button>
            <Button variant="secondary" className="rounded-full font-medium">
                <Bike className="mr-2 h-4 w-4" /> Biking
            </Button>
            </div>
        </div>

        <main className="flex-1">
            <div className="grid grid-cols-2 gap-4">
            {destinations.map((dest, index) => (
                <DestinationCard key={index} {...dest} />
            ))}
            </div>
        </main>
        
        <footer className="sticky bottom-4 w-full">
            <Button size="lg" className="w-full rounded-full text-lg h-14">Book Now</Button>
        </footer>
      </div>
    </div>
  );
}
