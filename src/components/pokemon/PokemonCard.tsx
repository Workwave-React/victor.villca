import { Card, CardContent, CardMedia, Typography, CardActionArea, Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useModal } from '../../hooks/useModal';
import { ImageModal } from '../ui/ImageModal';
import { useFavoritesContext } from '../../contexts/FavoritesContext';

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const navigate = useNavigate();
  const pokemonId = url.split('/').filter(Boolean).pop();
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  const favorite = isFavorite(name);

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  const handleButtonClick = () => {
    openModal({
      imageUrl,
      title: name.charAt(0).toUpperCase() + name.slice(1),
    });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(name, url);
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          position: 'relative',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 6,
          }
        }}
      >
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'background.paper',
            },
          }}
        >
          {favorite ? (
            <FavoriteIcon sx={{ color: 'error.main' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        <CardActionArea sx={{ flexGrow: 1 }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={name}
            sx={{
              height: 180,
              objectFit: 'contain',
              padding: 2,
              backgroundColor: 'grey.100'
            }}
            loading="lazy"
          />
          <CardContent>
            <Typography 
              variant="h6" 
              component="h3" 
              align="center"
              sx={{ 
                textTransform: 'capitalize',
                fontWeight: 600 
              }}
            >
              {name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <Button variant="contained" onClick={handleButtonClick}>
                Extend
              </Button>
              <Button variant="contained" onClick={handleClick}>
                See more
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <ImageModal
        open={isOpen}
        onClose={closeModal}
        data={modalData}
      />
    </>
  );
}