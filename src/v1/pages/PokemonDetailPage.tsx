import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { PokemonDetail } from '../components/pokemon/PokemonDetail';

export function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const { pokemon, loading, error, refetch } = usePokemon(name);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <ErrorMessage message={error} onRetry={refetch} />
      </Box>
    );
  }

  if (!pokemon) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <ErrorMessage message="No pokemon data found" />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <PokemonDetail pokemon={pokemon} />
    </Box>
  );
}