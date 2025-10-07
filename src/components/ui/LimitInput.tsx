import { useState } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import debounce from 'lodash.debounce';

interface LimitInputProps {
  defaultValue: number;
  onLimitChange: (limit: number) => void;
}

export function LimitInput({ defaultValue, onLimitChange }: LimitInputProps) {
  const [inputValue, setInputValue] = useState<string>(defaultValue.toString());
  const [errorText, setErrorText] = useState<string | null>(null);

  const updateLimit = debounce((value: number) => {
    onLimitChange(value);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!/^\d*$/.test(value)) return;

    setInputValue(value);

    const numberValue = Number(value);
    if (numberValue < 1 || numberValue > 1000) {
      setErrorText('Please enter a number between 1 and 1000.');
    } else {
      setErrorText(null);
      updateLimit(numberValue);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
        Enter how many Pokémon you want to see
      </Typography>
      <TextField
        label="Pokémon Limit"
        variant="outlined"
        margin="normal"
        value={inputValue}
        onChange={handleChange}
        helperText={errorText || 'Between 1 and 1000'}
        error={Boolean(errorText)}
      />
    </Box>
  );
}
