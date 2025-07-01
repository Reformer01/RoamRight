import Link from 'next/link';
import { Home, Briefcase, Heart, User } from 'lucide-react';
import { Button } from './ui/button';

export function BottomNavBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 shadow-t backdrop-blur-sm">
      <div className="flex h-16 items-center justify-around px-4">
        <Link href="/" passHref>
          <Button variant="ghost" size="icon" className="flex flex-col h-auto gap-1 text-primary">
            <Home />
            <span className="text-xs">Home</span>
          </Button>
        </Link>
        <Link href="/trips" passHref>
          <Button variant="ghost" size="icon" className="flex flex-col h-auto gap-1 text-muted-foreground">
            <Briefcase />
            <span className="text-xs">Trips</span>
          </Button>
        </Link>
         <Link href="#" passHref>
          <Button variant="ghost" size="icon" className="flex flex-col h-auto gap-1 text-muted-foreground">
            <Heart />
            <span className="text-xs">Favorites</span>
          </Button>
        </Link>
         <Link href="#" passHref>
          <Button variant="ghost" size="icon" className="flex flex-col h-auto gap-1 text-muted-foreground">
            <User />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
