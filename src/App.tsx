import React from 'react';
import { ThemeProvider } from './shared/themes/ThemeProvider';
import { modernTheme } from './shared/themes/presets';
import { ApiService } from './mock/ApiService';
import { DigitalSignagePlayer } from './features/playlist/DigitalSignagePlayer';
import type { MenuBoardSettings } from './shared/types';
import { GlobalStyles } from './shared/themes/GlobalStyles';

function App() {
  const [settings, setSettings] = React.useState<MenuBoardSettings | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadMenuData = async () => {
      try {
        const menuData = await ApiService.getMenuData();
        const mediaItems = await ApiService.getMediaItems();

        const menuSettings: MenuBoardSettings = {
          restaurantId: '1',
          theme: modernTheme,
          layout: {
            type: 'grid',
            itemsPerPage: 8,
            columns: 2,
            showPrices: true,
            showDescriptions: true,
            showImages: true
          },
          playlist: {
            enabled: true,
            categoryDisplayTime: 8000,
            mediaDisplayTime: 3000,
            order: menuData.categories.map(cat => cat.id),
            mediaItems: mediaItems
          },
          menuData
        };

        setSettings(menuSettings);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados do menu. Verifique a conexão.');
      } finally {
        setLoading(false);
      }
    };

    loadMenuData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#000',
        color: '#fff',
        fontSize: '1.2rem'
      }}>
        🍽️ Carregando menu...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#000',
        color: '#ff4444',
        fontSize: '1.2rem',
        textAlign: 'center',
        padding: '2rem'
      }}>
        ⚠️ {error}
      </div>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <ThemeProvider theme={settings.theme}>
      <GlobalStyles />
      <DigitalSignagePlayer
        settings={settings}
        showControls={process.env.NODE_ENV === 'development'}
        autoStart={true}
      />
    </ThemeProvider>
  );
}

export default App;