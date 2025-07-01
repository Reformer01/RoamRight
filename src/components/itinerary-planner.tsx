'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { sampleActivities } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import { GripVertical, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="flex items-center gap-2">
      <span {...listeners} className="cursor-grab p-2 text-muted-foreground hover:bg-accent rounded-md">
        <GripVertical />
      </span>
      <div className="flex-grow">{children}</div>
    </div>
  );
}


export function ItineraryPlanner() {
  const [activities, setActivities] = useState(sampleActivities);
  const router = useRouter();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActivities((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-xl font-bold font-headline">Itinerary Planner</h1>
            <Button>Save</Button>
        </div>
      </header>

      <main className="p-4 md:p-6 container mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Paris Trip - Day 1</CardTitle>
                <CardDescription>Drag and drop to reorder your activities.</CardDescription>
            </CardHeader>
            <CardContent>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={activities.map(a => a.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-4">
                        {activities.map((activity) => (
                            <SortableItem key={activity.id} id={activity.id}>
                               <Card>
                                 <CardContent className="p-4">
                                   <p className="font-semibold">{activity.name}</p>
                                   <p className="text-sm text-muted-foreground">{activity.duration}</p>
                                 </CardContent>
                               </Card>
                            </SortableItem>
                        ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
