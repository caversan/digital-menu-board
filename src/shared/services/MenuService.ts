import type { MenuData, MediaItem, ApiResponse } from '../types';

/**
 * Service interface for menu data operations
 * Can be implemented by different providers (API, Mock, Local, etc.)
 */
export interface IMenuService {
  getMenuData(restaurantId?: string): Promise<MenuData>;
  getMediaItems(restaurantId?: string): Promise<MediaItem[]>;
  updateMenuData(data: MenuData): Promise<ApiResponse<MenuData>>;
  syncData(): Promise<void>;
}

/**
 * Configuration for menu service
 */
export interface MenuServiceConfig {
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  enableCache?: boolean;
  cacheTimeout?: number;
}

/**
 * Base service class with common functionality
 */
export abstract class BaseMenuService implements IMenuService {
  protected config: MenuServiceConfig;
  protected cache: Map<string, { data: any; timestamp: number }>;

  constructor(config: MenuServiceConfig = {}) {
    this.config = {
      timeout: 10000,
      retryAttempts: 3,
      enableCache: true,
      cacheTimeout: 5 * 60 * 1000, // 5 minutes
      ...config,
    };
    this.cache = new Map();
  }

  abstract getMenuData(restaurantId?: string): Promise<MenuData>;
  abstract getMediaItems(restaurantId?: string): Promise<MediaItem[]>;
  abstract updateMenuData(data: MenuData): Promise<ApiResponse<MenuData>>;
  abstract syncData(): Promise<void>;

  /**
   * Check if cached data is still valid
   */
  protected isCacheValid(key: string): boolean {
    if (!this.config.enableCache) return false;
    
    const cached = this.cache.get(key);
    if (!cached) return false;

    const now = Date.now();
    return now - cached.timestamp < (this.config.cacheTimeout || 0);
  }

  /**
   * Get data from cache
   */
  protected getFromCache<T>(key: string): T | null {
    if (this.isCacheValid(key)) {
      return this.cache.get(key)?.data as T;
    }
    return null;
  }

  /**
   * Save data to cache
   */
  protected saveToCache(key: string, data: any): void {
    if (this.config.enableCache) {
      this.cache.set(key, { data, timestamp: Date.now() });
    }
  }

  /**
   * Clear cache
   */
  protected clearCache(): void {
    this.cache.clear();
  }
}
