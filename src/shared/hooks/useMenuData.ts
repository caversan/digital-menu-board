import { useState, useEffect, useCallback } from 'react';
import { useMenuBoardStore } from '../store';
import { MockMenuService } from '../../mock/MockMenuService';
import { modernTheme } from '../themes/presets';
import { logger } from '../utils/logger';
import type { IMenuService } from '../services/MenuService';

const defaultService = new MockMenuService({}, true);

/**
 * Hook for fetching and managing menu data
 */
export const useMenuData = (
  restaurantId: string = 'default',
  service: IMenuService = defaultService
) => {
  const { settings, setSettings, setLoading, setError } = useMenuBoardStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMenuData = useCallback(async () => {
    try {
      console.log('🔄 [useMenuData] Iniciando carregamento...');
      setLoading(true);
      setError(null);

      logger.info('useMenuData: Fetching menu data', { restaurantId });

      const [menuData, mediaItems] = await Promise.all([
        service.getMenuData(restaurantId),
        service.getMediaItems(restaurantId),
      ]);

      console.log('✅ [useMenuData] Dados carregados:', { 
        restaurantName: menuData.name,
        categoriesCount: menuData.categories.length,
        itemsCount: menuData.items.length,
        mediaCount: mediaItems.length
      });

      // Duração padrão para exibição (parametrizado em ms)
      const DISPLAY_TIME = 7000; // 7 segundos

      // Create new settings with menu and media data
      const newSettings = {
        restaurantId,
        theme: modernTheme,
        layout: {
          type: 'grid' as const,
          itemsPerPage: 8,
          columns: 2,
          showPrices: true,
          showDescriptions: true,
          showImages: true,
        },
        menuData,
        playlist: {
          enabled: true,
          categoryDisplayTime: DISPLAY_TIME,
          mediaDisplayTime: DISPLAY_TIME,
          order: menuData.categories.map((cat) => cat.id),
          mediaItems,
        },
      };

      console.log('📋 [useMenuData] Settings criados, finalizando loading...');
      setSettings(newSettings as any);
      logger.info('useMenuData: Menu data loaded successfully', { categories: menuData.categories.length });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ [useMenuData] Erro ao carregar dados:', errorMessage, error);
      logger.error('useMenuData: Failed to fetch menu data', { error: errorMessage });
      setError(errorMessage);
    } finally {
      console.log('✅ [useMenuData] Finalizando (setLoading false)');
      setLoading(false);
    }
  }, [restaurantId, service, setSettings, setLoading, setError]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchMenuData();
    setIsRefreshing(false);
  }, [fetchMenuData]);

  useEffect(() => {
    console.log('🔍 [useMenuData] useEffect triggered for:', restaurantId);
    // Always fetch menu data on component mount or when restaurantId changes
    fetchMenuData();
  }, [restaurantId, fetchMenuData]);

  const isLoading = useMenuBoardStore((state) => state.isLoading);
  const error = useMenuBoardStore((state) => state.error);

  return {
    settings,
    isLoading,
    error,
    isRefreshing,
    refresh,
  };
};
