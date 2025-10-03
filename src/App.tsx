
import { useEffect, useState } from 'react';
import './App.css';
import type { GetPokemonDto } from './types/Types';
import { Link, Routes, Route } from 'react-router-dom';
import PokemonPage from './PokemonPage';

function PokedexList() {
  const [pokemons, setPokemons] = useState<GetPokemonDto[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=15')
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));
  }, []);

  return (
    <>
      <h1>Pokedex</h1>
      {pokemons.map((pokemon) => (
        <Link to={'/pokemon/' + pokemon.name} key={pokemon.name}>
          <div className='poke-div'>{pokemon.name}</div>
        </Link>
      ))}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokedexList />} />
      <Route path="/pokemon/:name" element={<PokemonPage />} />
    </Routes>
  );
}

export default App;
