import { IconButton, Badge, Drawer, Box, Typography, List, ListItem, ListItemText, ListItemButton, Button, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useFavoritesContext } from '../../contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';

export function FavoritesBadge() {
  const [open, setOpen] = useState(false);
  const { favorites, favoritesCount, removeFavorite, clearAllFavorites } = useFavoritesContext();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePokemonClick = (name: string) => {
    navigate(`/pokemon/${name}`);
    handleClose();
  };

  return (
    <>
      <IconButton 
        color="inherit" 
        onClick={handleOpen}
        sx={{ ml: 2 }}
      >
        <Badge badgeContent={favoritesCount} color="error">
          <FavoriteIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={open} onClose={handleClose}>
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              ❤️ Favorites
            </Typography>
            {favoritesCount > 0 && (
              <Button
                size="small"
                color="error"
                onClick={clearAllFavorites}
                startIcon={<DeleteIcon />}
              >
                Clear All
              </Button>
            )}
          </Box>

          <Divider sx={{ mb: 2 }} />

          {favoritesCount === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No favorites yet!
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Click the heart icon on any Pokémon card to add it here.
              </Typography>
            </Box>
          ) : (
            <List>
              {favorites.map((pokemon) => {
                const pokemonId = pokemon.url.split('/').filter(Boolean).pop();
                const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

                return (
                  <ListItem
                    key={pokemon.name}
                    disablePadding
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFavorite(pokemon.name);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemButton onClick={() => handlePokemonClick(pokemon.name)}>
                      <Box
                        component="img"
                        src={imageUrl}
                        alt={pokemon.name}
                        sx={{ width: 40, height: 40, mr: 2 }}
                      />
                      <ListItemText
                        primary={pokemon.name}
                        primaryTypographyProps={{
                          sx: { textTransform: 'capitalize', fontWeight: 500 },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}