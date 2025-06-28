import Image from "next/image";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export type Recommendation = { title: string; category: string; image: string; hint: string; location: string };

export function RecommendationCard({ title, category, image, hint, location }: Recommendation) {
    return (
        <Card className="group flex items-center gap-4 p-3 transition-all hover:bg-card/90">
             <Image
                src={image}
                alt={title}
                width={80}
                height={80}
                data-ai-hint={hint}
                className="aspect-square h-20 w-20 rounded-md object-cover"
            />
            <div className="flex-1">
                <Badge variant="secondary" className="mb-1 text-xs">{category}</Badge>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <Activity className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </Card>
    );
}
