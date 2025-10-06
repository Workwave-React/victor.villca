import { Container, Typography, Box, TextField } from "@mui/material";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { DEFAULT_POKEMON_LIMIT } from "../v1/constants/api.constants";
import { VoiceSearch } from "./components/VoiceSearch";
import { PokemonList } from "./components/PokemonList";

export default function HomePageV2() {
  const [inputValue, setInputValue] = useState<string>(DEFAULT_POKEMON_LIMIT.toString());
  const [pokemonLimit, setPokemonLimit] = useState<number>(DEFAULT_POKEMON_LIMIT);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // debounced limit update
  const updateLimit = useCallback(
    debounce((value: number) => {
      setPokemonLimit(value);
    }, 500),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return;

    setInputValue(value);

    const numberValue = Number(value);
    if (numberValue < 1 || numberValue > 1000) {
      setErrorText("Please enter a number between 1 and 1000.");
    } else {
      setErrorText(null);
      updateLimit(numberValue);
    }
  };

  const handleVoiceSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Pokédex v2 🎙️
          </Typography>

          <VoiceSearch onVoiceSearch={handleVoiceSearch} />

          <Typography variant="h6" color="text.secondary">
            Enter how many Pokémon you want to see
          </Typography>
          <TextField
            label="Pokémon Limit"
            variant="outlined"
            margin="normal"
            value={inputValue}
            onChange={handleChange}
            helperText={errorText || "Between 1 and 1000"}
            error={Boolean(errorText)}
          />
        </Box>
      </Container>

      {/* Pass the voice search term down to filter */}
      <PokemonList limit={pokemonLimit} searchTerm={searchTerm} />
    </Box>
  );
}
