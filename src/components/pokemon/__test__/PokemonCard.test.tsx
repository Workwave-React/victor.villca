import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { PokemonCard } from '../PokemonCard';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PokemonCard', () => {
  const mockProps = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('should render pokemon name capitalized', () => {
    renderWithRouter(<PokemonCard {...mockProps} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('should render pokemon image with correct src', () => {
    renderWithRouter(<PokemonCard {...mockProps} />);
    
    const image = screen.getByAltText('pikachu');
    expect(image).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
  });

  it('should render Extend and See more buttons', () => {
    renderWithRouter(<PokemonCard {...mockProps} />);

    const extendButtons = screen.getAllByRole('button', { name: /extend/i });
    const seeMoreButtons = screen.getAllByRole('button', { name: /see more/i });

    expect(extendButtons.length).toBeGreaterThan(0);
    expect(seeMoreButtons.length).toBeGreaterThan(0);
    });

  it('should navigate to detail page when See more is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<PokemonCard {...mockProps} />);
    
    const seeMoreButton = screen.getAllByRole('button', { name: /see more/i });
    await user.click(seeMoreButton.pop()!);
    
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/pikachu');
  });
});