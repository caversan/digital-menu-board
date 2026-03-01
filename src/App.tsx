import React from 'react';
import { ThemeProvider } from './shared/themes/ThemeProvider';
import { GlobalStyles } from './shared/themes/GlobalStyles';
import { modernTheme } from './shared/themes/presets';
import { ErrorBoundary, MenuBoardLoading, ErrorLoading } from './shared/components';
import { DigitalSignagePlayer } from './features/playlist/DigitalSignagePlayer';
import { useMenuData, useOnline } from './shared/hooks';
import { logger } from './shared/utils/logger';
import { invoke } from '@tauri-apps/api/core';

function App() {
  const { settings, isLoading, error, refresh } = useMenuData();
  const isOnline = useOnline();

  React.useEffect(() => {
    console.log('📱 App initialized', { 
      isOnline, 
      environment: import.meta.env.MODE,
      hasSettings: !!settings
    });
    logger.info('App initialized', { 
      isOnline, 
      environment: import.meta.env.MODE 
    });
  }, [isOnline, settings]);

  // 🔒 Kiosk mode security headers
  React.useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Q key (emergency exit for kiosk mode)
      if (e.key === 'q' || e.key === 'Q') {
        e.preventDefault();
        console.log('🔐 Emergency exit shortcut detected - closing application...');
        logger.info('Emergency exit shortcut triggered');
        invoke('close_app').catch(err => {
          console.error('Failed to close app:', err);
          logger.error('Failed to close app', { error: err });
        });
        return false;
      }

      // F11 (fullscreen toggle)
      if (e.key === 'F11') {
        e.preventDefault();
        return false;
      }

      // F12 (dev tools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+R (reload page)
      if (ctrlKey && e.key === 'r') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I (dev tools inspector)
      if (ctrlKey && e.shiftKey && e.key === 'i') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C (color picker)
      if (ctrlKey && e.shiftKey && e.key === 'c') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J (console)
      if (ctrlKey && e.shiftKey && e.key === 'j') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+K (search)
      if (ctrlKey && e.shiftKey && e.key === 'k') {
        e.preventDefault();
        return false;
      }

      // F5 (refresh)
      if (e.key === 'F5') {
        e.preventDefault();
        return false;
      }

      return true;
    };
    document.addEventListener('keydown', handleKeyDown);

    // Disable drag and drop
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener('dragover', handleDragOver);

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener('drop', handleDrop);

    // Prevent text selection
    const handleSelectStart = (e: Event) => {
      (e.target as HTMLElement).style.userSelect = 'none';
    };
    document.addEventListener('selectstart', handleSelectStart);

    // Disable print dialog
    const handlePrint = (e: Event) => {
      e.preventDefault();
      return false;
    };
    window.addEventListener('beforeprint', handlePrint);

    console.log('🔒 Kiosk mode security handlers installed');
    logger.info('Kiosk mode security handlers installed');

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('beforeprint', handlePrint);
    };
  }, []);

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
          showControls={import.meta.env.DEV}
          autoStart={true}
        />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;