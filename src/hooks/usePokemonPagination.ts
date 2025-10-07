import { useEffect, useState } from 'react';
import { API_BASE_URL, DEFAULT_POKEMON_LIMIT } from '../constants/api.constants';
import type { Pokemon } from '../types/pokemon.types';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export function usePokemonPagination(limit: number = DEFAULT_POKEMON_LIMIT) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * limit;
      const response = await fetch(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
      if (!response.ok) throw new Error(`Failed to fetch Pokémon: ${response.statusText}`);

      const data: PokemonListResponse = await response.json();

      setPokemons(data.results);
      setTotalCount(data.count);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    fetchPage(1);
  }, [limit]);

  return {
    pokemons,
    loading,
    error,
    currentPage,
    totalPages,
    fetchPage,
  };
}
