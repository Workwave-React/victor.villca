import { Box, Grid } from '@mui/system';


import Container from '@mui/material/Container';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { PokemonCard } from './PokemonCard';
import { Button, Chip, Typography } from '@mui/material';
import { usePokemonPagination } from '../../hooks/usePokemonPagination';

interface PokemonListProps {
  limit?: number;
  searchQuery?: string;
}
export function PokemonList({ limit, searchQuery='' }: PokemonListProps) {
    const {  
    pokemons,  
    loading,  
    error,  
    currentPage,  
    totalPages,  
    totalCount, 
    fetchPage, 
    isSearchMode  
  } = usePokemonPagination({ limit, searchQuery }); 

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
          {isSearchMode ? 'No Pokémon found' : 'No Pokémon found'} 
        </Typography> 
        <Typography variant="body2" color="text.secondary"> 
          {isSearchMode  
            ? `No results for "${searchQuery}". Try searching by name or ID.` 
            : 'Unable to load Pokémon data.'} 
        </Typography> 
      </Container> 
    ); 
  } 
  return (
    <Container maxWidth="lg" sx={{ py: 6, minHeight: '70vh' }}>
      {isSearchMode && ( 
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