import { createContext, useContext, type ReactNode } from 'react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoritesContextType {
  favorites: Array<{ name: string; url: string; addedAt: number }>;
  addFavorite: (name: string, url: string) => void;
  removeFavorite: (name: string) => void;
  toggleFavorite: (name: string, url: string) => void;
  isFavorite: (name: string) => boolean;
  clearAllFavorites: () => void;
  favoritesCount: number;
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const favoritesHook = useFavorites();

  return (
    <FavoritesContext.Provider value={favoritesHook}>
      {children}
    </FavoritesContext.Provider>
  );
};