import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchPokemonList, fetchPokemonDetail } from '../pokemonApi';

global.fetch = vi.fn();

describe('pokemonApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('fetchPokemonList', () => {
    it('should fetch pokemon list successfully', async () => {
      const mockResponse = {
        count: 1302,
        next: null,
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchPokemonList(2);

      expect(result).toEqual(mockResponse.results);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=2'
      );
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(fetchPokemonList(2)).rejects.toThrow(
        'API Error: Failed to fetch pokemon list: Not Found'
      );
    });
  });

  describe('fetchPokemonDetail', () => {
    it('should fetch pokemon detail successfully', async () => {
      const mockPokemon = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        sprites: {
          front_default: 'https://example.com/bulbasaur.png',
        },
        types: [],
        abilities: [],
        stats: [],
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      });

      const result = await fetchPokemonDetail('bulbasaur');

      expect(result).toEqual(mockPokemon);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur'
      );
    });

    it('should throw error for non-existent pokemon', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(fetchPokemonDetail('fakemon')).rejects.toThrow(
        'Pokemon "fakemon" not found'
      );
    });
  });
});