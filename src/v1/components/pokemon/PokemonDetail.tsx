import { 
  Box, 
  Container, 
  Typography, 
  Chip, 
  Paper,
  LinearProgress,
  Button
} from '@mui/material';
import { Grid } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { PokemonDetail as PokemonDetailType } from '../../types/pokemon.types';
import { getTypeColor } from '../../utils/pokemonTypeColors';
import { useModal } from '../../hooks/useModal';
import { PokemonImageGallery } from './PokemonImageGallery';
import { ImageModal } from '../ui/ImageModal';

interface PokemonDetailProps {
  pokemon: PokemonDetailType;
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const navigate = useNavigate();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const handleImageClick = (imageUrl: string, title: string) => {
    openModal({
      imageUrl,
      title,
    });
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Back to Pokédex
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4, borderBottom: 2, borderColor: 'primary.main', pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
              {capitalizedName}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              #{pokemon.id}
            </Typography>
          </Box>
        </Box>
        <PokemonImageGallery
          sprites={pokemon.sprites}
          pokemonName={pokemon.name}
          onImageClick={handleImageClick}
        />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Physical Attributes
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Height
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {pokemon.height / 10} m
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {pokemon.weight / 10} kg
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Types
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {pokemon.types.map((typeInfo) => (
              <Chip
                key={typeInfo.type.name}
                label={typeInfo.type.name}
                sx={{
                  backgroundColor: getTypeColor(typeInfo.type.name),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'capitalize',
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Abilities
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {pokemon.abilities.map((abilityInfo) => (
              <Paper 
                key={abilityInfo.ability.name} 
                elevation={1}
                sx={{ p: 2 }}
              >
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {abilityInfo.ability.name.replace('-', ' ')}
                  {abilityInfo.is_hidden && (
                    <Chip 
                      label="Hidden" 
                      size="small" 
                      sx={{ ml: 1 }}
                      color="secondary"
                    />
                  )}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Base Stats
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {pokemon.stats.map((statInfo) => (
              <Box key={statInfo.stat.name}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textTransform: 'capitalize',
                      fontWeight: 600 
                    }}
                  >
                    {statInfo.stat.name.replace('-', ' ')}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ fontWeight: 700 }}
                    color="primary"
                  >
                    {statInfo.base_stat}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(statInfo.base_stat / 255) * 100}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                    }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    <ImageModal
        open={isOpen}
        onClose={closeModal}
        data={modalData}
      />
    </Container>
  );
}