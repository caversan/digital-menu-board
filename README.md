# Digital Menu Board 🍽️

Sistema de cardápio digital para restaurantes com playlist automática, construído com React, TypeScript e Vite.

## 📋 Sumário
- [Decisões Arquiteturais](#decisões-arquiteturais)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Modelagem de Dados](#modelagem-de-dados)
- [Escalabilidade](#escalabilidade)
- [Trade-offs](#trade-offs)

---

## 🏗️ Decisões Arquiteturais

### 1. **Stack Tecnológico**
- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite (substituindo Webpack para melhor DX e performance)
- **State Management**: Zustand (leve, sem boilerplate desnecessário)
- **Styling**: Styled-components (CSS-in-JS com theme support)
- **Type Safety**: TypeScript strict mode

### 2. **Arquitetura em Camadas**

O projeto segue uma arquitetura modular com separação clara de responsabilidades:

```
src/
├── features/          # Funcionalidades específicas (menu-board, playlist)
├── shared/            # Código compartilhado (hooks, componentes, tipos)
├── mock/             # Dados simulados para desenvolvimento/teste
└── App.tsx           # Componente raiz
```

**Rationale**: Facilita manutenção, testes e escalabilidade horizontal (adicionar novas features sem quebrar as existentes).

### 3. **Service Layer Pattern**

Abstraçao de dados via interfaces (`IMenuService`) com implementações intercambiáveis:
- `MockMenuService`: Testes e desenvolvimento
- `ApiMenuService`: Produção (estrutura pronta)

**Rationale**: Desacoplamento entre lógica de negócio e fonte de dados.

### 4. **Estado Global Minimal**

Usar Zustand apenas para estado que **realmente** precisa ser global:
- Configurações do cardápio
- Estado de conexão
- Último sync com servidor

**Rationale**: Evita prop-drilling sem overhead de Redux.

### 5. **Playlist Pattern (Carousel + Timer)**

A playlist é um conceito de máquina de estados que alterna entre:
1. **Exibição de Categorias** (7 segundos)
2. **Exibição de Mídia** (imagens: 7s, vídeos: duração total)

**Rationale**: Permite que a mesma lógica sirva diferentes tipos de conteúdo.

---

## 📁 Estrutura de Pastas

```
digital-menu-board/
│
├── src/
│   ├── App.tsx                           # Componente raiz com orquestração
│   ├── main.tsx                          # Entry point React
│   │
│   ├── features/                         # Features específicas
│   │   ├── menu-board/
│   │   │   ├── components/
│   │   │   │   ├── MenuBoard.tsx        # Exibição do cardápio
│   │   │   │   ├── MenuBoard.styles.ts
│   │   │   │   └── MenuItemCard.tsx     # Card individual
│   │   │   └── hooks/
│   │   │       └── index.ts
│   │   │
│   │   └── playlist/
│   │       ├── DigitalSignagePlayer.tsx  # Player de playlist
│   │       ├── DigitalSignagePlayer.styles.ts
│   │       ├── usePlaylist.ts            # Hook lógica de playlist
│   │       └── index.ts
│   │
│   ├── shared/                           # Código reutilizável
│   │   ├── components/
│   │   │   ├── ErrorBoundary.tsx        # Tratamento de erros
│   │   │   ├── Loading.tsx              # Estados de loading
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useMenuData.ts           # Fetch e gerenciamento de menu
│   │   │   ├── useOnline.ts             # Detecta status online
│   │   │   ├── useInterval.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/
│   │   │   ├── MenuService.ts           # Interface base
│   │   │   ├── ApiMenuService.ts        # Implementação com API
│   │   │   └── index.ts
│   │   │
│   │   ├── store/
│   │   │   ├── useMenuBoardStore.ts     # Zustand store
│   │   │   └── index.ts
│   │   │
│   │   ├── themes/
│   │   │   ├── GlobalStyles.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── presets.ts               # Temas disponíveis
│   │   │   └── index.ts
│   │   │
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── theme.ts
│   │   │
│   │   └── utils/
│   │       ├── logger.ts                # Logger customizado
│   │       ├── helpers.ts
│   │       └── index.ts
│   │
│   ├── mock/
│   │   ├── MockMenuService.ts           # Dados fake para dev
│   │   ├── index.ts
│   │   └── images/                      # Assets estáticos
│   │
│   └── styled.d.ts                      # Type definitions styled-components
│
├── src-tauri/                            # (Futuro) Integração desktop com Tauri
│
├── vite.config.ts                        # Configuração build
├── tsconfig.json                         # TypeScript config
├── package.json
└── README.md

```

### Convenções de Naming
- **Components**: PascalCase (`MenuBoard.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useMenuData.ts`)
- **Services**: PascalCase (`ApiMenuService.ts`)
- **Types**: PascalCase (`MenuItem`, `MenuData`)
- **Utilities**: camelCase (`helpers.ts`, `logger.ts`)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 16+ 
- npm 8+

### Instalação

```bash
# 1. Clonar repositório
git clone <repo>
cd digital-menu-board

# 2. Instalar dependências
npm install

# 3. Instalar terser (necessário para build com Vite)
npm install terser --no-save
```

### Desenvolvimento

```bash
# Iniciar servidor Vite (hot reload)
npm run dev

# Abrir no navegador
# http://localhost:5173/ (ou porta exibida)
```

### Build Produção

```bash
# Compilar para produção
npm run build

# Revisar output no navegador
npm run preview

# Resultado em: ./dist/
```

### Lint & Teste

```bash
# Verificar códi
npm run lint

# Rodar testes
npm run test
```

### Variáveis de Ambiente

Criar `.env.local` se necessário:

```env
# API base URL (opcional, padrão: http://localhost:3000)
VITE_API_URL=https://seu-backend-api.com

# Simular erros aleatórios do menu (dev)
VITE_ENABLE_SIMULATED_ERRORS=false
```

---

## 📊 Modelagem de Dados

### Entidades Principais

#### **MenuData**
Representa todo o menu de um restaurante:
```typescript
interface MenuData {
  restaurantId: string;
  name: string;
  logoUrl?: string;
  categories: MenuCategory[];
  items: MenuItem[];
}
```

#### **MenuCategory**
Agrupamento de itens (Entradas, Pratos, Bebidas, etc.):
```typescript
interface MenuCategory {
  id: string;
  name: string;              // "🍝 Pratos Principais"
  description: string;
  displayOrder: number;      // Ordem de exibição
  isActive: boolean;
  imageUrl?: string;         // Banner da categoria
}
```

#### **MenuItem**
Item individual do menu:
```typescript
interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  isHighlighted?: boolean;   // Destaque especial
  displayOrder: number;
  badges?: string[];         // ["🌱 Vegetariano", "⭐ Chef"]
}
```

#### **MediaItem**
Conteúdo de mídia (imagens, vídeos) da playlist:
```typescript
interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  duration: number;          // 0 = toca até o fim (para vídeos)
  displayOrder: number;
  isActive: boolean;
}
```

#### **MenuBoardSettings**
Configuração completa exigida pelo player:
```typescript
interface MenuBoardSettings {
  restaurantId: string;
  theme: Theme;
  layout: LayoutConfig;
  menuData: MenuData;
  playlist: {
    enabled: boolean;
    categoryDisplayTime: number;  // 7000ms
    mediaDisplayTime: number;     // 7000ms
    order: string[];              // IDs das categorias
    mediaItems: MediaItem[];
  };
}
```

### Fluxo de Dados

```
App Component
    ↓
useMenuData() [Custom Hook]
    ↓
MockMenuService.getMenuData() → MenuData
MockMenuService.getMediaItems() → MediaItem[]
    ↓
useMenuBoardStore.setSettings() [Zustand]
    ↓
DigitalSignagePlayer
    ├── usePlaylist() [Playlist State Machine]
    │   ├── Categoria (7s)
    │   ├── Imagem (7s)
    │   ├── Vídeo (duração total)
    │   └── ...infinite loop
    │
    └── Renderiza based on state
        ├── MenuBoard (quando categoria ativa)
        └── MediaDisplay (quando mídia ativa)
```

---

## � Configurações e Persistência

### Estratégia de Salvamento de Layout

As configurações de layout são salvas em **3 níveis**:

#### **1. LocalStorage (Frontend)**
```typescript
// src/shared/hooks/useLocalStorage.ts
const [settings, setSetting, clearSettings] = useLocalStorage(
  'menuboard-settings',
  defaultSettings
);

// Salva automaticamente ao mudar
const updateLayout = (newTheme: Theme) => {
  setSetting({ ...settings, theme: newTheme });
  // ✅ Persistido em LocalStorage
};
```

**Vantagens:**
- Imediato (sem requisição HTTP)
- Funciona offline
- Sincronização com dev tools

**Limitações:**
- ~5-10MB por domínio
- Apenas cliente local
- Sem sincronização entre telas

#### **2. AsyncStorage Backend (Produção)**
```typescript
// src/shared/services/ConfigService.ts
class ConfigService {
  async saveLayout(restaurantId: string, layout: LayoutConfig) {
    // Patch na API
    await fetch(`/api/restaurants/${restaurantId}/layout`, {
      method: 'PATCH',
      body: JSON.stringify(layout)
    });
    // Local cache sincronizado
    localStorage.setItem(`layout-${restaurantId}`, JSON.stringify(layout));
  }

  async getLayout(restaurantId: string) {
    // Tenta LocalStorage primeiro
    const cached = localStorage.getItem(`layout-${restaurantId}`);
    if (cached) return JSON.parse(cached);
    
    // Fallback para API
    const response = await fetch(`/api/restaurants/${restaurantId}/layout`);
    return response.json();
  }
}
```

#### **3. Database Backend**
```sql
CREATE TABLE layout_configs (
  id UUID PRIMARY KEY,
  restaurant_id UUID NOT NULL,
  theme VARCHAR(50),
  display_width INT,
  display_height INT,
  video_autoplay BOOLEAN,
  cache_duration_seconds INT DEFAULT 7,
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  UNIQUE(restaurant_id)
);

-- Índice para busca rápida
CREATE INDEX idx_restaurant_layout ON layout_configs(restaurant_id);
```

### Versionamento de Configurações

```typescript
// Evita race conditions quando múltiplas telas atualizam simultaneamente
interface LayoutConfig {
  id: string;
  restaurantId: string;
  version: number;  // Timestamp ou counter
  theme: Theme;
  updatedAt: Date;
  updatedBy: string; // userId que fez a alteração
}

// Ao salvar:
const saveLayout = async (newLayout: LayoutConfig) => {
  const response = await fetch(
    `/api/restaurants/${restaurantId}/layout`,
    {
      method: 'PUT',
      body: JSON.stringify(newLayout),
      headers: {
        'If-Match': currentLayout.version // Optimistic locking
      }
    }
  );
  
  if (response.status === 409) {
    // Conflito - alguém atualizou
    alert('Configuração foi alterada por outro usuário. Recarregando...');
    location.reload();
  }
};
```

---

## 🏢 Multi-Tenant Architecture

### Isolamento de Dados

Cada restaurante é um "tenant" completamente isolado:

```typescript
// 1. URL-based Tenant Identification
const getTenantFromURL = () => {
  // https://app.example.com/telas/restaurant-123
  const match = window.location.pathname.match(/\/telas\/([\w-]+)/);
  return match?.[1] ?? 'default';
};

// 2. Subdomain-based (Futuro)
// https://rest-123.app.example.com → restaurantId = "rest-123"
const getTenantFromSubdomain = () => {
  return window.location.hostname.split('.')[0];
};

// 3. Header-based (Para mobile)
const getTenantFromHeader = () => {
  return localStorage.getItem('restaurantId') ??
    sessionStorage.getItem('restaurantId');
};
```

### Segregação no Frontend

```typescript
// src/App.tsx - Componente raiz com tenant
interface AppProps {
  restaurantId: string;
}

export function App({ restaurantId }: AppProps) {
  const { settings, loading } = useMenuData(restaurantId);
  
  return (
    <ThemeProvider theme={settings.theme}>
      <DigitalSignagePlayer 
        restaurantId={restaurantId}
        settings={settings}
      />
    </ThemeProvider>
  );
}

// Múltiplas telas em paralelo
const RESTAURANTS = ['rest-001', 'rest-002', 'rest-003'];
RACDOM.createRoot(document.getElementById('root')).render(
  <>
    {RESTAURANTS.map(id => (
      <App key={id} restaurantId={id} />
    ))}
  </>
);
```

### Database Multi-Tenant

```sql
-- Opção 1: Row-Level Security (PostgreSQL)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY restaurant_isolation ON menu_items
  USING (restaurant_id = current_setting('app.current_restaurant')::uuid);

-- Opção 2: Schema por Tenant
CREATE SCHEMA rest_001;
CREATE SCHEMA rest_002;

CREATE TABLE rest_001.menu_items AS SELECT * FROM public.menu_items;
CREATE TABLE rest_002.menu_items AS SELECT * FROM public.menu_items;

-- Opção 3: Tabela compartilhada com restaurantId
CREATE TABLE menu_items (
  id UUID,
  restaurant_id UUID,  -- ← CHAVE de isolamento
  name VARCHAR(200),
  PRIMARY KEY (id, restaurant_id)
);

-- Índice composto garante isolamento
CREATE INDEX idx_restaurant_items 
  ON menu_items(restaurant_id, id);
```

### Autenticação Multi-Tenant

```typescript
// JWT com restaurantId embarcado
interface TokenPayload {
  sub: string;           // userId
  restaurantId: string;  // ← Isolamento
  role: 'admin' | 'telaOperador';
  iat: number;
  exp: number;
}

// Middleware no backend
express.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const payload = jwt.verify(token, SECRET);
  
  // Valida que o restaurantId na URL == token
  if (req.params.restaurantId !== payload.restaurantId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  res.locals.restaurantId = payload.restaurantId;
  next();
});
```

---

## 🔄 Cache em Múltiplas Telas

### Problema: Cache Inconsistência

**Cenário:** Admin muda cor do tema em 1 hora da manhã. 1000 telas continuam com cache antigo.

### Solução 1: Cache Versioning

```typescript
// Backend envia versão
interface MenuDataResponse {
  data: MenuData;
  version: string;  // Git commit hash ou timestamp
  cacheKey: string; // hash de conteúdo
}

// Frontend verifica versão
const { settings, serverVersion } = await fetchMenuData(restaurantId);
const localVersion = localStorage.getItem(`menu-version-${restaurantId}`);

if (serverVersion !== localVersion) {
  // Invalidar cache local
  localStorage.removeItem(`menu-${restaurantId}`);
  localStorage.setItem(`menu-version-${restaurantId}`, serverVersion);
  // Forçar re-render com dados novos
  setSettings(settings);
}
```

### Solução 2: ETags HTTP

```typescript
const fetchMenuData = async (restaurantId: string) => {
  const cached = await caches.match(
    `/api/menu/${restaurantId}`
  );
  const etag = cached?.headers.get('etag');
  
  const response = await fetch(
    `/api/menu/${restaurantId}`,
    { headers: { 'If-None-Match': etag } }
  );
  
  if (response.status === 304) {
    // Não mudou - usar cache
    return cached.json();
  }
  
  // Nova versão
  const data = await response.json();
  const cache = await caches.open('menu-v1');
  cache.put(response);
  return data;
};
```

### Solução 3: Push Notifications

```typescript
// Backend notifica telas quando há atualizações
const io = require('socket.io');

io.on('connection', (socket) => {
  const { restaurantId } = socket.handshake.query;
  socket.join(`restaurant-${restaurantId}`);
});

// Quando admin atualiza menu
app.patch('/api/menu/:restaurantId', (req, res) => {
  // Salva no DB
  await Menu.update(req.body);
  
  // Broadcast para todas as telas
  io.to(`restaurant-${req.params.restaurantId}`)
    .emit('menuUpdated', { version: newVersion });
  
  res.json({ success: true });
});

// Frontend escuta
socket.on('menuUpdated', ({ version }) => {
  localStorage.removeItem(`menu-${restaurantId}`);
  refetch();
});
```

### Estratégia Recomendada: Validação Periódica

```typescript
// V1 Simples: Poll a cada 5 minutos verificando timestamp
setInterval(async () => {
  const response = await fetch(
    `/api/menu/${restaurantId}/metadata`,
    { cache: 'no-cache' } // Nunca usar cache para metadados
  );
  
  const { version: serverVersion } = await response.json();
  const localVersion = localStorage.getItem(`menu-version-${restaurantId}`);
  
  if (serverVersion !== localVersion) {
    // Revalidar immediately
    const { data } = await fetch(`/api/menu/${restaurantId}`).then(r => r.json());
    updateMenu(data);
  }
}, 5 * 60 * 1000); // 5 minutos
```

---

## 📡 Offline-First Architecture

### Fallback Strategy

```typescript
// src/shared/hooks/useMenuData.ts - com suporte offline
const useMenuData = (restaurantId: string) => {
  const [data, setData] = useState<MenuData | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    // 1. Tentar fetch online
    if (isOnline) {
      fetchMenuData(restaurantId)
        .then(setData)
        .catch(() => {
          // 2. Fallback: ler do cache local
          const cached = localStorage.getItem(`menu-${restaurantId}`);
          if (cached) setData(JSON.parse(cached));
        });
    } else {
      // 3. Offline: usar cache local
      const cached = localStorage.getItem(`menu-${restaurantId}`);
      if (cached) setData(JSON.parse(cached));
    }
    
    // 4. Listener para voltar online
    const handleOnline = () => {
      setIsOnline(true);
      refetch(); // Sincroniza quando volta
    };
    
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [restaurantId, isOnline]);
  
  return { data, isOnline, error: null };
};
```

### Service Worker para Cache Persistente

```typescript
// public/sw.js - Service Worker
const CACHE_NAME = 'menu-board-v1';
const API_CACHE = 'api-cache-v1';

// Installer: cacheamento preditivo
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/vite-client.js',
        // Pré-cache imagens populares
        '/images/logo.png',
        '/images/fallback.jpg'
      ]);
    })
  );
});

// Fetch: Network-First para API, Cache-First para estáticos
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (request.url.includes('/api/')) {
    // API: Network-first com fallback
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Atualiza cache em background
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, response.clone());
          });
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  } else {
    // Assets: Cache-first
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }
});
```

### IndexedDB para Armazenamento Grande

```typescript
// Para armazenar muitas imagens em HD local
class LocalImageCache {
  private db: IDBDatabase;
  
  async cacheImage(url: string, blob: Blob) {
    const tx = this.db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');
    
    await store.put({
      url,
      blob,
      timestamp: Date.now()
    });
  }
  
  async getImage(url: string): Promise<Blob | null> {
    const tx = this.db.transaction('images', 'readonly');
    const store = tx.objectStore('images');
    const item = await store.get(url);
    
    return item?.blob ?? null;
  }
  
  // Limpar cache antigo (> 7 dias)
  async cleanOldCache() {
    const tx = this.db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');
    const week = 7 * 24 * 60 * 60 * 1000;
    
    const allItems = await store.getAll();
    for (const item of allItems) {
      if (Date.now() - item.timestamp > week) {
        store.delete(item.url);
      }
    }
  }
}
```

### Fallback Chain

```
                    ┌─────────────────┐
                    │ Com Conexão?     │
                    └────────┬─────────┘
                             │
                    ┌────────▼────────┐
                    │ Buscar API      │
                    └────┬────────┬───┘
                    ✅ Sucesso     ❌ Erro
                         │             │
                    ┌────▼───┐    ┌────▼────────┐
                    │ Cache ✓ │    │ Cache Local?│
                    └────────┘    └──┬────────┬─┘
                                 ✅ Sim    ❌ Não
                                   │         │
                            ┌─────▼──┐   ┌──▼─────┐
                            │ Usar   │   │ Offline│
                            │ Cache  │   │ Message│
                            └────────┘   └────────┘
```

---

## �📈 Escalabilidade

### Dimensões de Crescimento

#### **1. Horizontal Scaling (Mais telas)**
```
Scenário: 2 telas → 1.000 telas

Cliente:  ✅ Sem mudanças (cada tela é independente)
Backend:  ⚠️  Precisa escalar
  - API instances: 1 → 3-5
  - Cache layer: Nenhum → Redis
  - Database: Single → Read replicas
  - CDN: Nenhum → CloudFront
```

#### **2. Vertical Scaling (Dados maiores)**
```
Scenário: 50 pratos/restaurante → 5.000 pratos/restaurante

Data Model:  ⚠️  Precisa otimizar
  - Adicionar paginação
  - Lazy load de imagens
  - Índices de database
  - GraphQL vs REST (queries específicas)

Frontend:    ✅ Zustand + React Query já suportam
Backend:     ⚠️  Precisa otimizar queries
```

#### **3. Feature Scaling**
```
Scenário: Playlist simples → Sistema de promoções + analytics

Arquitetura: ✅ Service layer já pronta para plugins
  - Adicionar PromoService
  - Adicionar AnalyticsService
  - Adicionar NotificationService
```

### Arquitetura para Crescimento

#### **1. Múltiplos Restaurantes**
```typescript
// Suporte nativo
const { settings } = useMenuData(restaurantId: string);

// Cada tela pode mostrar restaurante diferente
<App restaurantId="rest-001" />
<App restaurantId="rest-002" />
```

#### **2. Backend API**
Structure pronta em `ApiMenuService`:
```typescript
// GET /api/menu/{restaurantId}
// GET /api/media/{restaurantId}
// POST /api/menu/{restaurantId} (updates)
```

#### **3. Caching Estratégico**
- **Local Storage**: Cache de última sincronização
- **HTTP Cache**: Via headers `Cache-Control`
- **Service Worker**: (Futuro) Offline-first com sync background

#### **4. Code Splitting**
```typescript
// Vite já divide automaticamente:
// - vendor.js (React, libs)
// - index.js (app logic)
// - assets separados

// Para crescimento, adicionar lazy loading
const MenuBoard = lazy(() => import('./features/menu-board'));
const Playlist = lazy(() => import('./features/playlist'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/menu" element={<MenuBoard />} />
    <Route path="/playlist" element={<Playlist />} />
  </Routes>
</Suspense>
```

#### **5. Paginação de Dados (Para crescimento)**
```typescript
// API com cursor-based pagination
interface PaginationParams {
  cursor?: string;  // Último ID visto
  limit: number;    // 50 items por página
}

app.get('/api/menu/:restaurantId/items', async (req, res) => {
  const { cursor, limit = 50 } = req.query;
  
  let query = MenuItem.where('restaurantId', restaurantId);
  
  if (cursor) {
    query = query.where('id', '>', cursor);
  }
  
  const items = await query.limit(limit + 1).fetch();
  const hasMore = items.length > limit;
  
  res.json({
    items: items.slice(0, limit),
    nextCursor: items[limit - 1]?.id,
    hasMore
  });
});

// Frontend com React Query
const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: ['menu-items', restaurantId],
  queryFn: ({ pageParam }) => 
    fetchMenuItems(restaurantId, pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor
});
```

#### **6. Database Schema (Sugestão)**
```sql
-- Restaurantes
CREATE TABLE restaurants (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  logo_url VARCHAR(500),
  created_at TIMESTAMP
);

-- Menu
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants,
  name VARCHAR(200),
  display_order INT,
  image_url VARCHAR(500)
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY,
  category_id UUID REFERENCES menu_categories,
  name VARCHAR(200),
  description TEXT,
  price DECIMAL(10,2),
  image_url VARCHAR(500),
  display_order INT,
  is_highlighted BOOLEAN
);

-- Playlist
CREATE TABLE media_items (
  id UUID PRIMARY KEY,
  restaurant_id UUID REFERENCES restaurants,
  type ENUM('image', 'video'),
  url VARCHAR(500),
  title VARCHAR(200),
  duration_ms INT,
  display_order INT
);

-- Índices para performance
CREATE INDEX idx_restaurant_categories ON menu_categories(restaurant_id);
CREATE INDEX idx_category_items ON menu_items(category_id);
CREATE INDEX idx_restaurant_media ON media_items(restaurant_id);
CREATE INDEX idx_items_restaurant_active 
  ON menu_items(restaurant_id, is_active);

-- Para analytics/audit
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  restaurant_id UUID,
  action VARCHAR(50),  -- 'CREATE', 'UPDATE', 'DELETE'
  table_name VARCHAR(100),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  changed_by UUID,
  changed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_restaurant ON audit_logs(restaurant_id, changed_at);
```

---

## 📡 Como Lidar com 1.000 Telas Simultâneas

### Desafio
1.000 telas (TVs) de restaurantes diferentes rodando o mesmo app, atualizando independentemente.

### Solução em Camadas

#### **Frontend (Cliente)**
✅ **Já implementado:**
- State local (Zustand) reduz requisições desnecessárias
- Polling inteligente (fetch a cada X segundos, não em tempo real)
- Cache local (localStorage) evita redownload

✅ **Melhorias futuras:**
```typescript
// Service Worker para sync em background
// Web Workers para processamento pesado
// Lazy loading de imagens
// Video streaming adaptativo
```

#### **Backend/API**
```
┌─────────────────────────────────────┐
│  1000 Telas (Polling a cada 30s)    │
└────────────┬────────────────────────┘
             │
             ↓
    ┌────────────────────┐
    │   Load Balancer    │
    │  (Round Robin)     │
    └─────┬──────┬──────┬┘
          │      │      │
    ┌─────▼─┬────▼─┬────▼──┐
    │ API 1 │ API 2│ API 3 │  (Múltiplas instâncias Node/Python)
    └─────┬─┴────┬─┴────┬──┘
          │      │      │
          └──────┴──────┘
             ↓
        ┌─────────────────┐
        │  Cache Redis    │  (TTL: 5min)
        └────────┬────────┘
                 ↓
        ┌─────────────────┐
        │  Database       │  (PostgreSQL + replicação)
        │  - Read replicas│
        │  - Indexes      │
        └─────────────────┘
```

#### **Networking**
```
Estratégia 1: Polling Otimizado
└─ A cada 30 segundos, cliente faz:
   GET /api/menu/{restaurantId}?lastModified={timestamp}
   └─ Retorna 304 Not Modified se nada mudou (sem payload)

Estratégia 2: WebSocket (Futuro)
└─ Conexão persistente para atualizações real-time
└─ Broadcast quando menu muda
└─ Reduz latência de atualizações

Estratégia 3: Message Queue
└─ Kafka/RabbitMQ para sincronização de atualizações
└─ Garantia de entrega ordenada
```

#### **Monitoramento & Performance**

```bash
# Requisições esperadas por hora:
1000 telas × 2 requisições/min = 2.000 req/min = 120.000 req/hora

# Com cache Redis e polling inteligente:
- 95% de respostas são 304 (6KB vs 1MB)
- Reduz banda em 99%
- Qualidade percebida: excelente (< 30s de latência)
```

#### **Recursos Necessários**

| Componente | Configuração | Custo (AWS) |
|-----------|-------------|-----------|
| API (3x t3.medium) | 2GB RAM, 2vCPU | ~$90/mês |
| Redis | cache-t2.micro | ~$16/mês |
| PostgreSQL | db.t3.small + read replica | ~$150/mês |
| Load Balancer | ALB | ~$22/mês |
| CDN (images) | CloudFront | ~$50/mês (estimado) |
| **Total** | | **~$330/mês** |

---

## ⚖️ Trade-offs

### 1. **React vs Vanilla JS**
| React | Vanilla JS |
|-------|-----------|
| ✅ Componentes reutilizáveis | ✅ Sem bundle overhead |
| ✅ Hot reload (DX melhorada) | ✅ Performance máxima |
| ❌ +140KB bundle (gzip) | ❌ Difícil de manter |
| ❌ Curva de aprendizado | ❌ Sem type safety fácil |

**Decisão**: React porque escalabilidade de features > performance a nível de bytes.

---

### 2. **Vite vs Webpack**
| Vite | Webpack |
|------|---------|
| ✅ 10x mais rápido (dev) | ✅ Mais maduro |
| ✅ ES modules nativos | ✅ Mais plugins disponíveis |
| ❌ Ecossistema menor | ❌ Slow (dev server) |
| ❌ Menos estável em edge cases | ❌ Config complexa |

**Decisão**: Vite porque DX é crítico em startups; build é rápido (1.5s).

---

### 3. **Zustand vs Redux**
| Zustand | Redux |
|---------|-------|
| ✅ Boilerplate mínimo | ✅ DevTools maduros |
| ✅ Aprendizado rápido | ✅ Comunidade enorme |
| ❌ Menos ferramentas | ❌ Muita boilerplate |
| ❌ Debugging mais difícil | ❌ Curva aprendizado alta |

**Decisão**: Zustand porque estado é simples (só configurações); Redux seria _over-engineering_.

---

### 4. **Styled-components vs Tailwind**
| Styled-Components | Tailwind |
|------------------|----------|
| ✅ Type-safe CSS | ✅ Utility-first (rápido) |
| ✅ Tema dinâmico fácil | ✅ Bundle menor |
| ❌ Runtime overhead | ❌ HTML poluído |
| ❌ Debugging CSS complexo | ❌ Aprender tudo no início |

**Decisão**: Styled-components porque tema dinâmico (dark/light) é importante; TV pode mudar tema.

---

### 5. **Polling vs WebSocket**
| Polling (Atual) | WebSocket |
|-----------------|-----------|
| ✅ Simples (HTTP GET) | ✅ Tempo real (<100ms) |
| ✅ Funciona com proxies | ✅ Conexão persistente |
| ❌ Latência ~30s | ❌ Mais conexões abertas |
| ❌ Mais requisições | ❌ Scaling requer HAProxy |

**Decisão**: Polling agora (~30s latência é aceitável); WebSocket em v2 se necessário.

---

### 6. **Mock Service vs Fake Backend**
| Mock Service (Atual) | Fake Backend (Express) |
|---------------------|----------------------|
| ✅ Sem dependências | ✅ Mais realista |
| ✅ Sem processo extra | ✅ Testa latência |
| ❌ Síncrono | ❌ Extra setup |
| ❌ Não testa rede | ❌ Debugar é mais complexo |

**Decisão**: Mock service agora; migrar para ApiMenuService quando backend pronto.

---

## �️ Arquitetura de Backend (Node.js + TypeScript)

### Stack Recomendado

```bash
# Runtime & Framework
Node.js 18+ LTS
Express.js (ou Fastify para melhor performance)
TypeScript strict mode

# Database
PostgreSQL (relacional, multi-tenant suportado)
Redis (cache, real-time sync)

# Real-time
Socket.io (WebSocket com fallback)
Bull (job queue para tarefas assíncronas)

# DevOps
Docker (containerização)
Docker Compose (desenvolvimento)
```

### Clean Architecture (Estrutura Recomendada)

```
backend/
├── src/
│   ├── config/              # Configurações
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   │
│   ├── entities/            # Domain models (sem dependências externas)
│   │   ├── Restaurant.ts
│   │   ├── MenuCategory.ts
│   │   ├── MenuItem.ts
│   │   ├── LayoutConfig.ts
│   │   └── MediaItem.ts
│   │
│   ├── repositories/        # Data access layer (abstração de DB)
│   │   ├── IRestaurantRepository.ts       (interface)
│   │   ├── RestaurantRepository.ts        (implementação PostgreSQL)
│   │   ├── IMenuRepository.ts
│   │   ├── MenuRepository.ts
│   │   └── ICacheRepository.ts            (Redis)
│   │
│   ├── useCases/            # Business logic (serviços)
│   │   ├── GetMenuUseCase.ts
│   │   ├── UpdateLayoutUseCase.ts
│   │   ├── SyncTVsUseCase.ts
│   │   └── SyncMediaUseCase.ts
│   │
│   ├── controllers/         # HTTP handlers
│   │   ├── RestaurantController.ts
│   │   ├── MenuController.ts
│   │   ├── LayoutController.ts
│   │   └── AuthController.ts
│   │
│   ├── middleware/          # Express middleware
│   │   ├── authMiddleware.ts         (JWT validation)
│   │   ├── tenantMiddleware.ts       (Multi-tenant context)
│   │   ├── errorHandler.ts
│   │   └── logging.ts
│   │
│   ├── routes/              # API routes
│   │   ├── auth.routes.ts
│   │   ├── restaurants.routes.ts
│   │   ├── menus.routes.ts
│   │   ├── layouts.routes.ts
│   │   └── index.ts
│   │
│   ├── services/            # External integrations
│   │   ├── CacheService.ts           (Redis operations)
│   │   ├── WebSocketService.ts       (Socket.io events)
│   │   ├── NotificationService.ts    (Push para TVs)
│   │   └── FileService.ts            (S3, GCS, etc)
│   │
│   ├── types/               # Shared TypeScript types
│   │   ├── index.ts
│   │   └── express.d.ts     (type augmentation)
│   │
│   ├── utils/               # Helpers
│   │   ├── logger.ts
│   │   ├── jwt.ts
│   │   ├── crypto.ts
│   │   └── validation.ts
│   │
│   ├── socket/              # WebSocket handlers
│   │   ├── handlers/
│   │   │   ├── menuUpdated.handler.ts
│   │   │   ├── layoutUpdated.handler.ts
│   │   │   └── tvConnected.handler.ts
│   │   └── index.ts
│   │
│   └── app.ts               # Express app setup
│
├── migrations/              # Database migrations
│   ├── 001_create_tables.sql
│   ├── 002_add_indexes.sql
│   └── 003_add_cache_table.sql
│
├── .env.example
├── docker-compose.yml
└── package.json
```

### API REST Endpoints

#### **Autenticação**
```bash
POST   /api/v1/auth/register           # Registrar restaurante
POST   /api/v1/auth/login              # Login (retorna JWT)
POST   /api/v1/auth/refresh-token      # Refresh JWT
POST   /api/v1/auth/logout             # Logout
```

#### **Restaurantes (Multi-tenant)**
```bash
GET    /api/v1/restaurants/:id         # Info do restaurante
PATCH  /api/v1/restaurants/:id         # Atualizar config
GET    /api/v1/restaurants/:id/config  # Layout + theme + settings
```

#### **Menu (com versionamento)**
```bash
GET    /api/v1/restaurants/:id/menu    # Menu completo
GET    /api/v1/restaurants/:id/menu?version=abc123   # Versão específica
GET    /api/v1/restaurants/:id/categories
POST   /api/v1/restaurants/:id/categories
PATCH  /api/v1/restaurants/:id/categories/:catId

GET    /api/v1/restaurants/:id/items
POST   /api/v1/restaurants/:id/items
PATCH  /api/v1/restaurants/:id/items/:itemId
```

#### **Layout (Versionado)**
```bash
GET    /api/v1/restaurants/:id/layout              # Layout atual
GET    /api/v1/restaurants/:id/layout/history      # Histórico de versões
PATCH  /api/v1/restaurants/:id/layout              # Atualizar (cria nova versão)
GET    /api/v1/restaurants/:id/layout/:version     # Rollback para versão old

# Payload
{
  "type": "grid",
  "columns": 2,
  "itemsPerPage": 8,
  "showPrices": true,
  "showImages": true,
  "theme": "modern",
  "version": "abc123",  // UUID
  "createdAt": "2026-03-01T10:00:00Z",
  "createdBy": "admin_001"
}
```

#### **Sincronização de TVs**
```bash
GET    /api/v1/restaurants/:id/tvs              # List TVs
POST   /api/v1/restaurants/:id/tvs/register     # TV se conecta
PATCH  /api/v1/restaurants/:id/tvs/:tvId        # Update TV status
GET    /api/v1/restaurants/:id/tvs/:tvId/status # TV health check
```

#### **Mídia**
```bash
GET    /api/v1/restaurants/:id/media
POST   /api/v1/restaurants/:id/media/upload     # Upload imagem/vídeo
PATCH  /api/v1/restaurants/:id/media/:mediaId
DELETE /api/v1/restaurants/:id/media/:mediaId
```

#### **WebSocket (Real-time)**
```typescript
// Cliente conecta
socket.connect(`wss://api.example.com/v1/ws?token=JWT`)

// Server emite eventos quando config muda
socket.on('menuUpdated', (data) => {
  // { version, timestamp, restaurantId }
})

socket.on('layoutUpdated', (data) => {
  // { version, timestamp, columns, theme }
})

socket.on('mediaUpdated', (data) => {
  // { mediaItems, timestamp }
})

// Cliente envia heartbeat
socket.emit('tvHeartbeat', { tvId, status: 'online', ...metrics })
```

---

### Modelagem de Dados (Database Schema)

#### **Tabela: restaurants** (Multi-tenant base)
```sql
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,          -- "bella-vista"
  name VARCHAR(255) NOT NULL,
  owner_id UUID NOT NULL REFERENCES users(id),
  subscription_tier VARCHAR(50),              -- 'basic', 'pro', 'enterprise'
  subscription_active BOOLEAN DEFAULT true,
  config JSONB,                               -- Configurações gerais
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_restaurant_owner ON restaurants(owner_id);
CREATE INDEX idx_restaurant_slug ON restaurants(slug);
```

#### **Tabela: menu_categories**
```sql
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INT,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  version UUID,                               -- Para versionamento
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_category_restaurant ON menu_categories(restaurant_id, is_active);
CREATE INDEX idx_category_order ON menu_categories(restaurant_id, display_order);
```

#### **Tabela: menu_items**
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  category_id UUID NOT NULL REFERENCES menu_categories(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR(500),
  badges JSONB,                               -- ["🌱 Vegetariano", "⭐ Chef"]
  is_highlighted BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_item_restaurant_category 
  ON menu_items(restaurant_id, category_id, is_active);
```

#### **Tabela: layout_configs** (Versionada)
```sql
CREATE TABLE layout_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  version UUID UNIQUE NOT NULL,               -- Cada update criar versão nova
  type VARCHAR(50),                           -- 'grid', 'list', 'highlight'
  columns INT,
  items_per_page INT,
  show_prices BOOLEAN,
  show_descriptions BOOLEAN,
  show_images BOOLEAN,
  show_badges BOOLEAN,
  theme VARCHAR(100),                         -- 'modern', 'elegant', etc
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true              -- Current version
);

CREATE INDEX idx_layout_restaurant_active 
  ON layout_configs(restaurant_id, is_active);
CREATE INDEX idx_layout_version 
  ON layout_configs(restaurant_id, version);
```

#### **Tabela: media_items**
```sql
CREATE TABLE media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  type VARCHAR(50),                           -- 'image', 'video'
  url VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  duration_ms INT,
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_media_restaurant ON media_items(restaurant_id, is_active);
```

#### **Tabela: tv_devices** (Tracking de TVs)
```sql
CREATE TABLE tv_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  name VARCHAR(255),                          -- "TV Salão Principal"
  device_token VARCHAR(500) UNIQUE,           -- Para identificar cliente
  ip_address INET,
  last_seen TIMESTAMP,
  status VARCHAR(50),                         -- 'online', 'offline', 'error'
  version VARCHAR(50),                        -- App version
  metrics JSONB,                              -- CPU, memory, load time
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tv_restaurant ON tv_devices(restaurant_id);
CREATE INDEX idx_tv_status ON tv_devices(restaurant_id, status);
```

#### **Tabela: cache_invalidation** (Smart invalidation)
```sql
CREATE TABLE cache_invalidation (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id),
  key VARCHAR(255),                           -- 'menu:rest-001', 'layout:rest-001'
  version UUID,                               -- Versão que invalidou
  invalidated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cache_restaurant ON cache_invalidation(restaurant_id, invalidated_at DESC);
```

---

### Sistema Multi-Tenant (TypeScript)

#### **Middleware: Tenant Context**
```typescript
// src/middleware/tenantMiddleware.ts

declare global {
  namespace Express {
    interface Request {
      tenantId: string;
      userId: string;
      token: string;
    }
  }
}

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Extrair tenant ID (pode vir de JWT, subdomain, header)
  const token = req.headers.authorization?.split(' ')[1];
  const payload = jwt.verify(token, SECRET) as { sub: string; restaurantId: string };
  
  // 2. Validar que recurso pertence ao tenant
  const resourceRestaurantId = req.params.id;
  if (payload.restaurantId !== resourceRestaurantId) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  // 3. Set context para use em toda request
  req.tenantId = payload.restaurantId;
  req.userId = payload.sub;
  
  // 4. (Futuro) Set context do Postgres para RLS
  // await db.query('SET app.current_restaurant = $1', [payload.restaurantId]);
  
  next();
};
```

#### **Repository Pattern (isolado por tenant)**
```typescript
// src/repositories/MenuRepository.ts

export interface IMenuRepository {
  getMenu(restaurantId: string): Promise<MenuData>;
  updateCategory(restaurantId: string, category: MenuCategory): Promise<void>;
  getMenuByVersion(restaurantId: string, version: string): Promise<MenuData>;
}

export class MenuRepository implements IMenuRepository {
  constructor(private db: Database) {}
  
  async getMenu(restaurantId: string): Promise<MenuData> {
    // Query isolada por restaurantId
    const categories = await this.db.query(
      'SELECT * FROM menu_categories WHERE restaurant_id = $1 AND is_active = true',
      [restaurantId]
    );
    
    const items = await this.db.query(
      'SELECT * FROM menu_items WHERE restaurant_id = $1 AND is_active = true',
      [restaurantId]
    );
    
    return { categories, items };
  }
  
  async updateCategory(restaurantId: string, category: MenuCategory): Promise<void> {
    // Validar que categoria pertence ao restaurant
    const existing = await this.db.query(
      'SELECT id FROM menu_categories WHERE id = $1 AND restaurant_id = $2',
      [category.id, restaurantId]
    );
    
    if (!existing.rows.length) {
      throw new Error('Category not found or unauthorized');
    }
    
    await this.db.query(
      'UPDATE menu_categories SET name = $1, description = $2, updated_at = NOW() WHERE id = $3',
      [category.name, category.description, category.id]
    );
  }
}
```

---

### Sistema de Config Dinâmica (JSON-driven)

#### **Persistência de Layout**
```typescript
// src/useCases/UpdateLayoutUseCase.ts

export class UpdateLayoutUseCase {
  constructor(
    private layoutRepository: ILayoutRepository,
    private cacheService: CacheService,
    private socketService: WebSocketService
  ) {}
  
  async execute(
    restaurantId: string,
    newLayout: LayoutConfig
  ): Promise<{ version: string; layout: LayoutConfig }> {
    // 1. Criar nova versão
    const version = uuid();
    const layoutWithVersion = {
      ...newLayout,
      version,
      createdAt: new Date(),
      isActive: false  // Nova versão começa inactive
    };
    
    // 2. Salvar no banco
    await this.layoutRepository.create(restaurantId, layoutWithVersion);
    
    // 3. Invalidar cache
    await this.cacheService.invalidate(`layout:${restaurantId}`);
    
    // 4. Ativar nova versão
    await this.layoutRepository.setActive(restaurantId, version);
    
    // 5. Notificar todas as TVs do restaurante (WebSocket)
    this.socketService.broadcastToRestaurant(restaurantId, 'layoutUpdated', {
      version,
      layout: newLayout,
      timestamp: new Date().toISOString()
    });
    
    return { version, layout: newLayout };
  }
  
  // Rollback para versão anterior
  async rollback(restaurantId: string, version: string): Promise<void> {
    const layout = await this.layoutRepository.getByVersion(restaurantId, version);
    if (!layout) throw new Error('Version not found');
    
    await this.layoutRepository.setActive(restaurantId, version);
    await this.cacheService.invalidate(`layout:${restaurantId}`);
    
    this.socketService.broadcastToRestaurant(restaurantId, 'layoutRolledBack', {
      version,
      timestamp: new Date().toISOString()
    });
  }
}
```

---

### Cache com Redis (Smart Invalidation)

#### **Estratégia Multi-nível**
```typescript
// src/services/CacheService.ts

export class CacheService {
  constructor(private redis: Redis) {}
  
  // Cache keys pattern
  private getKey(type: string, restaurantId: string) {
    return `${type}:${restaurantId}`;
  }
  
  async getMenu(restaurantId: string): Promise<MenuData | null> {
    const key = this.getKey('menu', restaurantId);
    
    // L1: Redis (muito rápido)
    const cached = await this.redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
    
    // L2: Banco de dados
    const menu = await this.menuRepository.getMenu(restaurantId);
    
    // Guardar em cache (TTL: 5 minutos)
    await this.redis.setex(key, 5 * 60, JSON.stringify(menu));
    
    return menu;
  }
  
  async invalidate(pattern: string): Promise<void> {
    // Deletetar por pattern
    // Exemplo: invalidate('menu:rest-001') ou invalidate('menu:*')
    const keys = await this.redis.keys(pattern);
    
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
    
    // Log para audit
    await this.cacheInvalidationRepository.log({
      pattern,
      invalidatedAt: new Date(),
      reason: 'Manual update'
    });
  }
  
  // Invalidar tudo de um restaurante (quando sub cancela)
  async invalidateRestaurant(restaurantId: string): Promise<void> {
    await this.invalidate(`*:${restaurantId}`);
  }
  
  // Cache com versão (para A/B testing layouts)
  async getCacheKey(type: string, restaurantId: string, version?: string): Promise<string> {
    if (version) {
      return `${type}:${restaurantId}:${version}`;
    }
    
    // Usar versão ativa
    const activeVersion = await this.redis.get(`${type}:${restaurantId}:active-version`);
    return `${type}:${restaurantId}:${activeVersion}`;
  }
}
```

---

### Sincronização com Múltiplas TVs (WebSocket + Polling Hybrid)

#### **Estratégia Híbrida**
```typescript
// src/services/WebSocketService.ts

export class WebSocketService {
  private io: Server;
  
  constructor(io: Server) {
    this.io = io;
    this.setupHandlers();
  }
  
  private setupHandlers() {
    this.io.on('connection', (socket) => {
      const { restaurantId, tvId } = socket.handshake.auth;
      
      // 1. Registrar TV em room
      socket.join(`restaurant:${restaurantId}`);
      socket.join(`tv:${tvId}`);
      
      // 2. Salvar TV como online
      tvRepository.updateStatus(tvId, 'online');
      
      // 3. Listeners de eventos
      socket.on('tvHeartbeat', (data) => {
        this.handleHeartbeat(tvId, data);
      });
      
      socket.on('menuLoaded', (data) => {
        this.handleMenuLoaded(tvId, restaurantId, data);
      });
      
      socket.on('error', (error) => {
        this.handleTVError(tvId, error);
      });
      
      socket.on('disconnect', () => {
        tvRepository.updateStatus(tvId, 'offline');
        this.io.to(`restaurant:${restaurantId}`)
          .emit('tvDisconnected', { tvId });
      });
    });
  }
  
  // Admin atualiza menu → broadcast para todas as TVs
  broadcastMenuUpdate(restaurantId: string, menu: MenuData) {
    this.io.to(`restaurant:${restaurantId}`)
      .emit('menuUpdated', {
        menu,
        timestamp: Date.now(),
        requiresRefresh: true
      });
  }
  
  // Admin atualiza layout → broadcast + versioning
  broadcastLayoutUpdate(restaurantId: string, layout: LayoutConfig, version: string) {
    this.io.to(`restaurant:${restaurantId}`)
      .emit('layoutUpdated', {
        layout,
        version,
        timestamp: Date.now()
      });
  }
  
  // Fallback: polling opcional para TVs que perdem conexão
  async syncOfflineTV(tvId: string, restaurantId: string) {
    const lastSync = await tvRepository.getLastSync(tvId);
    const updates = await updateRepository.getSince(restaurantId, lastSync);
    
    // Aplicar updates em ordem
    for (const update of updates) {
      if (update.type === 'menu') {
        await apply(update.menu);
      } else if (update.type === 'layout') {
        await apply(update.layout);
      }
    }
  }
}
```

---

### Escalabilidade Arquitetural

#### **Load Balancer Setup**
```
┌─────────────────────────────────────────────────────┐
│      Admin + 1000 TVs                               │
└──────┬──────────────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────┐
│  AWS ALB / NGINX LB          │
│  (Round Robin)               │
└──────┬──────────────────────┬┘
       │                      │
   ┌───▼──────────┐      ┌────▼─────────┐
   │  API Server 1│      │ API Server 2  │
   │  (Node.js)   │      │ (Node.js)     │
   │  Instance: 4│      │ Instance: 4   │
   │  Memory: 4GB │      │ Memory: 4GB   │
   └───┬──────────┘      └────┬─────────┘
       │                      │
       └──────────┬───────────┘
                  │
         ┌────────▼────────┐
         │  Redis Cluster  │
         │  Cache + Pub/Sub│
         │  3 Nodes        │
         └────────┬────────┘
                  │
         ┌────────▼────────────┐
         │ PostgreSQL Replica  │
         │ - Primary (Write)   │
         │ - Replica (Read)    │
         │ - Replica (Backup)  │
         └────────────────────┘
```

#### **Estimativas de Performance (1000 TVs)**

```
Requisições esperadas:
- 1000 TVs × 1 poll/min = 1000 req/min = 16,7 req/s
- WebSocket: 1000 conexões persistent (negligenciável)
- Admin: ~10 req/min

Total: ~27 req/s (bem baixo!)

Capacidade de API (1 Node):
- ~500 req/s com Fastify
- CPU: <5% (quad-core)
- Memória: 1.5 GB / 4GB disponível

Conclusão: 1 servidor é suficiente! 3-4 para redundância.

Redis:
- Cache hit rate: ~95%
- L1 lookups: ~5 req/s
- Memory: ~2GB (para 1000 restaurantes × 100 configs)

PostgreSQL:
- Índices bem planejados
- Read replicas distribuem carga
- Capacity: 1000+ transações/s
```

---

### Próximas Implementações (Backend Roadmap)

#### **v1.0 (MVP Backend)**
- [x] Docker setup (postgres + redis)
- [x] API REST básica (CRUD menu)
- [x] Auth (JWT)
- [x] Multi-tenant middleware
- [ ] WebSocket inicial
- [ ] Layout versionamento

#### **v2.0 (Production Ready)**
- [ ] Rate limiting (por TV, por usuário)
- [ ] Compressão de responses (gzip)
- [ ] Observability (Datadog, Sentry)
- [ ] Audit logs
- [ ] Backup automático

#### **v3.0 (Enterprise)**
- [ ] SSO (SAML, OAuth2)
- [ ] Fine-grained RBAC
- [ ] Data replication (multi-region)
- [ ] Advanced analytics
- [ ] AI recommendations

---

## �🔄 Próximos Passos Sugeridos

### Curto Prazo (v1.1)
- [ ] Implementar WebSocket para atualizações real-time
- [ ] Adicionar autenticação (JWT)
- [ ] Dashboard admin para gerenciar menus
- [ ] Analytics (quais categorias são mais vistas)

### Médio Prazo (v2.0)
- [ ] Integração com Tauri (desktop app)
- [ ] Suporte multi-idioma (i18n)
- [ ] Offline-first com Service Worker
- [ ] Comparação de preços dynamicamente

### Longo Prazo (v3.0)
- [ ] Integração com sistemas POS (Point of Sale)
- [ ] QR Code para pedidos
- [ ] ML para recomendações personalizadas
- [ ] Integração com redes sociais (promoções)

---

## 📝 Licença
MIT

## 👥 Contribuadores
Digital Menu Board Team

---

**Última atualização**: Março 2026
**Versão**: 1.0.0
