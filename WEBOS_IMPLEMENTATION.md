# WebOS LG Implementation Guide

## 📺 Overview

Este documento descreve como o Digital Menu Board foi implementado para LG webOS TVs (versão 6+, suporte para TVs 2018+) com **controle remoto restrito a APENAS a função de SAÍDA/FECHAMENTO**.

**Versão:** 1.0.0  
**Branch:** `feat/webos-standalone`  
**Status:** ✅ Ready for Testing

---

## 🎯 Objetivo

Transformar o Digital Menu Board em uma aplicação webOS com as seguintes características:

✅ Suporte para webOS 6, 7, 8, 9 e 10  
✅ Compatível com LG TVs 2018 em diante  
✅ **Controle remoto: BLOQUEADO**  
✅ **Única ação permitida: SAÍDA/FECHAMENTO (ESC + Back Button)**  
✅ Modo Kiosk (restrições de sistema)  
✅ Otimizações para TV (fontes maiores, contraste alto, memória reduzida)  
✅ CI/CD ready (build scripts automático)

---

## 📂 Estrutura de Arquivos WebOS

```
digital-menu-board/
├── webos/
│   ├── appinfo.json                 # Metadados webOS (obrigatório)
│   └── icon.png                     # Ícone 130x130 (recomendado)
├── src/webos/
│   ├── index.ts                     # Exportações módulo webOS
│   ├── RemoteControl.ts             # Controle remoto (EXIT-only)
│   ├── webos-api.ts                 # APIs nativas webOS
│   └── webos-utils.ts               # Utilitários para TV
├── webos-build.sh                   # Script build (bash)
├── webos-build.ps1                  # Script build (PowerShell Windows)
└── WEBOS_IMPLEMENTATION.md          # Este arquivo
```

---

## 🔧 Instalação e Setup

### 1. Instalar webOS SDK

**macOS:**
```bash
brew install webostv-cli
npm install -g @webos-tools/ares-cli
```

**Linux (Ubuntu/Debian):**
```bash
# Download do site LG ou:
npm install -g @webos-tools/ares-cli
```

**Windows:**
```powershell
npm install -g @webos-tools/ares-cli
# Ou baixar do site LG webOS TV SDK
```

### 2. Registrar TV

```bash
ares-setup-device --add tv
# Seguir prompts:
# - Device Name: tv
# - Device IP: [IP da TV]
# - SSH Port: 22 (default)
# - Username: prisoner
# - Password: [deixar vazio]
```

### 3. Instalar dependências

```bash
npm install
```

---

## 🚀 Build e Deployment

### Opção 1: Script Automático (Recomendado)

**Windows (PowerShell):**
```powershell
# Build completo
.\webos-build.ps1 full tv

# Ou comandos individuais:
.\webos-build.ps1 build      # Apenas build
.\webos-build.ps1 package    # Build + empacota
.\webos-build.ps1 install tv # Instala na TV
.\webos-build.ps1 launch tv  # Lança app
.\webos-build.ps1 debug tv   # Abre DevTools
.\webos-build.ps1 logs tv    # Mostra logs
```

**macOS/Linux (Bash):**
```bash
# Build completo
bash ./webos-build.sh full tv

# Ou comandos individuais:
bash ./webos-build.sh build      # Apenas build
bash ./webos-build.sh package    # Build + empacota
bash ./webos-build.sh install tv # Instala na TV
bash ./webos-build.sh launch tv  # Lança app
bash ./webos-build.sh debug tv   # Abre DevTools
bash ./webos-build.sh logs tv    # Mostra logs
```

### Opção 2: npm Scripts (Recomendado para CI/CD)

```bash
npm run webos:build              # Build React
npm run webos:package            # Empacotar IPK
npm run webos:install            # Instalar na TV
npm run webos:launch             # Lançar app
npm run webos:debug              # Debug mode
npm run webos:emulator           # Iniciar emulador
npm run webos:log                # Ver logs
```

### Opção 3: Comandos Manuais (ares-cli)

```bash
# 1. Build React
npm run build

# 2. Empacotar para webOS
ares-package dist -o webos-build -n com.example.digital-menu-board -v 1.0.0

# 3. Instalar na TV
ares-install webos-build/*.ipk -d tv

# 4. Lançar aplicação
ares-launch com.example.digital-menu-board -d tv

# 5. Debug (Chrome DevTools)
ares-inspect com.example.digital-menu-board -d tv

# 6. Ver logs
ares-log -d tv -a com.example.digital-menu-board -f
```

---

## 🎮 Controle Remoto: Implementação EXIT-ONLY

### Arquivo: `src/webos/RemoteControl.ts`

