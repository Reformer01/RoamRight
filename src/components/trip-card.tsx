import Image from "next/image";
import { Users, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export type Trip = {
    name: string;
    date: string;
    image: string;
    hint: string;
    collaborators?: string[];
};

export function TripCard({ name, date, image, hint, collaborators }: Trip) {
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={image}
          alt={name}
          width={600}
          height={400}
          data-ai-hint={hint}
          className="aspect-video w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-headline text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{date}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex items-center">
          {collaborators && (
            <div className="flex -space-x-2">
              {collaborators.map((c, i) => (
                <Avatar
                  key={i}
                  className="h-8 w-8 border-2 border-card"
                >
                  <AvatarImage src={c} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
           {collaborators && <Users className="ml-2 h-5 w-5 text-muted-foreground" />}
        </div>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
