import { BaseMenuService, MenuServiceConfig } from '../shared/services/MenuService';
import type { MenuData, MediaItem, ApiResponse } from '../shared/types';
import { logger } from '../shared/utils/logger';

// Import images - Vite will handle hashing
import logoRestaurant from './images/logo-italian-restaurant.svg';
import bgEntradas from './images/bg-entradas.jpg';
import bgPratos from './images/bg-pratos.jpg';
import bgSobremesas from './images/bg-sobremesas.jpg';
import bgBebidas from './images/bg-bebidas.jpg';
import carpaccioSalmao from './images/carpaccio-salmao-new.jpg';
import risottoFunghi from './images/risotto-funghi-porcini-new.jpg';
import salmaoSiciliano from './images/salmao-siciliano-new.jpg';
import antipastiCasa from './images/antipasti-casa-new.jpg';
import restaurantBg from './images/restaurant-background.jpg';

// Import individual menu item images
import u1551024506_w600 from './images/u-1551024506-0bccd828d307-w600-h400.jpg';
import u1546833999_w600 from './images/u-1546833999-b9f581a1996d-w600-h400.jpg';
import u1563729784474_w600 from './images/u-1563729784474-d77dbb933a9e-w600-h400.jpg';
import u1544145945_w600 from './images/u-1544145945-f90425340c7e-w600-h400.jpg';
import u1571091718767_w1920 from './images/u-1571091718767-18b5b1457add-w1920-h1080.jpg';
import u1414235077428_w1920 from './images/u-1414235077428-338989a2e8c0-w1920-h1080.jpg';
import u1559329007_w1920 from './images/u-1559329007-40df8a9345d8-w1920-h1080.jpg';
import u1424847651672_w1920 from './images/u-1424847651672-bf20a4b0982b-w1920-h1080.jpg';
import u1517248135467_w1920 from './images/u-1517248135467-4c7edcad34c4-w1920-h1080.jpg';

// Additional item images
import u1572695157366 from './images/u-1572695157366-5e585ab2b69f-w500-h300.jpg';
import u1546833999_w500 from './images/u-1546833999-b9f581a1996d-w500-h300.jpg';
import u1571877227200 from './images/u-1571877227200-a0d98ea607e9-w500-h300.jpg';
import u1488477181946 from './images/u-1488477181946-6428a0291777-w500-h300.jpg';
import u1563729784474_w500 from './images/u-1563729784474-d77dbb933a9e-w500-h300.jpg';
import u1565958011703 from './images/u-1565958011703-44f9829ba187-w400-h300.jpg';
import u1568901346375 from './images/u-1568901346375-23c9450c58cd-w400-h300.jpg';
import u1510812431401 from './images/u-1510812431401-41d2bd2722f3-w500-h300.jpg';
import u1506377247377 from './images/u-1506377247377-2a5b3b417ebb-w500-h300.jpg';
import u1467003909585 from './images/u-1467003909585-2f8a72700288-w500-h300.jpg';
import u1629203851122 from './images/u-1629203851122-3726ecdf080e-w400-h300.jpg';
import u1572490122747 from './images/u-1572490122747-3968b75cc699-w400-h300.jpg';
import u1571091718767_w400 from './images/u-1571091718767-18b5b1457add-w400-h300.jpg';
import u1544145945_w500 from './images/u-1544145945-f90425340c7e-w500-h300.jpg';
import u1551024506_w500 from './images/u-1551024506-0bccd828d307-w500-h300.jpg';
import forBiggerBlazes from './images/ForBiggerBlazes.mp4';

// Mock data with rich visual content
const mockRestaurantData: MenuData = {
  restaurantId: 'rest-001',
  name: 'Bella Vista Ristorante',
  logoUrl: logoRestaurant,
  categories: [
    {
      id: 'cat-001',
      name: '🥗 Entradas',
      description: 'Deliciosos aperitivos para despertar seu paladar',
      displayOrder: 1,
      isActive: true,
      imageUrl: u1551024506_w600,
      backgroundImage: bgEntradas
    },
    {
      id: 'cat-002', 
      name: '🍝 Pratos Principais',
      description: 'Nossos pratos mais especiais do chef italiano',
      displayOrder: 2,
      isActive: true,
      imageUrl: u1546833999_w600,
      backgroundImage: bgPratos
    },
    {
      id: 'cat-003',
      name: '🍰 Sobremesas',
      description: 'O final doce perfeito para sua refeição',
      displayOrder: 3,
      isActive: true,
      imageUrl: u1563729784474_w600,
      backgroundImage: bgSobremesas
    },
    {
      id: 'cat-004',
      name: '🍷 Bebidas',
      description: 'Vinhos selecionados e bebidas refrescantes',
      displayOrder: 4,
      isActive: true,
      imageUrl: u1544145945_w600,
      backgroundImage: bgBebidas
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
      imageUrl: u1572695157366,
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
      imageUrl: carpaccioSalmao,
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
      imageUrl: antipastiCasa,
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
      imageUrl: u1546833999_w500,
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
      imageUrl: salmaoSiciliano,
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
      imageUrl: risottoFunghi,
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
      imageUrl: u1571877227200,
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
      imageUrl: u1488477181946,
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
      imageUrl: u1506377247377,
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
      imageUrl: u1544145945_w500,
      isActive: true,
      displayOrder: 2,
      badges: ['🌿 Natural']
    }
  ]
};

// Duração padrão para mídia estática (imagens, etc) em ms
const DEFAULT_IMAGE_DISPLAY_TIME = 7000; // 7 segundos

const mockMediaItems: MediaItem[] = [
  {
    id: 'media-001',
    type: 'image',
    url: u1414235077428_w1920,
    title: '🎉 Bem-vindo ao Bella Vista Ristorante!',
    duration: DEFAULT_IMAGE_DISPLAY_TIME,
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'media-002',
    type: 'video',
    url: forBiggerBlazes,
    title: '🎬 Experiência Gastronômica Única',
    duration: 0, // Vídeo toca até o fim naturalmente (sem limite)
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'media-003',
    type: 'image',
    url: u1559329007_w1920,
    title: '👨‍🍳 Pratos Especiais do Chef Italiano Matteo',
    duration: DEFAULT_IMAGE_DISPLAY_TIME,
    displayOrder: 3,
    isActive: true
  },
  {
    id: 'media-004',
    type: 'image', 
    url: u1424847651672_w1920,
    title: '🍷 Happy Hour - Terça a Sexta das 17h às 19h - 30% OFF em vinhos!',
    duration: DEFAULT_IMAGE_DISPLAY_TIME,
    displayOrder: 4,
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
    
    // Simulate occasional errors only when explicitly enabled
    if (import.meta.env.VITE_ENABLE_SIMULATED_ERRORS === 'true' && Math.random() < 0.05 && this.simulateNetworkDelay) {
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
