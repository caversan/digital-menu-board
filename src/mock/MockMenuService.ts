import { BaseMenuService, MenuServiceConfig } from '../shared/services/MenuService';
import type { MenuData, MediaItem, ApiResponse } from '../shared/types';
import { logger } from '../shared/utils/logger';

const mockImage = (fileName: string): string => new URL(`./images/${fileName}`, import.meta.url).href;

// Mock data with rich visual content
const mockRestaurantData: MenuData = {
  restaurantId: 'rest-001',
  name: 'Bella Vista Ristorante',
  logoUrl: mockImage('logo-italian-restaurant.svg'),
  categories: [
    {
      id: 'cat-001',
      name: '🥗 Entradas',
      description: 'Deliciosos aperitivos para despertar seu paladar',
      displayOrder: 1,
      isActive: true,
      imageUrl: mockImage('u-1551024506-0bccd828d307-w600-h400.jpg')
    },
    {
      id: 'cat-002', 
      name: '🍝 Pratos Principais',
      description: 'Nossos pratos mais especiais do chef italiano',
      displayOrder: 2,
      isActive: true,
      imageUrl: mockImage('u-1546833999-b9f581a1996d-w600-h400.jpg')
    },
    {
      id: 'cat-003',
      name: '🍰 Sobremesas',
      description: 'O final doce perfeito para sua refeição',
      displayOrder: 3,
      isActive: true,
      imageUrl: mockImage('u-1563729784474-d77dbb933a9e-w600-h400.jpg')
    },
    {
      id: 'cat-004',
      name: '🍷 Bebidas',
      description: 'Vinhos selecionados e bebidas refrescantes',
      displayOrder: 4,
      isActive: true,
      imageUrl: mockImage('u-1544145945-f90425340c7e-w600-h400.jpg')
    }
  ],
  items: [
    // Entradas
    {
      id: 'item-001',
      categoryId: 'cat-001',
      name: 'Bruschetta Italiana Clássica',
      description: 'Pão artesanal tostado com tomates san marzano frescos, manjericão orgânico e azeite extra virgem da Toscana',
      price: 18.90,
      imageUrl: mockImage('u-1572695157366-5e585ab2b69f-w500-h300.jpg'),
      isActive: true,
      displayOrder: 1,
      badges: ['🌱 Vegetariano', '⭐ Chef']
    },
    {
      id: 'item-002',
      categoryId: 'cat-001',
      name: 'Carpaccio de Salmão Premium',
      description: 'Fatias ultra finas de salmão norueguês com alcaparras, rúcula selvagem e molho cítrico artesanal',
      price: 32.90,
      imageUrl: mockImage('carpaccio-salmao-new.jpg'),
      isActive: true,
      displayOrder: 2,
      isHighlighted: true,
      badges: ['🌟 Premium', '🐟 Peixe Fresco']
    },
    {
      id: 'item-003',
      categoryId: 'cat-001',
      name: 'Antipasti della Casa',
      description: 'Seleção de queijos italianos, presunto de Parma, azeitonas e vegetais em conserva',
      price: 24.90,
      imageUrl: mockImage('antipasti-casa-new.jpg'),
      isActive: true,
      displayOrder: 3,
      badges: ['🧀 Queijos Especiais']
    },
    
    // Pratos Principais  
    {
      id: 'item-004',
      categoryId: 'cat-002',
      name: 'Filé Mignon ao Barolo',
      description: 'Tender filé mignon grelhado ao ponto, risotto de cogumelos porcini e redução de vinho Barolo DOCG',
      price: 58.90,
      imageUrl: mockImage('u-1546833999-b9f581a1996d-w500-h300.jpg'),
      isActive: true,
      displayOrder: 1,
      isHighlighted: true,
      badges: ['🥩 Premium', '🍷 Com Vinho']
    },
    {
      id: 'item-005',
      categoryId: 'cat-002',
      name: 'Salmão Siciliano',
      description: 'Salmão fresco grelhado com crosta de ervas mediterrâneas, purê de batata-doce e aspargos grelhados',
      price: 45.90,
      imageUrl: mockImage('salmao-siciliano-new.jpg'),
      isActive: true,
      displayOrder: 2,
      badges: ['🐟 Peixe', '🌿 Saudável']
    },
    {
      id: 'item-006',
      categoryId: 'cat-002',
      name: 'Risotto ai Funghi Porcini',
      description: 'Arroz arbóreo cremoso com cogumelos porcini importados, manteiga trufada e parmigiano reggiano 24 meses',
      price: 42.90,
      imageUrl: mockImage('risotto-funghi-porcini-new.jpg'),
      isActive: true,
      displayOrder: 3,
      badges: ['🌱 Vegetariano', '⭐ Especialidade']
    },
    // Sobremesas
    {
      id: 'item-007',
      categoryId: 'cat-003',
      name: 'Tiramisu Tradicional',
      description: 'Clássico italiano com biscoitos champagne, mascarpone cremoso, café espresso e cacau em pó',
      price: 22.90,
      imageUrl: mockImage('u-1571877227200-a0d98ea607e9-w500-h300.jpg'),
      isActive: true,
      displayOrder: 1,
      badges: ['⭐ Mais Vendido']
    },
    {
      id: 'item-008',
      categoryId: 'cat-003',
      name: 'Panna Cotta aos Frutos Vermelhos',
      description: 'Delicada panna cotta de baunilha com calda artesanal de frutos vermelhos frescos',
      price: 19.90,
      imageUrl: mockImage('u-1488477181946-6428a0291777-w500-h300.jpg'),
      isActive: true,
      displayOrder: 2,
      badges: ['🌱 Sem Glúten']
    },
    // Bebidas
    {
      id: 'item-009',
      categoryId: 'cat-004',
      name: 'Vinho Barolo DOCG 2018',
      description: 'Vinho tinto encorpado da região do Piemonte, notas de cereja e especiarias',
      price: 185.00,
      imageUrl: mockImage('u-1506377247377-2a5b3b417ebb-w500-h300.jpg'),
      isActive: true,
      displayOrder: 1,
      isHighlighted: true,
      badges: ['🍷 Premium']
    },
    {
      id: 'item-010',
      categoryId: 'cat-004',
      name: 'Limonada Siciliana',
      description: 'Refrescante limonada com limões sicilianos, hortelã fresca e água mineral',
      price: 12.90,
      imageUrl: mockImage('u-1544145945-f90425340c7e-w500-h300.jpg'),
      isActive: true,
      displayOrder: 2,
      badges: ['🌿 Natural']
    }
  ]
};

