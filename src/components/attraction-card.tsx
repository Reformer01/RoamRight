import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

export type Attraction = {
    name: string;
    description: string;
    image: string;
    hint: string;
};

export function AttractionCard({ name, description, image, hint }: Attraction) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <Image
                    src={image}
                    alt={name}
                    width={400}
                    height={200}
                    data-ai-hint={hint}
                    className="aspect-video w-full object-cover"
                />
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-lg font-bold mb-1">{name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    )
}