Este arquivo implementa a **restrição máxima de controle remoto**:

```typescript
// PERMITIDO:
const EXIT_CODES = [27, 461];  // ESC + webOS Back button

// BLOQUEADO (100+ keycodes):
blockedKeys = [
  // Navigation
  UP, DOWN, LEFT, RIGHT,
  // Color buttons
  RED, GREEN, YELLOW, BLUE,
  // Media
  PLAY, PAUSE, FF, RW,
  // System
  HOME, POWER, MENU,
  // E muito mais...
]
```

### Como Funciona?

1. **Listeners Globais**: Captura todos os eventos de teclado (capture phase)
2. **EXIT Detectado**: ESC ou Back button → mostra confirmação visual
3. **Qualquer Outra Tecla**: preventDefault() + stopPropagation()
4. **Close App**: Tenta 4 métodos diferentes (webOS.service → PalmServiceBridge → Enyo → fallback)

### Código de Integração

Em `src/App.tsx`:

```typescript
import { WebOSRemoteControl } from './webos';

export const App: React.FC<AppProps> = ({ restaurantId, displayId, mode }) => {
  React.useEffect(() => {
    // Inicializar controle remoto no webOS
    if ((window as any).webOS) {
      WebOSRemoteControl.getInstance(
        (import.meta as any).env.DEV  // Debug mode = dev
      );
    }
  }, []);

  return (
    // ... seu componente aqui
  );
};
```

---

## 📊 Módulos WebOS Inclusos

### 1. **WebOSRemoteControl** (src/webos/RemoteControl.ts)
- Bloqueio de controle remoto
- Apenas ESC/Back permitido
- Visual feedback overlay
- Multiple close methods
- Debug logging

### 2. **WebOSPlatformDetector** (src/webos/webos-api.ts)
```typescript
WebOSPlatformDetector.isWebOS()     // true/false
WebOSPlatformDetector.isTV()        // true/false
WebOSPlatformDetector.getWebOSVersion()  // "e.g., 6.0"
WebOSPlatformDetector.getTVModel()  // "e.g., OLED65C1PUB"
```

### 3. **WebOSFeatures** (src/webos/webos-utils.ts)
Detecta APIs disponíveis:
- webOS.service ✅
- PalmServiceBridge ✅
- Enyo ✅

```typescript
WebOSFeatures.hasWebOSService()
WebOSFeatures.hasPalmServiceBridge()
WebOSFeatures.hasEnyo()
WebOSFeatures.getAvailableFeatures()  // lista de features
```

### 4. **WebOSKioskMode** (src/webos/webos-utils.ts)
Restringe funcionalidades do sistema:
- Bloqueia window.history.back/forward/pushState
- Impede navegação
- Ativa no boot automático

```typescript
WebOSKioskMode.enableKioskMode()
WebOSKioskMode.isActive()
```

### 5. **WebOSTVTheme** (src/webos/webos-utils.ts)
Otimizações para TV:
```typescript
WebOSTVTheme.getFontSize('medium')  // Fontes maiores
WebOSTVTheme.getPadding('button')   // Espaçamento para remote
WebOSTVTheme.getMinTouchTarget()    // 44px+ para seleção
WebOSTVTheme.applyTVOptimizations() // CSS automático
```

### 6. **WebOSMemoryManager** (src/webos/webos-utils.ts)
Monitora memória (limite ~50MB):
```typescript
WebOSMemoryManager.estimateMemoryUsage()  // MB
WebOSMemoryManager.forceCleanup()
WebOSMemoryManager.startMemoryMonitoring()
```

### 7. **WebOSInitializer** (src/webos/webos-utils.ts)
Inicializa tudo em uma chamada:
```typescript
WebOSInitializer.initialize({
  debug: false,           // Log de debug
  kioskMode: true,        // Restrições
  memoryMonitoring: true, // Monitorar memória
  tvOptimizations: true   // CSS para TV
});
```

---

## 📦 appinfo.json Configuração

**Arquivo:** `webos/appinfo.json`

```json
{
  "id": "com.example.digital-menu-board",
  "version": "1.0.0",
  "type": "web",
  "main": "index.html",
  "title": "Digital Menu Board",
  "appDescription": "Restaurant digital menu and signage system",
  "requiredPermissions": [
    "device.info",
    "com.webos.service.keymanager"
  ],
  "windowGroups": [
    {
      "name": "main",
      "layers": [
        {
          "name": "bg",
          "z": 0
        },
        {
          "name": "ui",
          "z": 1
        }
      ]
    }
  ],
  "systemInformation": {
    "minMemory": 30,
    "maxMemory": 50,
    "watchdog": true
  },
  "uiRevision": 2
}
```

