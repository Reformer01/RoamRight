import Image from "next/image";
import { Card } from "@/components/ui/card";

export type Destination = { name: string; image: string; hint: string };

export function DestinationCard({ name, image, hint }: Destination) {
  return (
    <Card className="group relative overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={name}
        width={600}
        height={400}
        data-ai-hint={hint}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="font-headline text-lg font-semibold text-primary-foreground">
          {name}
        </h3>
      </div>
    </Card>
  );
}
