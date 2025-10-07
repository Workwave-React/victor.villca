import { useEffect, useState } from 'react'; 
import { API_BASE_URL, DEFAULT_POKEMON_LIMIT } from '../constants/api.constants'; 
import type { Pokemon } from '../types/pokemon.types'; 
 
interface PokemonListResponse { 
  count: number; 
  next: string | null; 
  previous: string | null; 
  results: Pokemon[]; 
} 
 
interface UsePokemonPaginationProps { 
  limit?: number; 
  searchQuery?: string; 
} 
 
export function usePokemonPagination({ limit = DEFAULT_POKEMON_LIMIT, searchQuery = '' }: UsePokemonPaginationProps) { 
  const [pokemons, setPokemons] = useState<Pokemon[]>([]); 
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalCount, setTotalCount] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 
  const [isSearching, setIsSearching] = useState(false); 
 
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]); 
 
  useEffect(() => { 
    const fetchAllPokemon = async () => { 
      try { 
        const response = await fetch(`${API_BASE_URL}/pokemon?limit=10000`); 
        if (!response.ok) throw new Error('Failed to fetch Pokémon list'); 
        const data: PokemonListResponse = await response.json(); 
        setAllPokemon(data.results); 
      } catch (err) { 
        console.error('Failed to cache Pokémon list:', err); 
      } 
    }; 
 
    fetchAllPokemon(); 
  }, []); 
 
  useEffect(() => { 
    if (searchQuery.trim()) { 
      setIsSearching(true); 
      const query = searchQuery.toLowerCase().trim(); 
       
      const filtered = allPokemon.filter((pokemon) => { 
        const pokemonId = pokemon.url.split('/').filter(Boolean).pop(); 
        return pokemon.name.toLowerCase().includes(query) || pokemonId === query; 
      }); 
 
      setFilteredPokemons(filtered); 
      setCurrentPage(1); 
      setIsSearching(false); 
    } else { 
      setFilteredPokemons([]); 
    } 
  }, [searchQuery, allPokemon]); 
 
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
 
  const displayPokemons = searchQuery.trim() ? filteredPokemons : pokemons; 
  const displayTotalCount = searchQuery.trim() ? filteredPokemons.length : totalCount; 
   
  const totalPages = searchQuery.trim()  
    ? Math.ceil(filteredPokemons.length / limit) 
    : Math.ceil(totalCount / limit); 
 
  const paginatedFilteredPokemons = searchQuery.trim() 
    ? filteredPokemons.slice((currentPage - 1) * limit, currentPage * limit) 
    : displayPokemons; 
 
  useEffect(() => { 
    if (!searchQuery.trim()) { 
      fetchPage(1); 
    } 
  }, [limit, searchQuery]); 
 
  return { 
    pokemons: paginatedFilteredPokemons, 
    loading: loading || isSearching, 
    error, 
    currentPage, 
    totalPages, 
    totalCount: displayTotalCount, 
    fetchPage, 
    isSearchMode: !!searchQuery.trim(), 
  }; 
}