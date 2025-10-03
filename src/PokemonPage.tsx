import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function PokemonPage() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPokemon(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return <div>No data found.</div>;

  return (
    <div>
      <h2>{pokemon.name}</h2>
      {pokemon.sprites?.front_default && (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      )}
    </div>
  );
}
