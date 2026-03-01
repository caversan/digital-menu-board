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
npm run tauri dev

# Build para produção
npm run tauri build
```

**⚠️ Saída de Emergência**: Pressione a tecla **Q** para fechar a aplicação no modo kiosk.

## ✨ Funcionalidades Implementadas

### Dados de Mock
O projeto agora vem com dados de mock completos incluindo:
- **Restaurante**: Bella Vista Ristorante
- **Categorias**: Entradas, Pratos Principais, Sobremesas, Bebidas
- **Muitos itens**: 10+ itens por categoria com imagens, preços, descrições e badges
- **Mídia**: 3+ imagens de promoção que aparecem em rotação

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
│   │   └── components/MenuBoard.tsx
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
**Última atualização**: 28 de Fevereiro de 2026
