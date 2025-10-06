import { Container, Typography, Box, TextField } from '@mui/material';
import { PokemonList } from '../components/pokemon/PokemonList';
import { useState } from 'react';
import { DEFAULT_POKEMON_LIMIT } from '../constants/api.constants';
import debounce from 'lodash.debounce';


export function HomePage() {
  const [inputValue, setInputValue] = useState<string>(DEFAULT_POKEMON_LIMIT.toString());
  const [pokemonLimit, setPokemonLimit] = useState<number>(DEFAULT_POKEMON_LIMIT);
    const [errorText, setErrorText] = useState<string | null>(null);
    // debounce here delays the exuction of the sepokemonlimit so  that we do 
    // do not make fetch each time the user types
  const updateLimit = debounce((value: number) => {
    setPokemonLimit(value);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) return;

    setInputValue(value);

    const numberValue = Number(value);
    if (numberValue < 1 || numberValue > 1000) {
      setErrorText('Please enter a number between 1 and 100.');
    } else {
      setErrorText(null);
      updateLimit(numberValue);
    }
  };
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
          <TextField
            label="Pokémon Limit"
            variant="outlined"
            margin="normal"
            value={inputValue}
            onChange={handleChange}
            helperText={errorText || 'Between 1 and 100'}
            error={Boolean(errorText)}
            
          />
        </Box>
      </Container>
      <PokemonList limit ={pokemonLimit} />
    </Box>
  );
}