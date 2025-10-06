import { API_BASE_URL } from '../constants/api.constants';
import type { Pokemon, PokemonDetail } from '../types/pokemon.types';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export async function fetchPokemonList(limit: number): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon list: ${response.statusText}`);
    }
    
    const data: PokemonListResponse = await response.json();
    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`API Error: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function fetchPokemonDetail(name: string): Promise<PokemonDetail> {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon "${name}" not found`);
      }
      throw new Error(`Failed to fetch pokemon: ${response.statusText}`);
    }
    
    const data: PokemonDetail = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}