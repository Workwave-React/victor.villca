import { TextField, InputAdornment, IconButton, Box, Chip, Typography } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search'; 
import ClearIcon from '@mui/icons-material/Clear'; 
import { useState, useEffect } from 'react';
import popularSearches from '../../db/popularSearches.json';
import { VoiceSearch } from './VoiceSearch';


interface SearchBarProps { 
  value: string; 
  onChange: (value: string) => void; 
  onClear: () => void; 
  placeholder?: string; 
} 
 
export function SearchBar({ value, onChange, onClear, placeholder = 'Search...' }: SearchBarProps) { 
  const [localValue, setLocalValue] = useState(value); 
  const [showSuggestions, setShowSuggestions] = useState(false); 
 
  useEffect(() => { 
    const timer = setTimeout(() => { 
      onChange(localValue); 
    }, 300); 
    return () => clearTimeout(timer); 
  }, [localValue, onChange]); 
 
  const handleClear = () => { 
    setLocalValue(''); 
    onClear(); 
    setShowSuggestions(false); 
  };
  const handleVoiceSearch = (transcript: string) => {
    setLocalValue(transcript.slice(0, -1));
    onChange(transcript);
    setShowSuggestions(false);
  };
 
  return ( 
    <Box sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}> 
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder={placeholder} 
        value={localValue} 
        onChange={(e) => setLocalValue(e.target.value)} 
        onFocus={() => !localValue && setShowSuggestions(true)} 
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} 
        InputProps={{ 
          startAdornment: ( 
            <InputAdornment position="start"> 
              <SearchIcon color="action" /> 
            </InputAdornment> 
          ), 
          endAdornment: ( 
            <InputAdornment position="end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VoiceSearch onVoiceSearch={handleVoiceSearch} />
                <IconButton  
                  onClick={handleClear} 
                  edge="end" 
                  size="small" 
                  aria-label="clear search" 
                > 
                  <ClearIcon /> 
                </IconButton>
              </Box>
            </InputAdornment>
          ), 
        }} 
      /> 
 
      {showSuggestions && !localValue && ( 
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}> 
          <Typography variant="caption" color="text.secondary" sx={{ width: '100%', mb: 1 }}> 
            Popular searches: 
          </Typography> 
          {popularSearches.map((term) => ( 
            <Chip 
              key={term} 
              label={term} 
              onClick={() => { 
                setLocalValue(term); 
                setShowSuggestions(false); 
              }} 
              size="small" 
              sx={{  
                cursor: 'pointer', 
                '&:hover': { 
                  backgroundColor: 'primary.light', 
                  color: 'white', 
                }, 
              }} 
            /> 
          ))} 
        </Box> 
      )} 
    </Box> 
  ); 
} 
