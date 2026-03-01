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

## 📈 Escalabilidade

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
```

#### **5. Database Schema (Sugestão)**
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

-- Índices
CREATE INDEX idx_restaurant_categories ON menu_categories(restaurant_id);
CREATE INDEX idx_category_items ON menu_items(category_id);
CREATE INDEX idx_restaurant_media ON media_items(restaurant_id);
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

## 🔄 Próximos Passos Sugeridos

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
