# 🖥️ Tauri Kiosk Mode - Guia de Implementação

## ✅ O Que Foi Implementado

### 1. **Configuração Tauri** (`src-tauri/tauri.conf.json`)
```json
✅ Fullscreen: true
✅ Decorations: false (sem barra de título)
✅ Resizable: false (não redimensionável)
✅ AlwaysOnTop: true (sempre no topo)
✅ Permissions locked (sem acesso ao SO)
```

### 2. **Backend Rust** (`src-tauri/src/main.rs`)
Desabilitado globalmente:
- ✅ `Ctrl+R` (recarregar página)
- ✅ `F5` (refresh)
- ✅ `F11` (fullscreen toggle)
- ✅ `F12` (dev tools)
- ✅ `Ctrl+Shift+I` (inspector)
- ✅ `Ctrl+Shift+C` (color picker)
- ✅ `Ctrl+Shift+J` (console)
- ✅ `Ctrl+Shift+K` (search)
- ✅ `Alt+Tab` (switch window)
- ✅ `Alt+F4` (close window)
- ✅ `Win` key (Windows menu)
- ✅ `Win+L` (lock PC)

**🔓 Atalho de Saída de Emergência**:
- ✅ Tecla **Q** fecha a aplicação (para manutenção)

### 3. **Frontend Security** (`src/App.tsx`)
```typescript
✅ Desabilita right-click menu
✅ Bloqueia shortcuts perigosas (F12, F11, etc)
✅ Impede drag & drop
✅ Desabilita seleção de texto
✅ Desabilita print dialog
✅ Tecla Q habilitada para saída de emergência
```

---

## 🚀 Como Compilar para Produção

### Pré-requisitos
```powershell
# 1. Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Instalar ferramentas C++ (visual-cpp-build-tools)
# Download: https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

### Build Tauri
```powershell
# Opção 1: Build completo (gera .exe instalável)
npm run tauri build

# Opção 2: Dev com hot reload
npm run tauri-dev

# Resultado esperado:
# ✓ dist/ (frontend compilado)
# ✓ src-tauri/target/release/digital-menu-board.exe
# ✓ src-tauri/target/release/bundle/msi/DigitalMenuBoard_1.0.0_x64_en-US.msi
# ✓ src-tauri/target/release/bundle/nsis/DigitalMenuBoard_1.0.0_x64-setup.exe
```

### Gerando Ícones da Aplicação
Se a pasta `src-tauri/icons/` não existir, gere os ícones:

```powershell
# 1. Baixe uma imagem base (PNG 512x512 ou maior)
# Pode usar qualquer imagem, aqui usamos um ícone de restaurante
Invoke-WebRequest -Uri "https://img.icons8.com/color/512/restaurant.png" `
  -OutFile "app-icon.png" -UserAgent "Mozilla/5.0"

# 2. Gere todos os formatos necessários (Windows, macOS, iOS, Android)
npm run tauri icon app-icon.png

# Resultado: 
# ✓ src-tauri/icons/icon.ico (Windows)
# ✓ src-tauri/icons/icon.icns (macOS)
# ✓ src-tauri/icons/*.png (vários tamanhos)
# ✓ src-tauri/icons/ios/ (ícones iOS)
# ✓ src-tauri/icons/android/ (ícones Android)
```

**Nota**: Você pode usar qualquer imagem PNG como base. Recomendado: 512x512px ou maior.

---

## 📋 Estrutura de Arquivos Criados

```
src-tauri/
├── tauri.conf.json           # Configuração principal
├── Cargo.toml                # Dependências Rust
├── build.rs                  # Script de build
├── src/
│   ├── main.rs              # Aplicação Rust (handlers)
│   └── lib.rs               # Exports
└── capabilities/
    └── default.json         # Permissões de segurança
```

---

## 🔒 Recursos de Segurança Ativados

### Nível 1: Janela (main.rs)
```rust
✅ Fullscreen forçado no startup
✅ Window maximize automático
✅ Impede fechamento via Alt+F4
✅ Impede minimização via code
✅ Menu desabilitado
```

