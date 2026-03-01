import { MenuData, DisplayConfig, MediaItem } from '@shared/types';
import { themes } from '@shared/themes';

const mockImage = (fileName: string): string => new URL(`./images/${fileName}`, import.meta.url).href;

// Mock de itens de mídia promocional
export const mockMediaItems: MediaItem[] = [
  {
    id: 'media-1',
    type: 'image',
    url: mockImage('u-1571091718767-18b5b1457add-w1920-h1080.jpg'),
    title: 'Promoção Combo Especial - 30% OFF',
    duration: 8,
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'media-2',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: '🎬 Novidades Incríveis - Assista!',
    duration: 10,
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'media-3',
    type: 'image',
    url: mockImage('u-1571091718767-18b5b1457add-w1920-h1080.jpg'),
    title: 'Novos Sabores Chegaram!',
    duration: 6,
    displayOrder: 3,
    isActive: true
  }
];

// Mock de dados completos do menu
export const mockMenuData: MenuData = {
  restaurant: {
    id: 'rest-1',
    name: 'Burger House Digital',
    logo: mockImage('u-1513475382585-d06e58bcb0e0-w200-h200.jpg'),
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
      image: mockImage('u-1568901346375-23c9450c58cd-w400-h300.jpg')
    },
    {
      id: 'cat-2',
      name: '🥤 Drinks',
      description: 'Bebidas refrescantes e especiais',
      order: 2,
      isVisible: true,
      duration: 10,
      image: mockImage('u-1544145945-f90425340c7e-w400-h300.jpg')
    },
    {
      id: 'cat-3',
      name: '🍿 Combos',
      description: 'Combinações especiais com desconto',
      order: 3,
      isVisible: true,
      duration: 15,
      image: mockImage('u-1565958011703-44f9829ba187-w400-h300.jpg')
    }
  ],
  items: [
    // Burgers
    {
      id: 'item-1',
      name: 'Classic Burger',
      description: 'Hambúrguer artesanal 180g, queijo, alface, tomate e molho especial',
      price: 28.90,
      image: mockImage('u-1568901346375-23c9450c58cd-w400-h300.jpg'),
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
      image: mockImage('u-1571091718767-18b5b1457add-w400-h300.jpg'),
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
      image: mockImage('u-1568901346375-23c9450c58cd-w400-h300.jpg'),
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
      image: mockImage('u-1629203851122-3726ecdf080e-w400-h300.jpg'),
      categoryId: 'cat-2',
      isAvailable: true,
      order: 1
    },
    {
      id: 'item-5',
      name: 'Milkshake Chocolate',
      description: 'Milkshake cremoso com chantilly',
      price: 16.90,
      image: mockImage('u-1572490122747-3968b75cc699-w400-h300.jpg'),
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
      image: mockImage('u-1571091718767-18b5b1457add-w400-h300.jpg'),
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
      image: mockImage('u-1619454016518-697bc231e7cb-w400-h300.jpg'),
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