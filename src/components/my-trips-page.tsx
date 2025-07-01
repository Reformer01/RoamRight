"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trips } from "@/lib/data";
import { ChevronLeft, Heart } from "lucide-react";
import { BottomNavBar } from "./bottom-nav-bar";
import { PackingAssistant } from "./packing-assistant";

export function MyTripsPage() {
  const trip = trips[0]; // Use the first trip as an example
  const itinerary = trip.itinerary;
  const destinationFullName = `${trip.name}`; // Simplified for example

  return (
    <div className="bg-background min-h-svh pb-24">
      <header className="relative h-64">
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          className="object-cover"
          data-ai-hint={trip.hint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="rounded-full bg-black/20 text-white backdrop-blur-sm border-none hover:bg-black/40">
              <ChevronLeft />
            </Button>
          </Link>
        </div>
        <div className="absolute top-4 right-4">
          <Button variant="ghost" size="icon" className="rounded-full bg-black/20 text-white backdrop-blur-sm border-none hover:bg-black/40">
            <Heart />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold">{trip.name}</h1>
            <p className="text-sm">{trip.date}</p>
        </div>
      </header>
      
      <main className="p-4">
        <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="schedule">Tour schedule</TabsTrigger>
              <TabsTrigger value="packing">Packing List</TabsTrigger>
              <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
              <TabsTrigger value="booking">Booking details</TabsTrigger>
            </TabsList>
            <TabsContent value="schedule" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">{trip.duration} Brazil Adventure</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {itinerary.map((day, index) => (
                    <AccordionItem value={`item-${index+1}`} key={index} className="bg-card rounded-xl border-none">
                        <AccordionTrigger className="p-4 font-bold text-left hover:no-underline">
                            <div className="flex items-center gap-4">
                               <Image 
                                 src={day.image}
                                 alt={day.title}
                                 width={64}
                                 height={64}
                                 className="rounded-lg aspect-square object-cover"
                                 data-ai-hint={day.hint}
                               />
                               <div>
                                 <p className="text-sm font-semibold text-muted-foreground">Day {day.day}</p>
                                 <p className="text-base font-bold text-foreground">{day.title}</p>
                               </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0">
                           <div className="space-y-4 text-muted-foreground">
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1">Morning</h4>
                                    <p>{day.morning}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold text-foreground mb-1">Afternoon</h4>
                                    <p>{day.afternoon}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold text-foreground mb-1">Evening</h4>
                                    <p>{day.evening}</p>
                                </div>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent value="packing" className="mt-6">
                <PackingAssistant destinationName={destinationFullName} />
            </TabsContent>
            <TabsContent value="accommodation" className="mt-6 text-center">
                <p className="text-muted-foreground">Accommodation details will be shown here.</p>
            </TabsContent>
            <TabsContent value="booking" className="mt-6 text-center">
                <p className="text-muted-foreground">Booking details will be shown here.</p>
            </TabsContent>
        </Tabs>
      </main>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm">
        <Button size="lg" className="w-full h-12 text-base rounded-xl">Book a tour</Button>
      </div>

      <BottomNavBar />
    </div>
  );
}
