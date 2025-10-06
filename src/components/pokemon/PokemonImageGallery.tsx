import { Box, Paper, Typography } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import type { PokemonSprites } from '../../types/pokemon.types';

interface PokemonImageGalleryProps {
  sprites: PokemonSprites;
  pokemonName: string;
  onImageClick: (imageUrl: string, title: string) => void;
}

export function PokemonImageGallery({
  sprites,
  pokemonName,
  onImageClick,
}: PokemonImageGalleryProps) {
  const capitalizedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  const spriteList = [
    { url: sprites.front_default, label: 'Front Default' },
    { url: sprites.back_default, label: 'Back Default' },
    { url: sprites.front_shiny, label: 'Front Shiny' },
    { url: sprites.back_shiny, label: 'Back Shiny' },
  ].filter(sprite => sprite.url);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Sprites
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 2,
        }}
      >
        {spriteList.map((sprite) => (
          <Paper
            key={sprite.label}
            elevation={2}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
              '&:hover .zoom-overlay': {
                opacity: 1,
              },
            }}
            onClick={() => onImageClick(sprite.url!, `${capitalizedName} - ${sprite.label}`)}
          >
            <Box
              sx={{
                p: 2,
                backgroundColor: 'grey.100',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 100,
              }}
            >
              <Box
                component="img"
                src={sprite.url}
                alt={sprite.label}
                sx={{
                  width: '100%',
                  height: 100,
                  objectFit: 'contain',
                }}
              />
            </Box>

            <Box
              className="zoom-overlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
                transition: 'opacity 0.3s',
              }}
            >
              <ZoomInIcon sx={{ color: 'white', fontSize: 40 }} />
            </Box>

            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                p: 1,
                backgroundColor: 'background.paper',
                fontWeight: 500,
              }}
            >
              {sprite.label}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}