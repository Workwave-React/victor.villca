import { useParams } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { PokemonDetail } from '../components/pokemon/PokemonDetail';

export function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const { pokemon, loading, error, refetch } = usePokemon(name);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="page">
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="page">
        <ErrorMessage message="No pokemon data found" />
      </div>
    );
  }

  return (
    <div className="page detail-page">
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
}
