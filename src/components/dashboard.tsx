"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNavBar } from "./bottom-nav-bar";
import { ItineraryOptimizer } from "./itinerary-optimizer";
import { FlightTracker } from "./flight-tracker";
import { BedDouble, Landmark, MountainSnow, Utensils, ClipboardList } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

const moods = [
    { name: 'Relax & Recharge', icon: BedDouble, slug: 'relaxation' },
    { name: 'Thrill Seeker', icon: MountainSnow, slug: 'adventure' },
    { name: 'Cultural Explorer', icon: Landmark, slug: 'culture' },
    { name: 'Foodie Paradise', icon: Utensils, slug: 'foodie' },
];

function MoodCard({ name, icon: Icon, slug }: { name: string, icon: React.ElementType, slug: string }) {
    return (
        <Link href={`/destinations?mood=${slug}`} className="block group">
            <Card className="flex flex-col items-center justify-center p-4 text-center h-32 transition-all duration-300 ease-in-out group-hover:bg-primary/10 group-hover:scale-105 group-hover:shadow-lg">
                <Icon className="w-8 h-8 text-primary mb-2 transition-transform group-hover:-translate-y-1" />
                <p className="font-semibold text-sm text-foreground">{name}</p>
            </Card>
        </Link>
    )
}

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
        
        <section className="space-y-4">
            <h2 className="text-xl font-bold font-headline">Plan by Mood</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {moods.map((mood) => (
                    <MoodCard key={mood.slug} {...mood} />
                ))}
            </div>
        </section>

        <div className="space-y-8">
            <Link href="/planner" className="block">
                <Card className="hover:bg-primary/10 transition-colors">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <ClipboardList className="text-primary" />
                            <span>Dynamic Itinerary Planner</span>
                        </CardTitle>
                        <CardDescription>
                            Build and organize your trip with our new drag-and-drop planner.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </Link>
            <FlightTracker />
            <ItineraryOptimizer />
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
}
