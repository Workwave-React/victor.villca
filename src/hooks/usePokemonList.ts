import { useState, useEffect } from 'react';
import { fetchPokemonList } from '../services/pokemonApi';
import type { Pokemon } from '../types/pokemon.types';

interface UsePokemonListResult {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePokemonList(limit: number = 15): UsePokemonListResult {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonList(limit);
      setPokemons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pokemon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, [limit]);

  return { 
    pokemons, 
    loading, 
    error,
    refetch: loadPokemons 
  };
}