import { useEffect, useState } from 'react';
import { API_BASE_URL, DEFAULT_POKEMON_LIMIT } from '../constants/api.constants';
import { GENERATIONS } from '../constants/filter.constants';
import type { Pokemon } from '../types/pokemon.types';
import type { PokemonFilters } from '../constants/filter.types';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

interface UsePokemonPaginationProps {
  limit?: number;
  searchQuery?: string;
  filters?: PokemonFilters;
}
interface PokemonWithId extends Pokemon {
  id: number;
}


export function usePokemonPagination({
  limit = DEFAULT_POKEMON_LIMIT,
  searchQuery = '',
  filters,
}: UsePokemonPaginationProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonWithId[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [allPokemon, setAllPokemon] = useState<PokemonWithId[]>([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=1302`);
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        const data: PokemonListResponse = await response.json();
        const pokemonWithIds: PokemonWithId[] = data.results.map((pokemon) => {
          const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0');
          console.log('Fetched Pokémon:', pokemon.name, 'ID:', id);
          console.log('Fetched Pokémon URL:', pokemon.url);
          return { ...pokemon, id };
        });
        setAllPokemon(pokemonWithIds); 
      } catch (err) {
        console.error('Failed to cache Pokémon list:', err);
      }
    };
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() || (filters && filters.generations.length > 0)) {
      setIsSearching(true);
      let filtered = [...allPokemon];

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query)
        );
      }

      if (filters && filters.generations.length > 0) {
        filtered = filtered.filter((pokemon) => {
          return filters.generations.some((genValue) => {
            const genData = GENERATIONS.find((g) => g.value === genValue);
            if (!genData) return false;
            const [minId, maxId] = genData.range;
            return pokemon.id >= minId && pokemon.id <= maxId;
          });
        });
      }

      if (filters) {
        switch (filters.sortBy) {
          case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }     
      }

      setFilteredPokemons(filtered);
      setCurrentPage(1);
      setIsSearching(false);
    } else {
      setFilteredPokemons([]);
    }
  }, [searchQuery, allPokemon, filters]);

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

  const isFilterActive =
    searchQuery.trim() !== '' ||
    (filters !== undefined && filters.generations.length > 0);

  const displayPokemons = isFilterActive ? filteredPokemons : pokemons;
  const displayTotalCount = isFilterActive ? filteredPokemons.length : totalCount;

  const totalPages = isFilterActive
    ? Math.ceil(filteredPokemons.length / limit)
    : Math.ceil(totalCount / limit);

  const paginatedPokemons = isFilterActive
    ? filteredPokemons.slice((currentPage - 1) * limit, currentPage * limit)
    : displayPokemons;

  useEffect(() => {
    if (!isFilterActive) {
      fetchPage(1);
    }
  }, [limit, isFilterActive]);

  const handlePageChange = (page: number) => {
    if (isFilterActive) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      fetchPage(page);
    }
  };

  return {
    pokemons: paginatedPokemons,
    loading: loading || isSearching,
    error,
    currentPage,
    totalPages,
    totalCount: displayTotalCount,
    fetchPage: handlePageChange,
    isSearchMode: !!searchQuery.trim(),
    isFilterMode: isFilterActive,
  };
}
