import React from 'react';
import { ThemeProvider } from './shared/themes/ThemeProvider';
import { GlobalStyles } from './shared/themes/GlobalStyles';
import { modernTheme } from './shared/themes/presets';
import { ErrorBoundary, MenuBoardLoading, ErrorLoading } from './shared/components';
import { DigitalSignagePlayer } from './features/playlist/DigitalSignagePlayer';
import { useMenuData, useOnline } from './shared/hooks';
import { logger } from './shared/utils/logger';

function App() {
  const { settings, isLoading, error, refresh } = useMenuData();
  const isOnline = useOnline();

  React.useEffect(() => {
    console.log('📱 App initialized', { 
      isOnline, 
      environment: process.env.NODE_ENV,
      hasSettings: !!settings
    });
    logger.info('App initialized', { 
      isOnline, 
      environment: process.env.NODE_ENV 
    });
  }, [isOnline, settings]);

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
          showControls={process.env.NODE_ENV === 'development'}
          autoStart={true}
        />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;