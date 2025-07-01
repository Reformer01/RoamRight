"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { destinations } from "@/lib/data";
import { DestinationCard } from "./destination-card";
import { Button } from "./ui/button";
import { ArrowLeft, Hiking, Bike } from "lucide-react";

// Lucide doesn't have a Kayak icon, so we use a generic Ship icon
const KayakIcon = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sailboat" {...props}><path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"/><path d="M21 14 10 2 3 14h18Z"/><path d="M12 2v10"/></svg>
);

const moodTitles: { [key: string]: string } = {
    relaxation: "Relax & Recharge",
    adventure: "Thrill Seeker",
    culture: "Cultural Explorer",
    foodie: "Foodie Paradise",
};

export function DestinationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mood = searchParams.get('mood');

  const filteredDestinations = mood
    ? destinations.filter(dest => dest.moods.includes(mood || ''))
    : destinations;

  const pageTitle = mood ? `${moodTitles[mood] || 'Selected'} Destinations` : "Select destination";


  return (
    <div className="bg-background text-foreground font-body">
      <div className="mx-auto flex min-h-svh max-w-lg flex-col space-y-6 p-4 md:p-6">
        <header className="flex items-center">
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="sr-only">Back</span>
          </Button>
        </header>

        <div className="space-y-4">
            <h1 className="text-3xl font-bold font-headline">{pageTitle}</h1>
            <div className="flex space-x-2 overflow-x-auto pb-2">
            <Button variant="secondary" className="rounded-full font-medium flex-shrink-0">
                <Hiking className="mr-2 h-4 w-4" /> Hiking
            </Button>
            <Button variant="secondary" className="rounded-full font-medium flex-shrink-0">
                <KayakIcon className="mr-2 h-4 w-4" /> Kayaking
            </Button>
            <Button variant="secondary" className="rounded-full font-medium flex-shrink-0">
                <Bike className="mr-2 h-4 w-4" /> Biking
            </Button>
            </div>
        </div>

        <main className="flex-1 pb-4">
            <div className="grid grid-cols-2 gap-4">
            {filteredDestinations.length > 0 ? filteredDestinations.map((dest, index) => (
                <DestinationCard key={index} {...dest} />
            )) : (
              <div className="col-span-2 text-center py-10">
                <p className="text-muted-foreground">No destinations found for this mood.</p>
              </div>
            )}
            </div>
        </main>
      </div>
    </div>
  );
}
