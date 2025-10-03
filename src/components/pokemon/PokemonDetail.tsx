import { Link } from 'react-router-dom';
import type { PokemonDetail as PokemonDetailType } from '../../types/pokemon.types';
// import './PokemonDetail.css';

interface PokemonDetailProps {
  pokemon: PokemonDetailType;
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
    <div className="pokemon-detail">
      <Link to="/" className="back-link">
        Back to Pokédex
      </Link>

      <div className="pokemon-header">
        <h1 className="pokemon-title">
          {capitalizedName}
          <span className="pokemon-id"> #{pokemon.id}</span>
        </h1>
      </div>

      <div className="pokemon-content">
        <div className="pokemon-sprites">
          {pokemon.sprites.front_default && (
            <img 
              src={pokemon.sprites.front_default} 
              alt={`${pokemon.name} front`}
              className="pokemon-sprite"
            />
          )}
          {pokemon.sprites.back_default && (
            <img 
              src={pokemon.sprites.back_default} 
              alt={`${pokemon.name} back`}
              className="pokemon-sprite"
            />
          )}
        </div>

        <div className="pokemon-info">
          <section className="info-section">
            <h2>Physical Attributes</h2>
            <p><strong>Height:</strong> {pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
          </section>

          <section className="info-section">
            <h2>Types</h2>
            <div className="types-container">
              {pokemon.types.map((typeInfo) => (
                <span 
                  key={typeInfo.type.name} 
                  className={`type-badge type-${typeInfo.type.name}`}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </section>

          <section className="info-section">
            <h2>Abilities</h2>
            <ul className="abilities-list">
              {pokemon.abilities.map((abilityInfo) => (
                <li key={abilityInfo.ability.name}>
                  {abilityInfo.ability.name.replace('-', ' ')}
                  {abilityInfo.is_hidden && ' (Hidden)'}
                </li>
              ))}
            </ul>
          </section>

          <section className="info-section">
            <h2>Base Stats</h2>
            <div className="stats-container">
              {pokemon.stats.map((statInfo) => (
                <div key={statInfo.stat.name} className="stat-row">
                  <span className="stat-name">
                    {statInfo.stat.name.replace('-', ' ')}:
                  </span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar" 
                      style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}
                    />
                  </div>
                  <span className="stat-value">{statInfo.base_stat}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}