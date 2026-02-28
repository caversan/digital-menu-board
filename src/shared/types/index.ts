// Tipos base para o menu digital
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string; // Renomeado de 'image'
  badges?: string[]; // Simplificado de MenuItemBadge para array de strings
  categoryId: string;
  isActive: boolean; // Renomeado de 'isAvailable'
  displayOrder: number; // Renomeado de 'order'
  isHighlighted?: boolean; // Para itens em destaque
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  displayOrder: number; // Renomeado de 'order' para melhor clareza
  isActive: boolean; // Renomeado de 'isVisible' para melhor clareza
  imageUrl?: string; // Renomeado de 'image'
  duration?: number; // Tempo de exibição em segundos
}

export interface MenuItemBadge {
  type: 'new' | 'promotion' | 'bestseller' | 'spicy' | 'vegetarian' | 'custom';
  label: string;
  color?: string;
  backgroundColor?: string;
}

export interface RestaurantInfo {
  id: string;
  name: string;
  logo?: string;
  address?: string;
  phone?: string;
  website?: string;
}

export interface MenuData {
  restaurantId: string;
  name: string;
  categories: MenuCategory[];
  items: MenuItem[];
}

// Interface para itens de mídia promocional
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  duration?: number; // em segundos
  displayOrder: number;
  isActive: boolean;
}

// Configuração de tema
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
}

// Configuração de layout
export interface LayoutConfig {
  orientation: 'horizontal' | 'vertical';
  layoutType: 'grid' | 'list' | 'highlight';
  gridColumns?: number;
  showPrices: boolean;
  showImages: boolean;
  showDescriptions: boolean;
  featuredItemId?: string;
  categoriesPerScreen?: number;
  itemsPerScreen?: number;
}

// Item de mídia promocional
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title?: string;
  duration?: number;
  order: number;
}

// Configuração de mídia
export interface MediaConfig {
  enabled: boolean;
  autoPlay: boolean;
  interval: number;
  items: MediaItem[];
}

// Configuração completa do display
export interface DisplayConfig {
  id: string;
  restaurantId: string;
  name: string;
  theme: ThemeConfig;
  layout: LayoutConfig;
  media: MediaConfig;
  isActive: boolean;
  lastUpdated: string;
}

// Estado da aplicação
export interface AppState {
  restaurant: RestaurantInfo | null;
  menuData: MenuData | null;
  displayConfig: DisplayConfig | null;
  isOnline: boolean;
  isLoading: boolean;
  error: string | null;
  lastSync: string | null;
}

// Resposta da API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Configuração de layout
export interface LayoutConfig {
  type: 'grid' | 'list' | 'highlight';
  itemsPerPage: number;
  columns: number;
  showPrices: boolean;
  showDescriptions: boolean;
  showImages: boolean;
  orientation?: 'horizontal' | 'vertical';
}

// Configuração de playlist
export interface PlaylistConfig {
  enabled: boolean;
  categoryDisplayTime: number; // em milissegundos
  mediaDisplayTime: number; // em milissegundos
  order: string[]; // IDs das categorias na ordem
  mediaItems: MediaItem[];
}

// Configurações do Menu Board
export interface MenuBoardSettings {
  restaurantId: string;
  timezone?: string;
  locale?: string;
  currency?: string;
  theme: any; // Theme interface
  layout: LayoutConfig;
  playlist: PlaylistConfig;
  menuData: MenuData;
  activeCategory?: string;
}

// Re-export theme types
export type { Theme } from './theme';