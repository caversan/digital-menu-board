import { BaseMenuService, MenuServiceConfig } from './MenuService';
import type { MenuData, MediaItem, ApiResponse } from '../types';
import { logger } from '../utils/logger';

/**
 * API-based implementation of MenuService
 * Connects to a real backend API
 */
export class ApiMenuService extends BaseMenuService {
  constructor(config: MenuServiceConfig) {
    super(config);
  }

  async getMenuData(restaurantId: string = 'default'): Promise<MenuData> {
    const cacheKey = `menu-${restaurantId}`;
    const cached = this.getFromCache<MenuData>(cacheKey);
    
    if (cached) {
      logger.info('Returning cached menu data', { restaurantId });
      return cached;
    }

    try {
      logger.info('Fetching menu data from API', { restaurantId });
      
      const response = await this.fetchWithRetry(
        `${this.config.baseUrl}/api/menu/${restaurantId}`
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data: MenuData = await response.json();
      this.saveToCache(cacheKey, data);
      
      logger.info('Menu data fetched successfully', { restaurantId });
      return data;
    } catch (error) {
      logger.error('Failed to fetch menu data', { error, restaurantId });
      throw error;
    }
  }

  async getMediaItems(restaurantId: string = 'default'): Promise<MediaItem[]> {
    const cacheKey = `media-${restaurantId}`;
    const cached = this.getFromCache<MediaItem[]>(cacheKey);
    
    if (cached) {
      logger.info('Returning cached media items', { restaurantId });
      return cached;
    }

    try {
      logger.info('Fetching media items from API', { restaurantId });
      
      const response = await this.fetchWithRetry(
        `${this.config.baseUrl}/api/media/${restaurantId}`
      );

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data: MediaItem[] = await response.json();
      this.saveToCache(cacheKey, data);
      
      logger.info('Media items fetched successfully', { restaurantId });
      return data;
    } catch (error) {
      logger.error('Failed to fetch media items', { error, restaurantId });
      throw error;
    }
  }

  async updateMenuData(data: MenuData): Promise<ApiResponse<MenuData>> {
    try {
      logger.info('Updating menu data', { restaurantId: data.restaurantId });
      
      const response = await fetch(`${this.config.baseUrl}/api/menu`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse<MenuData> = await response.json();
      
      // Clear cache after update
      this.clearCache();
      
      logger.info('Menu data updated successfully', { restaurantId: data.restaurantId });
      return result;
    } catch (error) {
      logger.error('Failed to update menu data', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async syncData(): Promise<void> {
    logger.info('Syncing data with server');
    this.clearCache();
    // Implement sync logic if needed
  }

  /**
   * Fetch with retry logic
   */
  private async fetchWithRetry(
    url: string,
    options?: RequestInit,
    attempt: number = 0
  ): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeout);
      return response;
    } catch (error) {
      if (attempt < (this.config.retryAttempts || 0) - 1) {
        logger.warn(`Retry attempt ${attempt + 1}`, { url });
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
        return this.fetchWithRetry(url, options, attempt + 1);
      }
      throw error;
    }
  }
}
