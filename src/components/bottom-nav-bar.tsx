"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Heart, User } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function BottomNavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/trips', icon: Briefcase, label: 'Trips' },
    { href: '/favorites', icon: Heart, label: 'Favorites' },
    { href: '#', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-around px-4">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} passHref>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'flex h-auto flex-col gap-1',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
