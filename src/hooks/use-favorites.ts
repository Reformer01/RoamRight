'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Destination } from '@/components/destination-card';

const FAVORITES_KEY = 'roamright-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Destination[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error reading favorites from localStorage', error);
      setFavorites([]);
    }
  }, []);

  const saveFavorites = (newFavorites: Destination[]) => {
    try {
      const uniqueFavorites = Array.from(new Map(newFavorites.map(item => [item.slug, item])).values());
      setFavorites(uniqueFavorites);
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(uniqueFavorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage', error);
    }
  };
  
  const isFavorite = useCallback((slug: string) => {
    return favorites.some((fav) => fav.slug === slug);
  }, [favorites]);

  const toggleFavorite = useCallback((destination: Destination) => {
    let newFavorites;
    if (isFavorite(destination.slug)) {
      newFavorites = favorites.filter((fav) => fav.slug !== destination.slug);
    } else {
      newFavorites = [...favorites, destination];
    }
    saveFavorites(newFavorites);
  }, [favorites, isFavorite]);

  return { favorites, toggleFavorite, isFavorite };
}
