import { Box, Grid } from '@mui/system';


import Container from '@mui/material/Container';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { PokemonCard } from './PokemonCard';
import { Button, Typography } from '@mui/material';
import { usePokemonPagination } from '../../hooks/usePokemonPagination';

interface PokemonListProps {
  limit?: number;
}
export function PokemonList({ limit }: PokemonListProps) {
    const { pokemons, loading, error, currentPage, totalPages, fetchPage } = usePokemonPagination(limit);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
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

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button 
          variant="outlined" 
          disabled={currentPage === 1} 
          onClick={() => fetchPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Typography>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button 
          variant="outlined" 
          disabled={currentPage === totalPages} 
          onClick={() => fetchPage(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}