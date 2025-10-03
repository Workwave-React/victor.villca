import { Link } from 'react-router-dom';

interface PokemonCardProps {
  name: string;
  url: string;
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const pokemonId = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Link to={`/pokemon/${name}`} className="pokemon-card-link">
      <div className="pokemon-card">
        <img 
          src={imageUrl} 
          alt={name}
          className="pokemon-card-image"
          loading="lazy"
        />
        <h3 className="pokemon-card-name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
      </div>
    </Link>
  );
}