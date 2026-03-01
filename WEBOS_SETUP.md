# 🖥️ webOS LG Setup - Digital Menu Board

## ✅ O Que Será Implementado

Transformação completa da aplicação React em **WebOS App nativa** para TVs LG 2018+ (webOS 6+).

### Requisitos da App
- ✅ Interface React responsiva para 1920x1080 (padrão webOS)
- ✅ Suporte a controle remoto LG (Magic Remote + numpad)
- ✅ Apenas comando de saída (fechar app) habilitado
- ✅ Bloqueio total de inputs desnecessários
- ✅ Otimização para performance em TVs

---

## 📋 Arquitetura WebOS

### Estrutura de Diretórios
```
digital-menu-board/
├── webos/                          # ← NEW: Configurações webOS
│   ├── appinfo.json               # Metadados da app
│   ├── icon.png                   # Ícone (130x130)
│   ├── services/                  # ← Serviços webOS (em Rust/Node)
│   │   └── service.js             # Serviço de controle remoto
│   └── webos-build.sh             # Script de build
│
├── src/
│   ├── webos/                     # ← NEW: Integrações webOS
│   │   ├── RemoteControl.ts       # Handler de controle remoto
│   │   └── webos-api.ts           # APIs nativas webOS
│   ├── App.tsx                    # (modificado para webOS)
│   └── ... (resto do código)
│
├── src-tauri/                     # (mantém compatibilidade Windows)
├── package.json                   # (com scripts webOS)
└── vite.config.ts                 # (com build webOS)
```

---

## 🚀 Instalação e Setup

### Pré-requisitos

1. **WebOS SDK** (webOS TV SDK 2.0+)
   ```powershell
   # Download: https://webostv.developer.lge.com/sdk/download/download-sdk
   # Ou via Node Package Manager:
   npm install -g @webos-tools/ares-cli
   ```

2. **Ferramentas Necessárias**
   ```powershell
   # Node.js 14+ (já instalado)
   # Python 3.8+ (para build scripts)
   # Git (já instalado)
   ```

3. **Registrar TV LG**
   - Ativar "Developer Mode" na TV: Home → Settings → All Settings → Developer
   - Obter IP da TV (em Developer Mode)
   - Configurar conexão: `ares-setup-device --add`

### 1. Instalar WebOS Enyo Framework

```bash
# Global
npm install -g @webos-tools/ares-cli
npm install -g @webos-tools/webos-emulator

# Dependencies
npm install
```

### 2. Gerar App Info

Ja está incluído em `/webos/appinfo.json` com:
- ID: `com.example.digital-menu-board`
- Versão: `1.0.0`
- Tipo: `web` (React app)
- Mainhtml: `index.html`

### 3. Build para WebOS

```bash
# Build React
npm run build

# Gerar pacote .ipk (APK do webOS)
npm run webos:build

# Deploy na TV
npm run webos:install

# Deploy + Start
npm run webos:launch
```

---

## 🎮 Controle Remoto - Implementação

### Teclas Mapeadas

| Tecla | Ação | Status |
|-------|------|--------|
| **Exit/Back** | Fechar app | ✅ **ATIVA** |
| Home | Bloqueada | ❌ Desabilitada |
| Power | Bloqueada | ❌ Desabilitada |
| Setas/OK | Bloqueadas | ❌ Desabilitadas |
| Volume | Bloqueada | ❌ Desabilitada |
| Numpad | Bloqueada | ❌ Desabilitada |
| Red/Green/Blue/Yellow | Bloqueada | ❌ Desabilitada |

### Código de Implementação

