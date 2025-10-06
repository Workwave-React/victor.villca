import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { PokemonDetailPage } from './pages/PokemonDetailPage';
import { theme } from './theme';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const images = ['/pokemon1.jpg', '/pokemon2.jpg', '/pokemon3.jpeg'];
    let index = 0;

    const apply = (i: number) => {
      const isWide = window.innerWidth > window.innerHeight;

      document.body.style.backgroundImage = `url(${images[i]})`;
      document.body.style.backgroundSize = isWide ? '100% auto' : 'cover';
      document.body.style.backgroundPosition = 'center top';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.transition = 'background-image 0.8s ease-in-out';
      document.body.style.backgroundAttachment = 'fixed';
    };

    apply(index);

    const id = setInterval(() => {
      index = (index + 1) % images.length;
      apply(index);
    }, 10000);

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '-1';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.25)';
    document.body.prepend(overlay);

    return () => {
      clearInterval(id);
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.transition = '';
      document.body.style.backgroundAttachment = '';
      overlay.remove();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;