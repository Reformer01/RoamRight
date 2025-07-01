import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

export type Destination = {
  place: string;
  country: string;
  image: string;
  hint: string;
  slug: string;
};

export function DestinationCard({ place, country, image, hint, slug }: Destination) {
  return (
    <Link href={`/destinations/${slug}`} className="block">
      <Card className="group relative h-full overflow-hidden rounded-2xl border-none shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <Image
          src={image}
          alt={place}
          width={600}
          height={400}
          data-ai-hint={hint}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-2 right-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
                <Star className="h-4 w-4 text-white" />
            </div>
        </div>
        <div className="absolute bottom-0 left-0 p-3 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider">{country}</p>
            <h3 className="text-base font-bold">{place}</h3>
        </div>
      </Card>
    </Link>
  );
}
