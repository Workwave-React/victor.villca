import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { GENERATIONS, SORT_OPTIONS } from '../../constants/filter.constants';
import type { PokemonFilters } from '../../constants/filter.types';

interface FilterPanelProps {
  filters: PokemonFilters;
  onFilterChange: (filters: PokemonFilters) => void;
  activeFilterCount: number;
}

export function FilterPanel({ filters, onFilterChange, activeFilterCount }: FilterPanelProps) {
  const toggleGeneration = (gen: number) => {
    const newGens = filters.generations.includes(gen)
      ? filters.generations.filter((g) => g !== gen)
      : [...filters.generations, gen];
    onFilterChange({ ...filters, generations: newGens });
  };

  const handleSortChange = (value: string) => {
    onFilterChange({ ...filters, sortBy: value });
  };

  const clearAllFilters = () => {
    onFilterChange({
      generations: [],
      sortBy: 'name-asc',
    });
  };

  const FilterContent = () => (
    <Box sx={{ p: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon /> Filters
          {activeFilterCount > 0 && (
            <Badge badgeContent={activeFilterCount} color="primary" />
          )}
        </Typography>
        {activeFilterCount > 0 && (
          <Button
            size="small"
            startIcon={<ClearIcon />}
            onClick={clearAllFilters}
            color="error"
            variant="outlined"
          >
            Clear
          </Button>
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy}
            label="Sort By"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            Generations
            {filters.generations.length > 0 && (
              <Chip
                label={filters.generations.length}
                size="small"
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {GENERATIONS.map((gen) => (
              <Chip
                key={gen.value}
                label={`${gen.label} (#${gen.range[0]}-${gen.range[1]})`}
                onClick={() => toggleGeneration(gen.value)}
                variant={filters.generations.includes(gen.value) ? 'filled' : 'outlined'}
                color={filters.generations.includes(gen.value) ? 'primary' : 'default'}
                sx={{
                  justifyContent: 'flex-start',
                  transition: 'all 0.2s ease',
                  fontWeight: filters.generations.includes(gen.value) ? 600 : 400,
                  '&:hover': {
                    transform: 'translateX(4px)',
                    backgroundColor: filters.generations.includes(gen.value)
                      ? 'primary.dark'
                      : 'action.hover',
                  },
                }}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
          Quick Filters:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label="🎮 Gen I (Original)"
            size="small"
            onClick={() => onFilterChange({ ...filters, generations: [1] })}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'primary.light', color: 'white' } }}
          />
          <Chip
            label="⚡ Gen II (Johto)"
            size="small"
            onClick={() => onFilterChange({ ...filters, generations: [2] })}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'primary.light', color: 'white' } }}
          />
          <Chip
            label="🌊 Gen III (Hoenn)"
            size="small"
            onClick={() => onFilterChange({ ...filters, generations: [3] })}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'primary.light', color: 'white' } }}
          />
          <Chip
            label="💎 Gen IV (Sinnoh)"
            size="small"
            onClick={() => onFilterChange({ ...filters, generations: [4] })}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'primary.light', color: 'white' } }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        position: 'sticky',
        top: 16,
        maxHeight: 'calc(100vh - 32px)',
        overflowY: 'auto',
      }}
    >
      <FilterContent />
    </Paper>
  );
}
