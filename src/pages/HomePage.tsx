import { Container, Typography, Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { PokemonList } from '../components/pokemon/PokemonList';
import { useState } from 'react';
import { DEFAULT_POKEMON_LIMIT } from '../constants/api.constants';
import { LimitInput } from '../components/ui/LimitInput';
import { SearchBar } from '../components/ui/SearchBar';

export function HomePage() {
  const [pokemonLimit, setPokemonLimit] = useState<number>(DEFAULT_POKEMON_LIMIT);
  const [showDevOptions, setShowDevOptions] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleDevOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setShowDevOptions(checked);
    if (!checked) {
      setPokemonLimit(DEFAULT_POKEMON_LIMIT);
    }
  };
  const handleSearchChange = (query: string) => { 
    setSearchQuery(query); 
  }; 
 
  const handleSearchClear = () => { 
    setSearchQuery(''); 
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
          <Typography  
            variant="body1"  
            color="text.secondary"  
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }} 
          > 
            Search and explore your favorite Pokémon from all generations 
          </Typography>
          <SearchBar  
            value={searchQuery} 
            onChange={handleSearchChange} 
            onClear={handleSearchClear} 
            placeholder="Search by name or ID (e.g., pikachu, 25)..." 
          />

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
      <PokemonList limit={pokemonLimit} searchQuery={searchQuery}/>
    </Box>
  );
}