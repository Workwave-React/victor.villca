import { Box, Grid } from '@mui/system';


import Container from '@mui/material/Container';

import { usePokemonList } from '../../hooks/usePokemonList';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { PokemonCard } from './PokemonCard';
import { DEFAULT_POKEMON_LIMIT } from '../../constants/api.constants';
import { useState } from 'react';
import { Button } from '@mui/material';

interface PokemonListProps {
  limit?: number;
}
export function PokemonList({ limit }: PokemonListProps) {
    const [visibleCount, setVisibleCount] = useState(limit);
  const { pokemons, loading, error, refetch } = usePokemonList(limit || DEFAULT_POKEMON_LIMIT);

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
    <Container maxWidth="lg" sx={{ py: 6, minHeight: '70vh' }}>
      <Grid container spacing={3}>
        {pokemons.map((pokemon) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pokemon.name}>
            <PokemonCard name={pokemon.name} url={pokemon.url} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}