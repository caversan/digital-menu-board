import { MenuData, DisplayConfig, MediaItem } from '@shared/types';
import { themes } from '@shared/themes';

// Mock de itens de mídia promocional
export const mockMediaItems: MediaItem[] = [
  {
    id: 'media-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1920&h=1080&fit=crop',
    title: 'Promoção Combo Especial - 30% OFF',
    duration: 8,
    order: 1
  },
  {
    id: 'media-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1920&h=1080&fit=crop',
    title: 'Novos Sabores Chegaram!',
    duration: 6,
    order: 2
  }
];

// Mock de dados completos do menu
export const mockMenuData: MenuData = {
  restaurant: {
    id: 'rest-1',
    name: 'Burger House Digital',
    logo: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop',
    address: 'Rua das Delícias, 123 - Centro'
  },
  categories: [
    {
      id: 'cat-1',
      name: '🍔 Burgers',
      description: 'Nossos deliciosos hambúrguers artesanais',
      order: 1,
      isVisible: true,
      duration: 12,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
    },
    {
      id: 'cat-2',
      name: '🥤 Drinks',
      description: 'Bebidas refrescantes e especiais',
      order: 2,
      isVisible: true,
      duration: 10,
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop'
    },
    {
      id: 'cat-3',
      name: '🍿 Combos',
      description: 'Combinações especiais com desconto',
      order: 3,
      isVisible: true,
      duration: 15,
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop'
    }
  ],
  items: [
    // Burgers
    {
      id: 'item-1',
      name: 'Classic Burger',
      description: 'Hambúrguer artesanal 180g, queijo, alface, tomate e molho especial',
      price: 28.90,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      badge: { type: 'bestseller', label: 'Mais Pedido' },
      categoryId: 'cat-1',
      isAvailable: true,
      order: 1
    },
    {
      id: 'item-2',
      name: 'Bacon Deluxe',
      description: 'Dupla carne, bacon crocante, queijo cheddar, cebola caramelizada',
      price: 35.90,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
      badge: { type: 'new', label: 'Novo' },
      categoryId: 'cat-1',
      isAvailable: true,
      order: 2
    },
    {
      id: 'item-3',
      name: 'Vegetarian Paradise',
      description: 'Hambúrguer de quinoa, queijo vegano, rúcula e tomate seco',
      price: 32.90,
      image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop',
      badge: { type: 'vegetarian', label: 'Vegetariano' },
      categoryId: 'cat-1',
      isAvailable: true,
      order: 3
    },
    // Drinks
    {
      id: 'item-4',
      name: 'Coca-Cola 350ml',
      description: 'Refrigerante gelado',
      price: 6.90,
      image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop',
      categoryId: 'cat-2',
      isAvailable: true,
      order: 1
    },
    {
      id: 'item-5',
      name: 'Milkshake Chocolate',
      description: 'Milkshake cremoso com chantilly',
      price: 16.90,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
      badge: { type: 'bestseller', label: 'Popular' },
      categoryId: 'cat-2',
      isAvailable: true,
      order: 2
    },
    // Combos
    {
      id: 'item-6',
      name: 'Combo Classic',
      description: 'Classic Burger + Batata + Refrigerante',
      price: 39.90,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      badge: { type: 'promotion', label: 'Promoção' },
      categoryId: 'cat-3',
      isAvailable: true,
      order: 1
    },
    {
      id: 'item-7',
      name: 'Combo Deluxe',
      description: 'Bacon Deluxe + Onion Rings + Milkshake',
      price: 49.90,
      image: 'https://images.unsplash.com/photo-1619454016518-697bc231e7cb?w=400&h=300&fit=crop',
      badge: { type: 'promotion', label: 'Oferta' },
      categoryId: 'cat-3',
      isAvailable: true,
      order: 2
    }
  ]
};

// Mock de configuração do display
export const mockDisplayConfig: DisplayConfig = {
  id: 'display-1',
  restaurantId: 'rest-1',
  name: 'TV Principal - Horizontal',
  theme: themes.modern,
  layout: {
    orientation: 'horizontal',
    layoutType: 'grid',
    gridColumns: 3,
    showPrices: true,
    showImages: true,
    showDescriptions: true,
    featuredItemId: 'item-1',
    categoriesPerScreen: 4,
    itemsPerScreen: 8
  },
  media: {
    enabled: true,
    autoPlay: true,
    interval: 8,
    items: mockMediaItems
  },
  isActive: true,
  lastUpdated: new Date().toISOString()
};

// Serviço de API mockado
export const mockApiService = {
  async getMenuData(restaurantId: string) {
    // Simular latência de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      data: mockMenuData
    };
  },
  
  async getDisplayConfig(displayId: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: mockDisplayConfig
    };
  }
};