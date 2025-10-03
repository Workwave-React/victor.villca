import { Container, Typography, Box, TextField } from '@mui/material';
import { PokemonList } from '../components/pokemon/PokemonList';

export function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Pokédex
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Enter how many Pokémon you want to see
          </Typography>
          <TextField id="outlined-basic" label="Pokemon Limit" variant="outlined" margin='normal'/>
        </Box>
      </Container>
      <PokemonList />
    </Box>
  );
}