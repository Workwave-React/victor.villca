import { Box, Grid } from '@mui/system';
import Container from '@mui/material/Container';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { PokemonCard } from './PokemonCard';
import { Button, Chip, Typography } from '@mui/material';
import { usePokemonPagination } from '../../hooks/usePokemonPagination';
import type { PokemonFilters } from '../../constants/filter.types';

interface PokemonListProps {
  limit?: number;
  searchQuery?: string;
  filters?: PokemonFilters;
}

export function PokemonList({ limit, searchQuery = '', filters }: PokemonListProps) {
  const {
    pokemons,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    fetchPage,
    isFilterMode,
  } = usePokemonPagination({ limit, searchQuery, filters });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (pokemons.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          {isFilterMode ? '🔍 No Pokémon found' : 'No Pokémon found'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isFilterMode
            ? 'Try adjusting your filters or search query.'
            : 'Unable to load Pokémon data.'}
        </Typography>
      </Container>
    );
  }

  return (
    <Box>
      {isFilterMode && (
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
          <Chip
            label={`${totalCount} result${totalCount !== 1 ? 's' : ''} found`}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}

      <Grid container spacing={3}>
        {pokemons.map((pokemon) => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={pokemon.name}>
            <PokemonCard name={pokemon.name} url={pokemon.url} />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={currentPage === 1}
            onClick={() => fetchPage(currentPage - 1)}
            sx={{
              color: 'white',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
              },
            }}
          >
            Previous
          </Button>

          <Typography
            variant="body2"
            sx={{
              minWidth: 120,
              textAlign: 'center',
              color: 'white',
              fontWeight: 600,
            }}
          >
            Page {currentPage} of {totalPages}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            disabled={currentPage === totalPages}
            onClick={() => fetchPage(currentPage + 1)}
            sx={{
              color: 'white',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
              },
            }}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