const mockMediaItems: MediaItem[] = [
  {
    id: 'media-001',
    type: 'image',
    url: mockImage('u-1414235077428-338989a2e8c0-w1920-h1080.jpg'),
    title: '🎉 Bem-vindo ao Bella Vista Ristorante!',
    duration: 5000,
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'media-002',
    type: 'image',
    url: mockImage('u-1559329007-40df8a9345d8-w1920-h1080.jpg'),
    title: '👨‍🍳 Pratos Especiais do Chef Italiano Matteo',
    duration: 4000,
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'media-003',
    type: 'image', 
    url: mockImage('u-1424847651672-bf20a4b0982b-w1920-h1080.jpg'),
    title: '🍷 Happy Hour - Terça a Sexta das 17h às 19h - 30% OFF em vinhos!',
    duration: 6000,
    displayOrder: 3,
    isActive: true
  }
];

/**
 * Mock implementation of MenuService for development and testing
 * Simulates realistic API delays and responses
 */
export class MockMenuService extends BaseMenuService {
  private simulateNetworkDelay: boolean;

  constructor(config: MenuServiceConfig = {}, simulateDelay: boolean = true) {
    super(config);
    this.simulateNetworkDelay = simulateDelay;
  }

  private async delay(ms: number = 800): Promise<void> {
    if (this.simulateNetworkDelay) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }

  async getMenuData(restaurantId: string = 'default'): Promise<MenuData> {
    logger.info('MockMenuService: Fetching menu data', { restaurantId });
    console.log('🔄 MockMenuService: Carregando dados do menu...');
    
    await this.delay(800);
    
    // Simulate occasional errors in development
    if (Math.random() < 0.05 && this.simulateNetworkDelay) {
      logger.error('MockMenuService: Simulated error');
      throw new Error('Network error (simulated)');
    }

    console.log('✅ MockMenuService: Menu data ready', { 
      restaurantName: mockRestaurantData.name,
      categories: mockRestaurantData.categories.length 
    });
    logger.info('MockMenuService: Menu data fetched successfully');
    return { ...mockRestaurantData };
  }

  async getMediaItems(restaurantId: string = 'default'): Promise<MediaItem[]> {
    logger.info('MockMenuService: Fetching media items', { restaurantId });
    console.log('🔄 MockMenuService: Carregando mídias...');
    
    await this.delay(500);
    
    console.log('✅ MockMenuService: Media items ready', { count: mockMediaItems.length });
    logger.info('MockMenuService: Media items fetched successfully');
    return [...mockMediaItems];
  }

  async updateMenuData(data: MenuData): Promise<ApiResponse<MenuData>> {
    logger.info('MockMenuService: Updating menu data', { restaurantId: data.restaurantId });
    
    await this.delay(1000);

    logger.info('MockMenuService: Menu data updated successfully');
    return {
      success: true,
      data,
      message: 'Menu updated successfully (mock)',
    };
  }

  async syncData(): Promise<void> {
    logger.info('MockMenuService: Syncing data');
    await this.delay(600);
    logger.info('MockMenuService: Data synced successfully');
  }
}

// Export backward compatible ApiService
export class ApiService {
  private static service = new MockMenuService({}, true);

  static async getMenuData(): Promise<MenuData> {
    return this.service.getMenuData();
  }

  static async getMediaItems(): Promise<MediaItem[]> {
    return this.service.getMediaItems();
  }
}
