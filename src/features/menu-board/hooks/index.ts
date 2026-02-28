import React from 'react';
import { MenuData, DisplayConfig, AppState } from '@shared/types';
import { mockApiService } from '@mock';

interface UseMenuBoardParams {
  restaurantId: string;
  displayId: string;
}

interface UseMenuBoardReturn {
  state: AppState;
  actions: {
    loadData: () => Promise<void>;
    reload: () => void;
  };
}

export const useMenuBoard = ({ 
  restaurantId, 
  displayId 
}: UseMenuBoardParams): UseMenuBoardReturn => {
  const [state, setState] = React.useState<AppState>({
    restaurant: null,
    menuData: null,
    displayConfig: null,
    isOnline: navigator.onLine,
    isLoading: false,
    error: null,
    lastSync: null
  });

  const loadData = React.useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Carregar dados do menu e configuração em paralelo
      const [menuResponse, configResponse] = await Promise.all([
        mockApiService.getMenuData(restaurantId),
        mockApiService.getDisplayConfig(displayId)
      ]);
      
      if (menuResponse.success && configResponse.success) {
        setState(prev => ({
          ...prev,
          menuData: menuResponse.data!,
          restaurant: menuResponse.data!.restaurant,
          displayConfig: configResponse.data!,
          isLoading: false,
          lastSync: new Date().toISOString()
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: 'Erro ao carregar dados do cardápio',
          isLoading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Erro de conexão. Tentando novamente...',
        isLoading: false
      }));
    }
  }, [restaurantId, displayId]);

  const reload = React.useCallback(() => {
    loadData();
  }, [loadData]);

  // Carregar dados na inicialização
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  // Monitorar status de conexão
  React.useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    state,
    actions: {
      loadData,
      reload
    }
  };
};