### Nível 2: Teclado (Global Shortcuts)
```rust
✅ 12 atalhos perigosos desabilitados globalmente
✅ Não responde a nenhum shortcut de dev tools
✅ Não permite reload da página
```

### Nível 3: Frontend (App.tsx)
```tsx
✅ Context menu (right-click) bloqueado
✅ Todos os shortcuts duplicados no JS
✅ Eventos de drag/drop prevenidos
✅ Seleção de texto desabilitada
```

---

## 🧪 Como Testar Antes de Compilar

### Opção 1: Development com Hot Reload
```powershell
# Terminal 1: Inicia o servidor Vite
npm run dev

# Terminal 2: Inicia a janela Tauri
npm run tauri-dev

# Resultado: Janela fullscreen com segurança ativa
# Teste: Tenta Alt+F4, F12, Ctrl+R, right-click → nada acontece ✅
# Para sair: Pressione a tecla Q
```

### Opção 2: Production Build (sem Tauri)
```powershell
npm run build

# Abre dist/index.html em navegador
# Funciona, mas sem segurança Tauri (é um web app)
```

---

## 🎯 Checklist de Funcionalidade

- [ ] Aplicação abre em fullscreen
- [ ] Sem barra de título/menu
- [ ] Sem resize handle
- [ ] Right-click desabilitado
- [ ] F12 não abre dev tools
- [ ] Alt+F4 não fecha a janela
- [ ] Ctrl+R não recarrega
- [ ] F11 não alterna fullscreen
- [ ] Janela sempre no topo
- [ ] Tecla Q fecha a aplicação (saída de emergência)
- [ ] Menu de cardápio rotaciona
- [ ] Vídeo toca automaticamente
- [ ] Tema muda dinamicamente

---

## 📊 Comparação: Tauri vs Chrome Kiosk vs Electron

| Aspecto | Tauri | Chrome Kiosk | Electron |
|---------|-------|--------------|----------|
| **Tamanho** | ~80MB | 10MB (flags) | ~150MB |
| **Controle Total** | ✅ 100% | ⚠️ 70% | ✅ 100% |
| **Segurança** | ✅ Excelente | ⚠️ Boa | ✅ Boa |
| **Performance** | ✅ Muito rápido | ⚠️ Médio | ⚠️ Pesado |
| **Offline** | ✅ Sim | ❌ Não | ✅ Sim |
| **Setup Backend** | ✅ Feito | ✅ Fácil | ⚠️ Médio |
| **Recomendação** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🐛 Troubleshooting

### "Rust não está instalado"
```powershell
# Solução
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
refreshenv  # ou feche e reabra o PowerShell
```

### "Error: LINK : fatal error LNK1181"
```powershell
# Instale Visual C++ Build Tools
# https://visualstudio.microsoft.com/visual-cpp-build-tools/
# Selecione: "Desktop development with C++"
```

### "npm run tauri dev não funciona"
```powershell
# 1. Certifique-se que npm run dev está rodando
npm run dev  # Terminal 1 (Vite dev server)

# 2. Em outro terminal
npm run tauri dev  # Terminal 2 (Tauri window)
```

### "Build fica preso em 99%"
```powershell
# Normal - Tauri/Rust compilation é lenta primeira vez (~5 min)
# Próximas vezes: ~30 segundos
```

---

## 📦 Próximos Passos

1. **Testar**: Execute `npm run tauri dev`
2. **Validar**: Confirme que todos os shortcuts estão bloqueados
3. **Compilar**: Execute `npm run tauri build` para gerar instalador
4. **Deploy**: Distribua o `.msi` ou `.exe` gerado
5. **Monitora**: Configure watchdog para restart automático se cair

---

## 📞 Suporte

Arquivo de configuração completo: [src-tauri/tauri.conf.json](../src-tauri/tauri.conf.json)  
Handler Rust: [src-tauri/src/main.rs](../src-tauri/src/main.rs)  
Security Frontend: [src/App.tsx](../src/App.tsx#L21-L85)

