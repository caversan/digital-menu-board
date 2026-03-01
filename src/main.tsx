import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Verificar se estamos em ambiente de TV ou desenvolvimento
const isProduction = (import.meta as any).env.PROD;
const isDevelopment = (import.meta as any).env.DEV;

// Configurações específicas para TV/Digital signage
if (isProduction) {
  // Desabilitar context menu (clique direito)
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  
  // Desabilitar seleção de texto
  document.addEventListener('selectstart', (e) => e.preventDefault());
  
  // Desabilitar drag
  document.addEventListener('dragstart', (e) => e.preventDefault());
  
  // Desabilitar teclas de desenvolvimento
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'C') ||
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
    }
  });
  
  // Desabilitar zoom
  document.addEventListener('keydown', (e) => {
    if (
      (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0'))
    ) {
      e.preventDefault();
    }
  });
  
  // Desabilitar scroll
  document.addEventListener('wheel', (e) => {
    e.preventDefault();
  }, { passive: false });
}

// Parse URL parameters para configuração
const urlParams = new URLSearchParams(window.location.search);
const restaurantId = urlParams.get('restaurantId') || 'rest-1';
const displayId = urlParams.get('displayId') || 'display-1';
const modeParam = urlParams.get('mode') || (isDevelopment ? 'development' : 'signage');
const mode = (modeParam === 'development' ? 'playlist' : 'standalone') as 'standalone' | 'fullscreen' | 'playlist';

// Log da configuração inicial
console.log('Digital Signage iniciando...', {
  restaurantId,
  displayId,
  mode,
  environment: isDevelopment ? 'development' : 'production',
  userAgent: navigator.userAgent,
  screen: {
    width: screen.width,
    height: screen.height,
    orientation: screen.orientation?.type || 'unknown'
  }
});

// Forçar fullscreen em produção
if (isProduction && document.documentElement.requestFullscreen) {
  document.documentElement.requestFullscreen().catch(console.error);
}

// Tratamento de erros globais
window.addEventListener('error', (event) => {
  console.error('Erro global capturado:', event.error);
  
  // Em produção, recarregar automaticamente em caso de erro crítico
  if (isProduction) {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rejeitada não tratada:', event.reason);
});

// Performance monitoring para desenvolvimento
if (isDevelopment) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
    });
  });
  
  observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
}

// Renderizar aplicação
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App 
      restaurantId={restaurantId} 
      displayId={displayId} 
      mode={mode}
    />
  </React.StrictMode>
);

// Service Worker para cache offline (produção)
if ('serviceWorker' in navigator && isProduction) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}