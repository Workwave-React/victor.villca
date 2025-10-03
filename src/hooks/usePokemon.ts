import { useState, useEffect } from 'react';
import { fetchPokemonDetail } from '../services/pokemonApi';
import type { PokemonDetail } from '../types/pokemon.types';

interface UsePokemonResult {
  pokemon: PokemonDetail | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePokemon(name: string | undefined): UsePokemonResult {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPokemon = async () => {
    if (!name) {
      setError('No pokemon name provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonDetail(name);
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pokemon');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemon();
  }, [name]);

  return { 
    pokemon, 
    loading, 
    error,
    refetch: loadPokemon 
  };
}