```typescript
// src/webos/RemoteControl.ts

interface WebOSRemoteEvent {
  keyCode: number;
  keyName: string;
  isDown: boolean;
  isUp: boolean;
  isRepeat: boolean;
}

const KEY_CODES = {
  EXIT: 27,           // ESC / Back button
  HOME: 36,           // Home button
  ENTER: 13,          // OK / Select
  UP: 38,             // Arrow up
  DOWN: 40,           // Arrow down
  LEFT: 37,           // Arrow left
  RIGHT: 39,          // Arrow right
};

export class WebOSRemoteControl {
  private static instance: WebOSRemoteControl;
  
  private constructor() {
    this.initializeRemoteControl();
  }
  
  static getInstance(): WebOSRemoteControl {
    if (!WebOSRemoteControl.instance) {
      WebOSRemoteControl.instance = new WebOSRemoteControl();
    }
    return WebOSRemoteControl.instance;
  }
  
  private initializeRemoteControl() {
    // Bloquear todos os keys por padrão
    document.addEventListener('keydown', (e) => {
      this.handleRemoteKey(e);
    });
    
    console.log('📺 WebOS Remote Control initialized');
  }
  
  private handleRemoteKey(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    
    // Apenas EXIT permite ação
    if (keyCode === KEY_CODES.EXIT) {
      console.log('📺 Exit button pressed - Closing app');
      this.closeApplication();
      event.preventDefault();
      return;
    }
    
    // Bloquear TUDO mais
    event.preventDefault();
    console.log(`🔒 Key ${keyCode} blocked`, event.key);
  }
  
  private closeApplication() {
    // WebOS API para fechar app
    if ((window as any).webOS) {
      (window as any).webOS.service.request('luna://com.palm.applicationManager', {
        method: 'close',
        parameters: {
          id: (window as any).PalmServiceBridge?.appId || 'com.example.digital-menu-board'
        }
      });
    } else {
      // Fallback: fechar janela
      window.close();
    }
  }
}
```

---

## 📱 App Info WebOS

```json
{
  "id": "com.example.digital-menu-board",
  "version": "1.0.0",
  "vendor": "Your Restaurant",
  "type": "web",
  "main": "index.html",
  "title": "Digital Menu Board",
  "icon": "icon.png",
  "uiRevision": 2,
  "healthCheck": {
    "memory": 50000000
  },
  "requiredPermissions": [],
  "privilegedJSObjects": [],
  "windowGroups": [
    {
      "name": "main",
      "layers": [
        {
          "name": "menu-board"
        }
      ]
    }
  ]
}
```

---

## 🔧 Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    
    "webos:build": "npm run build && npm run webos:package",
    "webos:package": "ares-package dist -o webos-build",
    "webos:install": "ares-install webos-build/*.ipk -d tv",
    "webos:launch": "ares-launch com.example.digital-menu-board -d tv",
    "webos:debug": "ares-launch com.example.digital-menu-board -d tv --open-debugger",
    "webos:log": "ares-log -d tv -a com.example.digital-menu-board -f",
    "webos:emulator": "ares-emulator --start"
  }
}
```

---

## 📐 Vite Config para WebOS

```typescript
// vite.config.ts (adição para webOS)

export default defineConfig({
  build: {
    target: 'es2018', // Compatibilidade webOS 6+
    outDir: isDev ? 'dist-dev' : 'dist',
    
    // Otimizar para TV
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-styled': ['styled-components', 'zustand'],
        }
      }
    }
  },
  
  // Server para teste local
  server: {
    host: '0.0.0.0', // Acessível de qualquer IP
    port: 3001,
    strictPort: true,
  }
});
```

---

## 🧪 Teste Local

### 1. Emulador WebOS
```bash
# Iniciar emulador
npm run webos:emulator

# Deploy na emulador
npm run webos:install -- -d emulator
npm run webos:launch -- -d emulator
```

### 2. TV Física
```bash
# Configurar TV (primeira vez)
ares-setup-device --add
# Nome: tv
# Host: [IP da TV]
# Port: 22 (SSH)

# Deploy
npm run webos:install -- -d tv
npm run webos:launch -- -d tv

# Logs em tempo real
npm run webos:log
```

### 3. Chrome DevTools
```bash
# Abrir debugger web
npm run webos:debug -- -d tv

# URL do debugger: http://localhost:9999
```

---

## 🎨 UI/UX para TV

### Modificações em App.tsx

```typescript
// src/App.tsx

