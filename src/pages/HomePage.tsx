import { Container, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { Grid } from '@mui/system';
import { PokemonList } from '../components/pokemon/PokemonList';
import { useState } from 'react';
import { DEFAULT_POKEMON_LIMIT } from '../constants/api.constants';
import { LimitInput } from '../components/ui/LimitInput';
import { SearchBar } from '../components/ui/SearchBar';
import { FilterPanel } from '../components/pokemon/FilterPanel';
import type { PokemonFilters } from '../constants/filter.types';

export function HomePage() {
  const [pokemonLimit, setPokemonLimit] = useState<number>(DEFAULT_POKEMON_LIMIT);
  const [showDevOptions, setShowDevOptions] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<PokemonFilters>({
    generations: [],
    sortBy: 'name-asc',
  });

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

  const handleFilterChange = (newFilters: PokemonFilters) => {
    setFilters(newFilters);
  };

  const activeFilterCount = filters.generations.length;

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

            Search and explore your favorite Pokémon from all generations.
            <Box
              component="span"
              sx={{
                display: 'block',
                mt: 1,
                fontSize: '0.875rem',
                fontStyle: 'italic',
              }}
            >
            Click the microphone icon to search by voice!
            </Box>
          </Typography>
          
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            placeholder="Search by name"
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

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              activeFilterCount={activeFilterCount}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <PokemonList
              limit={pokemonLimit}
              searchQuery={searchQuery}
              filters={filters}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
