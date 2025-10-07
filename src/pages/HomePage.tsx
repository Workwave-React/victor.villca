import { Container, Typography, Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { PokemonList } from '../components/pokemon/PokemonList';
import { useState } from 'react';
import { DEFAULT_POKEMON_LIMIT } from '../constants/api.constants';
import { LimitInput } from '../components/ui/LimitInput';

export function HomePage() {
  const [pokemonLimit, setPokemonLimit] = useState<number>(DEFAULT_POKEMON_LIMIT);
  const [showDevOptions, setShowDevOptions] = useState<boolean>(false);
  const handleDevOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setShowDevOptions(checked);
    if (!checked) {
      setPokemonLimit(DEFAULT_POKEMON_LIMIT);
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
          <FormControlLabel
            control={
              <Checkbox
                checked={showDevOptions}
                onChange={handleDevOptionsChange}
              />
            }
            label="Developer Options"
            sx={{ mt: 2 }}
          />

          {showDevOptions && (
            <LimitInput
              defaultValue={pokemonLimit}
              onLimitChange={setPokemonLimit}
            />
          )}
        </Box>
      </Container>
      <PokemonList limit={pokemonLimit} />
    </Box>
  );
}