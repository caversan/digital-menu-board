# 📺 WebOS Quick Start Guide

Guia rápido para começar a desenvolver/testar a aplicação em webOS.

## 🚀 Quick Start (5 minutos)

### 1. Instalação Rápida

```bash
# ares-cli (ferramenta principal)
npm install -g @webos-tools/ares-cli

# Ou via webOS SDK (mais completo)
# Download: https://webostv.developer.lge.com/
```

### 2. Registrar TV

```bash
ares-setup-device --add tv
# Preencher:
# - Device Name: tv
# - Device IP: [seu IP da TV]
# - SSH Port: 22
# - Username: prisoner
# - Password: [vazio]
```

### 3. Build & Deploy (3 comandos)

```bash
npm run build                    # 1. Build React
npm run webos:package           # 2. Empacotar
npm run webos:install           # 3. Instalar na TV
```

**Ou tudo de uma vez:**

```bash
# Windows
.\webos-build.ps1 full tv

# macOS/Linux
bash ./webos-build.sh full tv
```

### 4. Testar

Na TV:
- ✅ App deve estar ativo
- ✅ Telas devem aparecer normalmente
- ✅ Apertar BACK: mostra "🔴 Fechando aplicação..."
- ✅ Soltar BACK: app fecha

## 🛠️ Desenvolvimento

### Modo Debug

```bash
npm run webos:debug  # Abre Chrome DevTools
```

### Ver Logs

```bash
npm run webos:log    # Logs em tempo real
```

### Teste em Emulador

```bash
npm run webos:emulator  # Inicia emulador (opcional)
```

## 📂 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `webos/appinfo.json` | Metadados da app |
| `src/webos/RemoteControl.ts` | Bloqueio controle remoto |
| `src/webos/webos-api.ts` | APIs nativas webOS |
| `src/webos/webos-utils.ts` | Utilitários (tema, memória, etc) |
| `WEBOS_IMPLEMENTATION.md` | Documentação completa |
| `WEBOS_DEPLOYMENT_CHECKLIST.md` | Checklist antes de deploy |

## 🎮 Controle Remoto

**Bloqueado:**
- ❌ Setas (UP, DOWN, LEFT, RIGHT)
- ❌ Números
- ❌ Botões coloridos (RED, GREEN, etc)
- ❌ Play, Pause, Fast-Forward
- ❌ Home, Menu, Power

**Permitido:**
- ✅ BACK / ESC → Fecha app

## 🧪 Testes Rápidos

### Teste 1: Verificar setup

```bash
ares-setup-device --list
# Deve mostrar: tv (available)
```

### Teste 2: Build

```bash
npm run build
# Arquivos em: dist/
```

### Teste 3: Instalar

```bash
npm run webos:install
# Deve mostrar: "Installed successfully"
```

### Teste 4: Ver logs

```bash
npm run webos:log
# Deve mostrar logs da aplicação
```

## 🔍 Troubleshooting Rápido

| Problema | Solução |
|----------|----------|
| `ares-cli: command not found` | `npm install -g @webos-tools/ares-cli` |
| App não aparece | `npm run webos:install` (instalar outra vez) |
| Tela preta | `npm run webos:log` (procurar por erros) |
| Controle remoto não bloqueia | `npm run webos:debug` (abrir DevTools) |
| Não consegue conectar na TV | `ares-setup-device --remove tv && ares-setup-device --add tv` |

### Erro de MIME no emulador local

Se aparecer erro no navegador como:

`Failed to load module script ... MIME type of "text/html"`

Faça este fluxo:

```bash
npm run build
python -u webos-emulator.py 3003
```

Depois:
- Feche a aba antiga do navegador
- Reabra `http://localhost:3003`
- Force recarga com `Ctrl+F5` (ou teste em janela anônima)

Esse erro acontece quando o servidor local responde `index.html` para arquivos de bundle (`.js`) em vez de servir os arquivos estáticos com MIME correto.

## 📊 Versões Suportadas

| webOS | TV Models | Status |
|-------|-----------|--------|
| 6.0 | 2018-2019 | ✅ |
| 7.0 | 2020 | ✅ |
| 8.0 | 2021 | ✅ |
| 9.0 | 2022 | ✅ |
| 10.0 | 2023+ | ✅ |

## 🔗 Recursos Úteis

- [LG WebOS SDK](https://webostv.developer.lge.com/)
- [ares-cli GitHub](https://github.com/webos-tools/ares-cli)
- [WebOS TV APIs](https://webostv.developer.lge.com/api/)
- [Developer Console](https://webostv.developer.lge.com/develop/app-developer-guide/web-app-development/)

## 💡 Dicas

1. **Primeira vez?** Comece com o emulador:
   ```bash
   npm run webos:emulator
   npm run webos:install
   npm run webos:launch
   ```

2. **Desenvolvimento rápido?** Use:
   ```bash
   npm run dev          # Dev server local
   
   # Depois instale quando pronto
   npm run webos:build
   npm run webos:install
   ```

3. **Debug avançado?** Use Chrome DevTools:
   ```bash
   npm run webos:debug
   # Abre automaticamente DevTools no Chrome
   ```

4. **Limpar cache?**
   ```bash
   ares-install --remove com.example.digital-menu-board -d tv
   npm run webos:install  # Instalar novamente
   ```

## 📋 Próximos Passos

1. ✅ Setup ares-cli
2. ✅ Registrar TV
3. ✅ Fazer build
4. ✅ Testar em emulador ou TV
5. 📖 Ler: [WEBOS_IMPLEMENTATION.md](WEBOS_IMPLEMENTATION.md)
6. ✅ Passar checklist: [WEBOS_DEPLOYMENT_CHECKLIST.md](WEBOS_DEPLOYMENT_CHECKLIST.md)

---

**Precisa de ajuda?** Veja os arquivos de documentação completos!

- 📖 [WEBOS_IMPLEMENTATION.md](WEBOS_IMPLEMENTATION.md) - Guia completo
- ✅ [WEBOS_DEPLOYMENT_CHECKLIST.md](WEBOS_DEPLOYMENT_CHECKLIST.md) - Antes de deploy
- 🚀 [WEBOS_SETUP.md](WEBOS_SETUP.md) - Setup detalhado