### Campos Importantes:

| Campo | Descrição |
|-------|-----------|
| `id` | Package ID único (com.example.digital-menu-board) |
| `requiredPermissions` | Permissões necessárias (device.info, keymanager) |
| `maxMemory` | Limite de memória em MB (~50) |
| `uiRevision` | 2 para webOS 6+, 1 para webOS 5- |
| `windowGroups` | Estrutura de janelas e camadas |

---

## 🖼️ Ícone webOS

**Arquivo:** `webos/icon.png`  
**Dimensões:** 130x130 pixels (transparente fundo é melhor)

Crie um ícone com:
- Logo do restaurante ou menu
- Fundo transparente (PNG)
- Sem textos muito pequenos
- Cor primária clara

---

## 🧪 Testing

### 1. Emulador webOS

```bash
# Iniciar emulador
npm run webos:emulator

# Ou manual:
ares-emulator --start
```

### 2. Teste em TV Física

```bash
# Instalar
npm run webos:install

# Lançar
npm run webos:launch

# Debug (Chrome DevTools)
npm run webos:debug

# Logs
npm run webos:log
```

### 3. Teste de Controle Remoto

1. Lançar app em TV ou emulador
2. **Testa que NÃO funciona:**
   - Navegação (setas) ❌
   - Botões coloridos (vermelho, verde, etc) ❌
   - Play/Pause ❌
   - Home ❌
   - Números ❌
3. **Testa que FUNCIONA:**
   - Back button (ESC) → Mostra "🔴 Fechando aplicação..."
   - Soltar Back button → App fecha

---

## 🐛 Troubleshooting

### Problema: "ares-cli não encontrado"
```bash
npm install -g @webos-tools/ares-cli
```

### Problema: "Não consegue conectar na TV"
```bash
# Verificar conexão
ares-setup-device --list  # Ver devices registrados

# Re-registrar TV
ares-setup-device --add tv  # Adicionar novamente
ares-setup-device --remove tv  # Remover e adicionar
```

### Problema: "App mostra tela preta"
1. Verificar appinfo.json existe em dist/
2. Verificar HTML está correto
3. Ver logs: `npm run webos:log`

### Problema: "Controle remoto não está bloqueado"
1. Verificar RemoteControl.ts foi importado em App.tsx
2. Abrir DevTools: `npm run webos:debug`
3. Console deve mostrar: ✅ WebOS Platform initialized
4. Tentar apertar tecla: deve aparecer `[BLOQUEADO]` no console

### Problema: "Memória muito alta"
1. Rodar: `npm run build` com --minify
2. Verificar tamanho bundle: `npm run build` mostra size
3. Monitorar: `npm run webos:log` procurar por "Aviso de memória"

---

## 📋 npm Scripts

Adicione ao `package.json`:

```json
{
  "scripts": {
    "webos:build": "npm run build",
    "webos:package": "ares-package dist -o webos-build -n com.example.digital-menu-board -v 1.0.0",
    "webos:install": "ares-install webos-build/*.ipk -d tv",
    "webos:launch": "ares-launch com.example.digital-menu-board -d tv",
    "webos:debug": "ares-launch com.example.digital-menu-board -d tv --open-debugger",
    "webos:log": "ares-log -d tv -a com.example.digital-menu-board -f",
    "webos:emulator": "ares-emulator --start"
  }
}
```

---

## ✅ Compatibilidade

| WebOS | TV Models | Status |
|-------|-----------|--------|
| 6.0 | 2018-2019 | ✅ Full |
| 7.0 | 2020 | ✅ Full |
| 8.0 | 2021 | ✅ Full |
| 9.0 | 2022 | ✅ Full |
| 10.0 | 2023-2024 | ✅ Full |

---

## 📚 Recursos Adicionais

- [LG webOS SDK](https://webostv.developer.lge.com/)
- [ares-cli Documentation](https://github.com/webos-tools/ares-cli)
- [webOS TV App Development](https://webostv.developer.lge.com/develop/app-developer-guide/web-app-development/)
- [REST API Services](https://webostv.developer.lge.com/api/webos-service/#luna)

---

## 🚀 Próximos Passos

1. ✅ Implementar RemoteControl.ts
2. ✅ Atualizar App.tsx com inicialização
3. ⏳ Testar em emulador webOS
4. ⏳ Testar em TV física (2018+)
5. ⏳ Validar controle remoto (EXIT-only)
6. ⏳ Deployment em produção

---

**Última atualização:** 2024
**Branch:** feat/webos-standalone
**Status:** Ready for Testing ✅
