import { useState, useEffect, useCallback } from 'react';

interface FavoritePokemon {
  name: string;
  url: string;
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pokemon-favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('pokemon-favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isLoading]);

  const addFavorite = useCallback((name: string, url: string) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.name === name)) {
        return prev;
      }
      return [{ name, url, addedAt: Date.now() }, ...prev];
    });
  }, []);

  const removeFavorite = useCallback((name: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.name !== name));
  }, []);

  const toggleFavorite = useCallback(
    (name: string, url: string) => {
      const isFavorite = favorites.some((fav) => fav.name === name);
      if (isFavorite) {
        removeFavorite(name);
      } else {
        addFavorite(name, url);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const isFavorite = useCallback(
    (name: string) => {
      return favorites.some((fav) => fav.name === name);
    },
    [favorites]
  );

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    favoritesCount: favorites.length,
    isLoading,
  };
}