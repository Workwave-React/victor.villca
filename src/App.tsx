import { Routes, Route } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { HomePage } from './pages/HomePage';
import { PokemonDetailPage } from './pages/PokemonDetailPage';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { FavoritesBadge } from './components/ui/FavoritesBadge';
import { useEffect } from 'react';

function useDynamicBackground() {
  useEffect(() => {
    const images = ['/pokemon1.jpg', '/pokemon2.jpg', '/pokemon3.jpeg'];
    let i = 0;

    const overlay = Object.assign(document.createElement('div'), {
      id: 'bg-overlay',
      style: `
        position:fixed;inset:0;z-index:-1;
        background:rgba(0,0,0,0.25);
        transition:background-color .3s ease;
      `,
    });
    document.body.prepend(overlay);

    const apply = () => {
      const theme = document.body.dataset.theme;
      document.body.style.cssText = `
        background:url(${images[i]}) center top/${window.innerWidth > window.innerHeight ? '100% auto' : 'cover'} no-repeat fixed;
        transition:background-image .8s ease-in-out;
      `;
      overlay.style.backgroundColor = theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.25)';
    };

    apply();
    const id = setInterval(() => (i = (i + 1) % images.length, apply()), 10000);
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      clearInterval(id);
      obs.disconnect();
      overlay.remove();
      document.body.style.cssText = '';
    };
  }, []);
}

function AppContent() {
  useDynamicBackground();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" color="default" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700}>Pokédex</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FavoritesBadge />
              <ThemeToggle />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      </Routes>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <CssBaseline />
        <AppContent />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
