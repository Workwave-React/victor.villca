import { useState } from "react";
import { usePokemonList } from "../../v1/hooks/usePokemonList";
import { DEFAULT_POKEMON_LIMIT } from "../../v1/constants/api.constants";
import { LoadingSpinner } from "../../v1/components/ui/LoadingSpinner";
import { ErrorMessage } from "../../v1/components/ui/ErrorMessage";
import Container from '@mui/material/Container';
import { Box, Grid } from '@mui/system';
import { PokemonCard } from "../../v1/components/pokemon/PokemonCard";

interface PokemonListProps {
  limit?: number;
  searchTerm?: string;
}

export function PokemonList({ limit, searchTerm = "" }: PokemonListProps) {
  const [visibleCount, setVisibleCount] = useState(limit);
  const { pokemons, loading, error, refetch } = usePokemonList(limit || DEFAULT_POKEMON_LIMIT);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (pokemons.length === 0) return <ErrorMessage message="No Pokémon found" />;

  // Filter list by search term
  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <h1>Looking the search {searchTerm}</h1>
        <Container maxWidth="lg" sx={{ py: 6, minHeight: "70vh" }}>
      <Grid container spacing={3}>
        {filteredPokemons.map((pokemon) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={pokemon.name}>
            <PokemonCard name={pokemon.name} url={pokemon.url} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}
