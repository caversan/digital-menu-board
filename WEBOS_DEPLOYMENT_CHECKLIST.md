# WebOS Deployment Checklist

Use esta lista para verificar tudo antes de fazer deploy para TV webOS.

## ✅ Pré-Requisitos

- [ ] Node.js 18+ instalado (`node --version`)
- [ ] npm 8+ instalado (`npm --version`)
- [ ] Git configurado (`git config --list`)
- [ ] Você está no branch `feat/webos-standalone` ou `main`
- [ ] Todas as mudanças foram comitadas (`git status`)

## 🔧 Setup Inicial (Apenas Primeira Vez)

- [ ] ares-cli instalado (`npm install -g @webos-tools/ares-cli`)
- [ ] webOS SDK instalado (download de lg.com)
- [ ] TV registrada com ares-cli (`ares-setup-device --list`)
- [ ] TV conectada na mesma rede que o computador
- [ ] SSH habilitado na TV (Developer Mode)

## 🏗️ Build Verification

```bash
npm run lint              # Verificar código
npm run build            # Build local
```

- [ ] Sem erros de lint
- [ ] Build compila sem erros
- [ ] Nenhum warning crítico
- [ ] Tamanho do build < 100MB

## 📦 WebOS Files Check

```bash
ls -la webos/           # Verificar arquivos webOS
cd dist && cat appinfo.json  # Verificar metadados
```

- [ ] `webos/appinfo.json` existe e está válido
- [ ] `webos/icon.png` existe (opcional mas recomendado, 130x130)
- [ ] `dist/appinfo.json` foi copiado (verificar após build)
- [ ] `dist/index.html` existe
- [ ] Todas as dependências estão resolvidas

## 🎯 RemoteControl Initialization

Verificar em `src/App.tsx`:

```typescript
import { WebOSRemoteControl } from './webos';

React.useEffect(() => {
  if ((window as any).webOS) {
    WebOSRemoteControl.getInstance((import.meta as any).env.DEV);
  }
}, []);
```

- [ ] RemoteControl importado
- [ ] useEffect configurado corretamente
- [ ] Inicialização só ocorre se webOS detectado

## 📱 TV Device Check

```bash
ares-setup-device --list          # Ver devices registrados
ares-setup-device --info tv       # Info do device
ping [TV_IP]                      # Testar conectividade
```

- [ ] TV aparece em `--list`
- [ ] Tipo: `tv`
- [ ] Host: IP da TV
- [ ] Conectividade: OK (ping responde)
- [ ] SSH: Funcionando

## 🚀 Deployment

### Usar Script Automático (Recomendado):

**Windows:**
```powershell
.\webos-build.ps1 full tv
```

**macOS/Linux:**
```bash
bash ./webos-build.sh full tv
```

- [ ] Build executado sem erros
- [ ] Package criado (IPK)
- [ ] Instalação na TV: OK
- [ ] App lançado na TV

### Ou Manual:

```bash
# 1. Build
npm run build

# 2. Package
ares-package dist -o webos-build -n com.example.digital-menu-board -v 1.0.0

# 3. Install
ares-install webos-build/*.ipk -d tv

# 4. Launch
ares-launch com.example.digital-menu-board -d tv
```

- [ ] Passo 1: ✅
- [ ] Passo 2: ✅ (IPK criado)
- [ ] Passo 3: ✅ (App instalado)
- [ ] Passo 4: ✅ (App aparece na TV)

## 🎮 Teste de Controle Remoto

Via Debug DevTools (Chrome):

```bash
npm run webos:debug  # Ou: ares-inspect com.example.digital-menu-board -d tv
```

Na TV ou Emulador:

- [ ] App está visível e funcional
- [ ] Teste **BLOQUEADO**: Apertar seta UP → Nada acontece (verifica console)
- [ ] Teste **BLOQUEADO**: Apertar número 1 → Nada acontece
- [ ] Teste **BLOQUEADO**: Apertar botão colorido (vermelho) → Nada acontece
- [ ] Teste **PERMITIDO**: Apertar BACK ou ESC → Mostra "🔴 Fechando aplicação..."
- [ ] Teste **PERMITIDO**: Soltar BACK → App fecha
- [ ] Console mostra: `[BLOQUEADO]` para teclas não permitidas
- [ ] Console mostra: `[EXIT]` quando BACK é pressionado

