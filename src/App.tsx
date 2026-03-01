import React from 'react';
import { ThemeProvider } from './shared/themes/ThemeProvider';
import { GlobalStyles } from './shared/themes/GlobalStyles';
import { modernTheme } from './shared/themes/presets';
import { ErrorBoundary, MenuBoardLoading, ErrorLoading } from './shared/components';
import { DigitalSignagePlayer } from './features/playlist/DigitalSignagePlayer';
import { useMenuData, useOnline } from './shared/hooks';
import { logger } from './shared/utils/logger';
import { WebOSRemoteControl } from './webos';

interface AppProps {
  restaurantId?: string;
  displayId?: string;
  mode?: 'standalone' | 'fullscreen' | 'playlist';
}

function App({ restaurantId = 'default', displayId, mode = 'playlist' }: AppProps) {
  const { settings, isLoading, error, refresh } = useMenuData(restaurantId);
  const isOnline = useOnline();

  React.useEffect(() => {
    console.log('📱 App initialized', { 
      isOnline, 
      environment: (import.meta as any).env.MODE,
      hasSettings: !!settings,
      isLoading,
      error
    });
    logger.info('App initialized', { 
      isOnline, 
      environment: (import.meta as any).env.MODE,
      isLoading,
      error
    });
  }, [isOnline, settings, isLoading, error]);

  // Initialize WebOS Remote Control if running on webOS TV
  React.useEffect(() => {
    if ((window as any).webOS) {
      console.log('📺 WebOS detectado - Inicializando controle remoto');
      WebOSRemoteControl.getInstance((import.meta as any).env.DEV);
    }
  }, []);

  // Auto-retry loading if stuck for too long
  React.useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        console.warn('⚠️ App ainda carregando após 5s, tentando refresh...');
        refresh();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, refresh]);

  console.log('🔍 App state:', { isLoading, hasSettings: !!settings, hasError: !!error });

  // Show loading state
  if (isLoading) {
    return (
      <ThemeProvider theme={modernTheme}>
        <GlobalStyles />
        <MenuBoardLoading message="🍽️ Carregando menu..." />
      </ThemeProvider>
    );
  }

  // Show error state
  if (error) {
    return (
      <ThemeProvider theme={modernTheme}>
        <GlobalStyles />
        <ErrorLoading message={`⚠️ ${error}`} />
      </ThemeProvider>
    );
  }

  // No settings available
  if (!settings) {
    return (
      <ThemeProvider theme={modernTheme}>
        <GlobalStyles />
        <ErrorLoading message="⚠️ Nenhuma configuração disponível" />
      </ThemeProvider>
    );
  }

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        logger.error('App error boundary caught error', {
          error: error.message,
          stack: errorInfo.componentStack,
        });
      }}
    >
      <ThemeProvider theme={settings.theme || modernTheme}>
        <GlobalStyles />
        <DigitalSignagePlayer
          settings={settings}
          showControls={(import.meta as any).env.DEV}
          autoStart={true}
        />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;