import { Routes, Route } from 'react-router-dom';
import { CssBaseline, Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { PokemonDetailPage } from './pages/PokemonDetailPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { FavoritesBadge } from './components/ui/FavoritesBadge';
import { useEffect } from 'react';

function AppContent() {
  useEffect(() => {
    const images = ['/pokemon1.jpg', '/pokemon2.jpg', '/pokemon3.jpeg'];
    let index = 0;

    const apply = (i: number) => {
      const isWide = window.innerWidth > window.innerHeight;
      const theme = document.body.getAttribute('data-theme');
      
      document.body.style.backgroundImage = `url(${images[i]})`;
      document.body.style.backgroundSize = isWide ? '100% auto' : 'cover';
      document.body.style.backgroundPosition = 'center top';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.transition = 'background-image 0.8s ease-in-out';
      document.body.style.backgroundAttachment = 'fixed';
      
      const overlay = document.getElementById('bg-overlay');
      if (overlay) {
        overlay.style.backgroundColor = theme === 'dark' 
          ? 'rgba(0,0,0,0.7)' 
          : 'rgba(0,0,0,0.25)';
      }
    };

    apply(index);

    const id = setInterval(() => {
      index = (index + 1) % images.length;
      apply(index);
    }, 10000);

    const overlay = document.createElement('div');
    overlay.id = 'bg-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '-1';
    overlay.style.transition = 'background-color 0.3s ease';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.25)';
    document.body.prepend(overlay);

    const observer = new MutationObserver(() => {
      const theme = document.body.getAttribute('data-theme');
      if (overlay) {
        overlay.style.backgroundColor = theme === 'dark' 
          ? 'rgba(0,0,0,0.7)' 
          : 'rgba(0,0,0,0.25)';
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      clearInterval(id);
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.transition = '';
      document.body.style.backgroundAttachment = '';
      overlay.remove();
      observer.disconnect();
    };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', zIndex: 0 }}>
      <AppBar position="sticky" color="default" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            Pokédex
            </Typography>
            <FavoritesBadge  />
            <ThemeToggle />
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

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
          <CssBaseline />
          <AppContent />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;