import { PokemonList } from '../components/pokemon/PokemonList';

export function HomePage() {
  return (
    <div className="page home-page">
      <header className="page-header">
        <h1 className="page-title">Pokédex</h1>
        <p className="page-subtitle">Discover amazing Pokémon</p>
      </header>
      <main>
        <PokemonList />
      </main>
    </div>
  );
}