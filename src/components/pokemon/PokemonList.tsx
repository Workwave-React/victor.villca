import { usePokemonList } from '../../hooks/usePokemonList';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { PokemonCard } from './PokemonCard';
import { DEFAULT_POKEMON_LIMIT } from '../../constants/api.constants';

export function PokemonList() {
  const { pokemons, loading, error, refetch } = usePokemonList(DEFAULT_POKEMON_LIMIT);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (pokemons.length === 0) {
    return <ErrorMessage message="No pokemon found" />;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard 
          key={pokemon.name} 
          name={pokemon.name} 
          url={pokemon.url} 
        />
      ))}
    </div>
  );
}