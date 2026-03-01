import type { MenuData, MediaItem } from '../shared/types';

const mockImage = (fileName: string): string => new URL(`./images/${fileName}`, import.meta.url).href;

// Mock data com conteúdo rico e visual
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
      badges: ['🐟 Peixe do Dia', '🌿 Ervas Frescas']
    },
    {
      id: 'item-006',
      categoryId: 'cat-002',
      name: 'Osso Buco alla Milanese',
      description: 'Tradicional osso buco lombardo cozido lentamente com safran, served com risotto milanês cremoso',
      price: 52.90,
      imageUrl: mockImage('u-1546833999-b9f581a1996d-w500-h300.jpg'),
      isActive: true,
      displayOrder: 3,
      badges: ['🇮🇹 Tradicional', '⏰ Cozimento Lento']
    },
    
    // Sobremesas
    {
      id: 'item-007',
      categoryId: 'cat-003',
      name: 'Tiramisù della Nonna',
      description: 'Autêntica sobremesa italiana da receita da nonna com café espresso forte, mascarpone e ladyfingers',
      price: 19.90,
      imageUrl: mockImage('u-1571877227200-a0d98ea607e9-w500-h300.jpg'),
      isActive: true,
      displayOrder: 1,
      badges: ['🇮🇹 Receita Original', '☕ Com Café']
    },
    {
      id: 'item-008',
      categoryId: 'cat-003',
      name: 'Petit Gâteau Fundente',
      description: 'Bolinho quente de chocolate belga 70% cacau com centro fundente, acompanha sorvete de vaniglia',
      price: 22.90,
      imageUrl: mockImage('u-1563729784474-d77dbb933a9e-w500-h300.jpg'),
      isActive: true,
      displayOrder: 2,
      isHighlighted: true,
      badges: ['🍫 Chocolate Belga', '🔥 Servido Quente']
    },
    {
      id: 'item-009',
      categoryId: 'cat-003',
      name: 'Panna Cotta ai Frutti di Bosco',
      description: 'Deliciosa panna cotta artesanal com calda de frutas vermelhas da estação',
      price: 16.90,
      imageUrl: mockImage('u-1488477181946-6428a0291777-w500-h300.jpg'),
      isActive: true,
      displayOrder: 3,
      badges: ['🍓 Frutas Frescas', '🥛 Artesanal']
    },
    
    // Bebidas
    {
      id: 'item-010',
      categoryId: 'cat-004',
      name: 'Chianti Classico DOCG',
      description: 'Vinho tinto da Toscana com notas de frutas vermelhas e especiarias - taça 150ml',
      price: 28.90,
      imageUrl: mockImage('u-1510812431401-41d2bd2722f3-w500-h300.jpg'),
      isActive: true,
      displayOrder: 1,
      badges: ['🍷 DOCG', '🇮🇹 Importado']
    },
    {
      id: 'item-011',
      categoryId: 'cat-004',
      name: 'Prosecco di Valdobbiadene',
      description: 'Espumante italiano extra dry com perlage fino e persistente - taça 120ml',
      price: 24.90,
      imageUrl: mockImage('u-1506377247377-2a5b3b417ebb-w500-h300.jpg'),
      isActive: true,
      displayOrder: 2,
      badges: ['🥂 Espumante', '✨ Extra Dry']
    },
    {
      id: 'item-012',
      categoryId: 'cat-004',
      name: 'Limonatta Siciliana',
      description: 'Limonada artesanal com limões sicilianos frescos, hortelã e água com gás',
      price: 12.90,
      imageUrl: mockImage('u-1544145945-f90425340c7e-w500-h300.jpg'),
      isActive: true,
      displayOrder: 3,
      badges: ['🍋 Natural', '🌿 Hortelã Fresca']
    }
  ]
};

const mockMediaItems: MediaItem[] = [
  {
    id: 'media-001',
    type: 'image',
    url: mockImage('u-1414235077428-338989a2e8c0-w1920-h1080.jpg'),
    title: '✨ Ambiente Aconchegante e Elegante',
    duration: 5,
    displayOrder: 1,
    isActive: true
  },
  {
    id: 'media-002', 
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: '🎬 Experiência Gastronômica Única',
    duration: 10,
    displayOrder: 2,
    isActive: true
  },
  {
    id: 'media-003',
    type: 'image',
    url: mockImage('u-1559329007-40df8a9345d8-w1920-h1080.jpg'),
    title: '👨‍🍳 Pratos Especiais do Chef Italiano Matteo',
    duration: 4,
    displayOrder: 3,
    isActive: true
  },
  {
    id: 'media-004',
    type: 'image', 
    url: mockImage('u-1424847651672-bf20a4b0982b-w1920-h1080.jpg'),
    title: '🍷 Happy Hour - Terça a Sexta das 17h às 19h - 30% OFF em vinhos!',
    duration: 6,
    displayOrder: 4,
    isActive: true
  },
  {
    id: 'media-005',
    type: 'image',
    url: mockImage('u-1517248135467-4c7edcad34c4-w1920-h1080.jpg'),
    title: '🎉 Reservas para grupos - Espaço exclusivo para eventos especiais',
    duration: 4,
    displayOrder: 5,
    isActive: true
  },
  {
    id: 'media-006',
    type: 'image',
    url: mockImage('u-1571091718767-18b5b1457add-w1920-h1080.jpg'),
    title: '🍝 Massa fresca feita na casa diariamente - Tradição italiana autêntica',
    duration: 5,
    displayOrder: 6,
    isActive: true
  }
];

// Simulação de API com delays realistas
export class ApiService {
  private static delay(ms: number = 1000): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async getMenuData(): Promise<MenuData> {
    await this.delay(800);
    return Promise.resolve(mockRestaurantData);
  }

  static async getMediaItems(): Promise<MediaItem[]> {
    await this.delay(500);
    return Promise.resolve(mockMediaItems);
  }

  static async getRestaurantInfo(restaurantId: string) {
    await this.delay(600);
    return Promise.resolve({
      id: restaurantId,
      name: mockRestaurantData.name,
      description: 'Restaurante italiano autêntico com ambiente familiar e pratos tradicionais.',
      address: 'Rua das Flores, 123 - Centro',
      phone: '(11) 9999-8888',
      hours: 'Seg-Dom: 11:30-22:30',
      website: 'www.bellavista.com.br'
    });
  }
}