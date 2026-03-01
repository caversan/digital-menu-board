# 🍽️ Digital Menu Board - Guia Rápido

## Iniciando o Projeto

```bash
npm install
npm run dev
```

O servidor iniciará em `http://localhost:3001` (ou outra porta disponível).

### Modo Kiosk (Tauri)

```bash
# Modo desenvolvimento
npm run tauri-dev

# Build para produção
npm run tauri build
```

**⚠️ Saída de Emergência**: Pressione a tecla **Q** para fechar a aplicação no modo kiosk.

## ✨ Funcionalidades Implementadas

### Layout Horizontal com Produto em Destaque
- **Layout 50/50**: Em modo landscape, a tela é dividida em 2 colunas
  - Coluna esquerda: Lista de produtos em coluna única
  - Coluna direita: Produto destacado (primeiro com `isHighlighted` ou primeiro da lista)
- **Backgrounds por Categoria**: Cada categoria tem imagem de fundo personalizada com overlay
- **Header Italiano**: Fundo vermelho (#ac0000) com faixas verde e branca (bandeira da Itália)

### Dados de Mock
O projeto agora vem com dados de mock completos incluindo:
- **Restaurante**: Bella Vista Ristorante
- **Categorias**: Entradas, Pratos Principais, Sobremesas, Bebidas
- **Muitos itens**: 10+ itens por categoria com imagens, preços, descrições e badges
- **Mídia**: 3+ imagens de promoção que aparecem em rotação
- **Backgrounds**: 4 imagens de fundo (Unsplash) para cada categoria

### Playlist Automática
A aplicação exibe automaticamente:
1. Cada categoria durante 8 segundos
2. Mídia promocional durante 3 segundos
3. Cicla continuamente entre categorias e mídias

### Componentes Reutilizáveis
- ✅ Button com múltiplas variantes
- ✅ Card com subcomponentes
- ✅ Badge para destacar itens
- ✅ Loading com múltiplas variantes
- ✅ Error Boundary para tratamento de erros

### Gerenciamento de Estado
- ✅ Zustand store com persistência em localStorage
- ✅ Hooks personalizados (useMenuData, useOnline, useLocalStorage, etc.)
- ✅ Service layer com suporte a múltiplas implementações
- ✅ Logging estruturado

### Tema
- Tema moderno (padrão) com cores vivas
- Suporta múltiplos temas (elegante, vibrant, minimalist)
- Totalmente customizável

## 🐛 Debug

### Console Logs
O projeto exibe logs detalhados no console do navegador:
- 🔄 Carregamento de dados
- ✅ Dados carregados com sucesso
- 📋 Settings criados
- ✅ Logo carregado
- ❌ Erros

### Debug Panel
Pressione `Ctrl+D` em desenvolvimento para ver o painel de debug com:
- Estado da playlist
- Categoria atual
- Mídia atual
- Progresso e tempo decorrido
- Botões: Play/Pause, Anterior, Próximo, Reiniciar

### Saindo do Modo Kiosk
No modo Tauri kiosk, pressione a tecla **Q** para fechar a aplicação.

> ⚠️ **Nota**: Este é um atalho de emergência para sair do modo fullscreen.
> Use apenas quando necessário para manutenção ou atualização do sistema.

### Network
Em desenvolvimento, há um delay simulado de rede:
- Menu: 800ms
- Mídia: 500ms
- Chance de erro simulado: 5%

## 📁 Estrutura de Diretórios

```
src/
├── App.tsx                    # Componente raiz
├── main.tsx                   # Ponto de entrada
├── features/
│   ├── menu-board/           # Feature de menu
│   │   ├── components/
│   │   │   ├── MenuBoard.tsx            # Container principal
│   │   │   ├── MenuItemCard.tsx         # Card de produto
│   │   │   ├── FeaturedProductCard.tsx  # Card de destaque
│   │   │   └── MenuBoard.styles.ts      # Estilos
│   │   └── hooks/
│   └── playlist/             # Feature de playlist
│       └── DigitalSignagePlayer.tsx
├── shared/
│   ├── components/           # Componentes reutilizáveis
│   ├── hooks/                # Hooks customizados
│   ├── services/             # Service layer
│   ├── store/                # Zustand store
│   ├── themes/               # Temas e estilos globais
│   ├── types/                # Tipos TypeScript
│   └── utils/                # Utilitários e logging
├── mock/                      # Dados de mock
│   └── images/               # Imagens e backgrounds
│       ├── bg-entradas.jpg
│       ├── bg-pratos.jpg
│       ├── bg-sobremesas.jpg
│       └── bg-bebidas.jpg
└── src-tauri/                # Tauri desktop app
    ├── icons/                # Ícones da aplicação
    ├── src/                  # Backend Rust
    └── tauri.conf.json       # Configuração Tauri
```
│   ├── services/             # Service layer
│   ├── store/                # Zustand store
│   ├── themes/               # Temas e estilos globais
│   ├── types/                # Tipos TypeScript
│   └── utils/                # Utilitários e logging
└── mock/                      # Dados de mock
```

## 🎨 Customização

### Mudar Tema
Em `src/shared/hooks/useMenuData.ts`, altere a importação:

```typescript
import { elegantTheme, vibrantTheme } from '../themes/presets';

// E use:
theme: elegantTheme,  // ou vibrantTheme, minimalistTheme
```

### Adicionar Mais Dados de Mock
Edite `src/mock/MockMenuService.ts`:
- Adicione mais categorias em `mockRestaurantData.categories`
- Adicione mais itens em `mockRestaurantData.items`
- Adicione mais mídias em `mockMediaItems`

### Mudar Timers de Playlist
Em `src/shared/hooks/useMenuData.ts`:

```typescript
categoryDisplayTime: 8000,  // ms para mostrar cada categoria
mediaDisplayTime: 3000,     // ms para mostrar cada mídia
```

## 🚀 Próximas Melhorias

- [ ] Testes unitários com Vitest
- [ ] Storybook para documentação de componentes
- [ ] Integração com API real
- [ ] PWA com suporte offline
- [ ] Internationalization (i18n)
- [ ] Analytics e rastreamento de eventos
- [ ] Performance monitoring

## 📝 Changelog

### v1.1.0 - 1 de Março de 2026
- ✅ **Layout Horizontal**: Divisão 50/50 com produto em destaque
- ✅ **Backgrounds por Categoria**: 4 imagens de fundo do Unsplash
- ✅ **Header Italiano**: Faixas verde, branca e vermelha (bandeira da Itália)
- ✅ **FeaturedProductCard**: Novo componente para produto destacado
- ✅ **Tauri Icons**: Geração automática de ícones para todas as plataformas
- ✅ **Merge feat/tauri-standalone**: Integração completa do modo kiosk

### v1.0.0 - 28 de Fevereiro de 2026
- ✅ Release inicial com todas as funcionalidades básicas
- ✅ Sistema de playlist automática
- ✅ 4 temas prontos
- ✅ Componentes compartilhados
- ✅ Mock service completo

## 📝 Notas

- O projeto usa TypeScript para type safety
- Styled-components para estilização tipada
- Zustand com persistência em localStorage
- Vite para build rápido e desenvolvimento
- ESLint para code quality

## ⚡ Performance

- Hardwa acceleration ativado em GlobalStyles
- Cache no MockMenuService
- Lazy loading de imagens
- Otimização de re-renders com React.memo onde apropriado

---

**Versão**: 1.0.0  
**Última atualização**: 1 de Março de 2026
