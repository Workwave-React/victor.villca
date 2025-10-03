import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const navigate = useNavigate();
  
  const pokemonId = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  const handleClick = () => {
    navigate(`/pokemon/${name}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        }
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{
            height: 180,
            objectFit: 'contain',
            padding: 2,
            backgroundColor: '#f5f5f5'
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}