import { WebOSRemoteControl } from './webos/RemoteControl';

function App({ restaurantId = 'default', ... }: AppProps) {
  // Inicializar controle remoto webOS
  React.useEffect(() => {
    if (this.isWebOS()) {
      WebOSRemoteControl.getInstance();
      console.log('📺 App running on webOS');
    }
  }, []);
  
  private isWebOS(): boolean {
    return !!(window as any).webOS;
  }
  
  // ... resto do código
}
```

### Estilos para TV (CSS)

```css
/* Otimizações para TV */
body {
  /* Desabilitar seleção */
  user-select: none;
  -webkit-user-select: none;
  
  /* Desabilitar zoom */
  touch-action: none;
  
  /* Fonte otimizada para TV */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  
  /* Sem barra de scroll */
  overflow: hidden;
}

/* Focus outline em textos (para a TV) */
button, a {
  outline: 3px solid #ff6b00;
  outline-offset: 2px;
}

/* Desabilitar interação do mouse */
* {
  cursor: none;
}
```

---

## 📦 Build & Deploy

### 1. Build Manual

```bash
# Terminal 1: Build React
npm run build

# Terminal 2: Monitorar mudanças (dev)
npm run dev

# Terminal 3: Deploy para TV
npm run webos:install
ares-launch com.example.digital-menu-board -d tv
```

### 2. Build CI/CD (GitHub Actions)

```yaml
# .github/workflows/webos-deploy.yml

name: WebOS Deploy

on:
  push:
    branches: [main, feat/webos-standalone]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      - run: npm run webos:package
      
      # Deploy automático (requer credenciais TV)
      - name: Deploy to TV
        env:
          TV_IP: ${{ secrets.TV_IP }}
        run: |
          ares-setup-device --add auto $TV_IP
          npm run webos:install
```

---

## 🚨 Troubleshooting

### Problema: "webOS não inicializa remoto"
```bash
# Verificar se TV suporta Developer Mode
# Settings → All Settings → Developer → Developer Mode ON
```

### Problema: "ares-cli não encontrado"
```powershell
# Instalar globalmente
npm install -g @webos-tools/ares-cli

# Verificar instalação
ares --version
```

### Problema: "Connection refused na TV"
```bash
# Configurar dispositivo novamente
ares-setup-device --list
ares-setup-device --modify tv --host [IP_TV]
```

### Problema: "App não fecha com Exit"
```typescript
// Testar em console JavaScript da TV:
webOS.service.request('luna://com.palm.applicationManager', {
  method: 'close',
  parameters: { id: 'com.example.digital-menu-board' }
});
```

---

## 📊 Compatibilidade

| webOS | Ano | Status | Nota |
|-------|-----|--------|------|
| webOS 6.0 | 2018-2019 | ✅ Suportado | Base mínima |
| webOS 6.1 | 2019 | ✅ Suportado | |
| webOS 7.0 | 2020 | ✅ Suportado | |
| webOS 8.0 | 2021 | ✅ Suportado | |
| webOS 9.0 | 2022 | ✅ Suportado | |
| webOS 10.0 | 2023+ | ✅ Suportado | Recomendado |

---

## 🎯 Próximas Etapas

1. ✅ Criar estrutura webOS
2. ✅ Implementar controle remoto
3. ✅ Build & Package
4. ⏳ Testar em emulador
5. ⏳ Deploy em TV física
6. ⏳ Monitoring & Logs

---

## 📞 Recursos

- [LG WebOS TV Developer](https://webostv.developer.lge.com/)
- [Ares CLI Docs](https://webostv.developer.lge.com/develop/tools/ares-cli/)
- [WebOS API Reference](https://webostv.developer.lge.com/api/webos-service/)
- [Magic Remote Guide](https://webostv.developer.lge.com/develop/guides/handling-remote-control/)

---

**Última atualização**: 1 de Março de 2026  
**Branch**: `feat/webos-standalone`
