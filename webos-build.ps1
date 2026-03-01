# WebOS Build Script para Digital Menu Board (Windows PowerShell)
# Faz build, empacota e deploy para LG TV

param(
    [Parameter(Position=0)]
    [ValidateSet('build', 'clean', 'package', 'install', 'launch', 'full', 'debug', 'logs', 'setup', 'menu', 'help')]
    [string]$Command = 'menu',
    
    [Parameter(Position=1)]
    [string]$DeviceName = 'tv'
)

# Configuração
$AppId = "com.example.digital-menu-board"
$BuildDir = "webos-build"
$DistDir = "dist"
$AppVersion = "1.0.0"

# Funções de Log
function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# Verificar dependências
function Test-Dependencies {
    Write-Info "Verificando dependências..."

    # npm
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error-Custom "npm não encontrado. Instale Node.js"
        exit 1
    }

    # ares-package
    if (-not (Get-Command ares-package -ErrorAction SilentlyContinue)) {
        Write-Warning "ares-cli não encontrado. Execute: npm install -g @webos-tools/ares-cli"
        exit 1
    }

    Write-Success "Dependências verificadas"
}

# Build da aplicação
function Build-App {
    Write-Info "Building aplicação..."
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Build concluído"
    } else {
        Write-Error-Custom "Build falhou"
        exit 1
    }
}

# Limpar build anterior
function Clean-Build {
    Write-Info "Limpando build anterior..."
    
    if (Test-Path $BuildDir) {
        Remove-Item -Path $BuildDir -Recurse -Force
    }
    
    New-Item -ItemType Directory -Path $BuildDir -Force | Out-Null
    Write-Success "Build limpo"
}

# Copiar arquivos webOS
function Copy-WebOSFiles {
    Write-Info "Copiando arquivos webOS..."
    
    # Copiar appinfo.json
    $appInfoPath = Join-Path "webos" "appinfo.json"
    if (Test-Path $appInfoPath) {
        Copy-Item -Path $appInfoPath -Destination $DistDir -Force
        Write-Success "appinfo.json copiado"
    } else {
        Write-Error-Custom "webos/appinfo.json não encontrado"
        exit 1
    }

    # Copiar ícone
    $iconPath = Join-Path "webos" "icon.png"
    if (Test-Path $iconPath) {
        $iconDir = Join-Path $DistDir "icon"
        New-Item -ItemType Directory -Path $iconDir -Force | Out-Null
        Copy-Item -Path $iconPath -Destination $iconDir -Force
        Write-Success "Ícone copiado"
    } else {
        Write-Warning "webos/icon.png não encontrado (opcional)"
    }
}

# Empacotar para webOS
function Package-App {
    Write-Info "Empacotando aplicação para webOS..."
    
    $packageCmd = @(
        'ares-package',
        $DistDir,
        '-o', $BuildDir,
        '-n', $AppId,
        '-v', $AppVersion
    )
    
    & $packageCmd[0] $packageCmd[1..($packageCmd.Length-1)]
    
    $ipkFile = Get-ChildItem -Path $BuildDir -Filter "*.ipk" -ErrorAction SilentlyContinue | Select-Object -First 1
    
    if ($ipkFile) {
        Write-Success "Pacote criado: $($ipkFile.FullName)"
    } else {
        Write-Error-Custom "Falha ao criar pacote IPK"
        exit 1
    }
}

# Instalar na TV
function Install-App {
    param([string]$Device = $DeviceName)
    
    Write-Info "Instalando na TV ($Device)..."
    
    $ipkFile = Get-ChildItem -Path $BuildDir -Filter "*.ipk" -ErrorAction SilentlyContinue | Select-Object -First 1
    
    if (-not $ipkFile) {
        Write-Error-Custom "Arquivo IPK não encontrado em $BuildDir"
        exit 1
    }
    
    ares-install $ipkFile.FullName -d $Device
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "App instalado"
    } else {
        Write-Error-Custom "Instalação falhou"
        exit 1
    }
}

# Lançar aplicação
function Launch-App {
    param([string]$Device = $DeviceName)
    
    Write-Info "Lançando aplicação..."
    
    ares-launch $AppId -d $Device
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "App lançado"
    } else {
        Write-Error-Custom "Falha ao lançar app"
        exit 1
    }
}

# Debug (com Chrome DevTools)
function Debug-App {
    param([string]$Device = $DeviceName)
    
    Write-Info "Abrindo Debug (Chrome DevTools)..."
    
    ares-inspect $AppId -d $Device
}

# Ver logs
function Show-Logs {
    param([string]$Device = $DeviceName)
    
    Write-Info "Mostrando logs da aplicação..."
    
    ares-log -d $Device -a $AppId -f
}

# Menu principal
function Show-Menu {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║      📺  Digital Menu Board - WebOS Build Script (PowerShell)           ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Uso: .\webos-build.ps1 [comando] [device]" -ForegroundColor White
    Write-Host ""
    Write-Host "Comandos:" -ForegroundColor White
    Write-Host "  build              Build da aplicação"
    Write-Host "  clean              Limpar build anterior"
    Write-Host "  package            Empacotar para webOS (IPK)"
    Write-Host "  install            Instalar na TV"
    Write-Host "  launch             Lançar aplicação"
    Write-Host "  full               Build + Package + Install + Launch (completo)"
    Write-Host "  debug              Abrir Debug e DevTools"
    Write-Host "  logs               Ver logs da aplicação"
    Write-Host "  setup              Verificar setup de dependências"
    Write-Host "  menu               Mostrar este menu"
    Write-Host "  help               Mostrar ajuda"
    Write-Host ""
    Write-Host "Exemplos:" -ForegroundColor White
    Write-Host "  .\webos-build.ps1 build"
    Write-Host "  .\webos-build.ps1 full tv"
    Write-Host "  .\webos-build.ps1 debug tv"
    Write-Host ""
}

# Executar comando
function Invoke-Command {
    param(
        [string]$Cmd,
        [string]$Device
    )

    switch ($Cmd.ToLower()) {
        'build' {
            Test-Dependencies
            Build-App
        }
        'clean' {
            Clean-Build
        }
        'package' {
            Test-Dependencies
            Package-App
        }
        'install' {
            Test-Dependencies
            Install-App -Device $Device
        }
        'launch' {
            Test-Dependencies
            Launch-App -Device $Device
        }
        'full' {
            Test-Dependencies
            Clean-Build
            Build-App
            Copy-WebOSFiles
            Package-App
            Install-App -Device $Device
            Launch-App -Device $Device
            Write-Success "Build completo finalizado! ✅"
        }
        'debug' {
            Test-Dependencies
            Debug-App -Device $Device
        }
        'logs' {
            Show-Logs -Device $Device
        }
        'setup' {
            Test-Dependencies
        }
        'help' {
            Show-Menu
        }
        'menu' {
            Show-Menu
        }
        default {
            Write-Error-Custom "Comando desconhecido: $Cmd"
            Show-Menu
            exit 1
        }
    }
}

# Main
Invoke-Command -Cmd $Command -Device $DeviceName
