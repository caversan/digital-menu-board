#!/bash/bash

# WebOS Build Script para Digital Menu Board
# Faz build, empacota e deploy para LG TV

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuração
APP_ID="com.example.digital-menu-board"
DEVICE_NAME="${1:-tv}"
BUILD_DIR="webos-build"
DIST_DIR="dist"

# Funções
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar dependências
check_dependencies() {
    log_info "Verificando dependências..."

    if ! command -v npm &> /dev/null; then
        log_error "npm não encontrado. Instale Node.js"
        exit 1
    fi

    if ! command -v ares-package &> /dev/null; then
        log_warning "ares-cli não encontrado. Execute: npm install -g @webos-tools/ares-cli"
        exit 1
    fi

    log_success "Dependências verificadas"
}

# Build da aplicação
build_app() {
    log_info "Building aplicação..."
    npm run build
    log_success "Build concluído"
}

# Limpar build anterior
clean_build() {
    log_info "Limpando build anterior..."
    rm -rf "$BUILD_DIR"
    mkdir -p "$BUILD_DIR"
    log_success "Build limpo"
}

# Copiar arquivos webOS
copy_webos_files() {
    log_info "Copiando arquivos webOS..."
    
    # Copiar appinfo.json
    if [ -f "webos/appinfo.json" ]; then
        cp webos/appinfo.json "$DIST_DIR/"
        log_success "appinfo.json copiado"
    else
        log_error "webos/appinfo.json não encontrado"
        exit 1
    fi

    # Copiar ícone
    if [ -f "webos/icon.png" ]; then
        mkdir -p "$DIST_DIR/icon"
        cp webos/icon.png "$DIST_DIR/icon/"
        log_success "Ícone copiado"
    else
        log_warning "webos/icon.png não encontrado (opcional)"
    fi
}

# Empacotar para webOS
package_app() {
    log_info "Empacotando aplicação para webOS..."
    
    # Usar ares-package para criar IPK
    ares-package "$DIST_DIR" \
        -o "$BUILD_DIR" \
        -n "$APP_ID" \
        -v "1.0.0"
    
    IPK_FILE=$(find "$BUILD_DIR" -name "*.ipk" -type f | head -n 1)
    
    if [ -f "$IPK_FILE" ]; then
        log_success "Pacote criado: $IPK_FILE"
    else
        log_error "Falha ao criar pacote IPK"
        exit 1
    fi
}

# Instalar na TV
install_app() {
    log_info "Instalando na TV ($DEVICE_NAME)..."
    
    ares-install "$BUILD_DIR"/*.ipk \
        -d "$DEVICE_NAME"
    
    log_success "App instalado"
}

# Lançar aplicação
launch_app() {
    log_info "Lançando aplicação..."
    
    ares-launch "$APP_ID" \
        -d "$DEVICE_NAME"
    
    log_success "App lançado"
}

# Debug (com Chrome DevTools)
debug_app() {
    log_info "Abrindo Debug (Chrome DevTools)..."
    
    ares-inspect "$APP_ID" \
        -d "$DEVICE_NAME"
}

# Ver logs
show_logs() {
    log_info "Mostrando logs da aplicação..."
    
    ares-log -d "$DEVICE_NAME" \
        -a "$APP_ID" \
        -f  # follow (contínuo)
}

# Menu principal
show_menu() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}📺  Digital Menu Board - WebOS Build Script${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "Uso: ./webos-build.sh [comando] [device]"
    echo ""
    echo "Comandos:"
    echo "  build              Build da aplicação"
    echo "  clean              Limpar build anterior"
    echo "  package            Empacotar para webOS (IPK)"
    echo "  install            Instalar na TV"
    echo "  launch             Lançar aplicação"
    echo "  full               Build + Package + Install + Launch (completo)"
    echo "  debug              Abrir Debug e DevTools"
    echo "  logs               Ver logs da aplicação"
    echo "  setup              Verificar setup de dependências"
    echo ""
    echo "Exemplos:"
    echo "  ./webos-build.sh build"
    echo "  ./webos-build.sh full tv     # Build completo no device 'tv'"
    echo "  ./webos-build.sh debug tv    # Debug no device 'tv'"
    echo ""
}

# Executar comando
main() {
    local command="${1:-menu}"
    local device="${2:-tv}"

    case "$command" in
        build)
            check_dependencies
            build_app
            ;;
        clean)
            clean_build
            ;;
        package)
            check_dependencies
            package_app
            ;;
        install)
            check_dependencies
            install_app "$device"
            ;;
        launch)
            check_dependencies
            launch_app "$device"
            ;;
        full)
            check_dependencies
            clean_build
            build_app
            copy_webos_files
            package_app
            install_app "$device"
            launch_app "$device"
            log_success "Build completo finalizado! ✅"
            ;;
        debug)
            check_dependencies
            debug_app "$device"
            ;;
        logs)
            show_logs "$device"
            ;;
        setup)
            check_dependencies
            ;;
        menu)
            show_menu
            ;;
        *)
            log_error "Comando desconhecido: $command"
            show_menu
            exit 1
            ;;
    esac
}

# Executar
main "$@"