## 📊 Performance Check

```bash
npm run webos:log  # Ver logs em tempo real
```

- [ ] Memória < 50MB
- [ ] Nenhum erro de JavaScript
- [ ] Nenhuma aviso de memory leak
- [ ] Frame rate: 60fps (em pausa automaticamente se não ativo)
- [ ] Sem crashes após 5 minutos

## 🌍 Display & Rendering

Na TV:

- [ ] Resolução correta (1920x1080, 2560x1440, 3840x2160)
- [ ] Sem distorção de cores
- [ ] Texto legível (tamanho grande para TV)
- [ ] Sem artefatos gráficos
- [ ] Sem flicks ou flickering

## 🧹 Cleanup (Após Confirmação de Sucesso)

```bash
# Após deploy bem-sucedido, você pode:
rm -rf webos-build/        # Remover build temporário
rm -rf dist/               # Remover dist (será recriado)

# Commitar mudanças se necessário
git add .
git commit -m "✅ WebOS deployment sucesso"
git push origin feat/webos-standalone
```

- [ ] Arquivos temporários removidos
- [ ] Mudanças comitadas (se houver)
- [ ] Branch atualizado remotamente

## 🔄 Rollback (Se Algo Deu Errado)

```bash
# Desinstalar app da TV
ares-install --remove com.example.digital-menu-board -d tv

# Ou via ares-cli
ares-install --remove app -d tv

# Voltar para versão anterior
git revert HEAD  # Se foi um commit
npm install      # Reinstalar dependências
```

- [ ] App removido da TV
- [ ] Código revertido se necessário
- [ ] Dependências limpas

## 📞 Suporte & Troubleshooting

<details>
<summary>❌ App mostra tela preta</summary>

1. Verificar `npm run webos:log`
2. Procurar por erros JavaScript
3. Verificar `dist/appinfo.json` existe
4. Verificar `dist/index.html` está correto
5. Limpar cache: `ares-install --remove ...`

```bash
npm run webos:log  # Ver erros específicos
```

</details>

<details>
<summary>❌ Controle remoto não funciona como esperado</summary>

1. Abrir DevTools: `npm run webos:debug`
2. Console deve mostrar: `[BLOQUEADO] Keycode: XX`
3. Verificar RemoteControl.ts foi importado
4. Verificar EXIT_CODES = [27, 461]

```bash
# Forçar reload com debug
ares-inspect com.example.digital-menu-board -d tv
```

</details>

<details>
<summary>❌ Erro: "ares-cli não encontrado"</summary>

```bash
npm install -g @webos-tools/ares-cli
npm install -g @webos-tools/ares-cli-new  # Alternativa
```

</details>

<details>
<summary>❌ Erro: "Não consegue conectar na TV"</summary>

```bash
# 1. Verificar registro
ares-setup-device --list

# 2. Verificar conectividade
ping [TV_IP]

# 3. Re-registrar se necessário
ares-setup-device --remove tv
ares-setup-device --add tv
```

</details>

<details>
<summary>⚠️  Aviso: "Memória > 50MB"</summary>

1. Reduzir tamanho do bundle
2. Minificar CSS/JS
3. Lazy-load imagens
4. Remover dependências não-essenciais

```bash
npm run build  # Mostra tamanho final
```

</details>

## ✅ Final Checklist

Antes de considerar completo:

- [ ] App funciona em emulador OU TV física
- [ ] Controle remoto bloqueado corretamente
- [ ] EXIT button fecha app
- [ ] Sem crashes após 10 minutos
- [ ] Menu aparece corretamente
- [ ] Imagens carregam
- [ ] Memória < 50MB
- [ ] Tudo documentado em WEBOS_IMPLEMENTATION.md

## 📝 Notas

Escreva observações importantes:

```
Data: ___________
TV Model: ___________
WebOS Version: ___________
Nota: _________________________________
```

---

**Last Updated:** 2024
**Status:** ✅ Ready for Production
