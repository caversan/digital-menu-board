import { useState, useEffect } from 'react';
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

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info('useMenuData: Fetching menu data', { restaurantId });
      console.log('🔄 Iniciando carregamento de dados...');

      const [menuData, mediaItems] = await Promise.all([
        service.getMenuData(restaurantId),
        service.getMediaItems(restaurantId),
      ]);

      console.log('✅ Dados carregados:', { 
        restaurantName: menuData.name,
        categoriesCount: menuData.categories.length,
        itemsCount: menuData.items.length,
        mediaCount: mediaItems.length
      });

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
          categoryDisplayTime: 8000,
          mediaDisplayTime: 3000,
          order: menuData.categories.map((cat) => cat.id),
          mediaItems,
        },
      };

      console.log('📋 Settings criados com sucesso');
      setSettings(newSettings as any);
      logger.info('useMenuData: Menu data loaded successfully', { categories: menuData.categories.length });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Erro ao carregar dados:', errorMessage);
      logger.error('useMenuData: Failed to fetch menu data', { error: errorMessage });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    setIsRefreshing(true);
    await fetchMenuData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    // Always fetch menu data on component mount or when restaurantId changes
    fetchMenuData();
  }, [restaurantId]);

  return {
    settings,
    isLoading: useMenuBoardStore((state) => state.isLoading),
    error: useMenuBoardStore((state) => state.error),
    isRefreshing,
    refresh,
  };
};
