/**
 * WebOS Utility Functions
 * Funções utilitárias para desenvolvimento em webOS
 */

import { WebOSPlatformDetector, WebOSApplicationLifecycle, WebOSDebug } from './webos-api';

/**
 * Feature detection para webOS APIs
 */
export class WebOSFeatures {
  private static features: Map<string, boolean> = new Map();

  /**
   * Verificar se webOS.service está disponível
   */
  static hasWebOSService(): boolean {
    const key = 'webos-service';
    if (this.features.has(key)) {
      return this.features.get(key)!;
    }

    const has = !!(window as any).webOS?.service;
    this.features.set(key, has);
    return has;
  }

  /**
   * Verificar se PalmServiceBridge está disponível
   */
  static hasPalmServiceBridge(): boolean {
    const key = 'palm-service-bridge';
    if (this.features.has(key)) {
      return this.features.get(key)!;
    }

    const has = !!(window as any).PalmServiceBridge;
    this.features.set(key, has);
    return has;
  }

  /**
   * Verificar se Enyo está disponível
   */
  static hasEnyo(): boolean {
    const key = 'enyo';
    if (this.features.has(key)) {
      return this.features.get(key)!;
    }

    const has = !!(window as any).enyo;
    this.features.set(key, has);
    return has;
  }

  /**
   * Obter lista de features disponíveis
   */
  static getAvailableFeatures(): string[] {
    const features: string[] = [];

    if (this.hasWebOSService()) features.push('webOS.service');
    if (this.hasPalmServiceBridge()) features.push('PalmServiceBridge');
    if (this.hasEnyo()) features.push('Enyo');

    return features;
  }
}

/**
 * Gerenciador de modo de kiosk (restricted mode)
 */
export class WebOSKioskMode {
  private static isKioskMode = false;
  private static blockedFeatures: Set<string> = new Set();

  /**
   * Ativar modo kiosk (restringe funcionalidades)
   */
  static enableKioskMode(): void {
    WebOSKioskMode.isKioskMode = true;
    console.log('🔒 Modo Kiosk ATIVADO - Funcionalidades restritas');

    // Bloquear acesso a APIs do sistema
    this.blockSystemAPIs();
  }

  /**
   * Desativar modo kiosk
   */
  static disableKioskMode(): void {
    WebOSKioskMode.isKioskMode = false;
    console.log('🔓 Modo Kiosk DESATIVADO');
  }

  /**
   * Bloquear APIs do sistema
   */
  private static blockSystemAPIs(): void {
    // Tentar bloquear navegação
    window.history.replaceState = () => {};
    window.history.pushState = () => {};
    window.history.back = () => {};
    window.history.forward = () => {};

    // Bloquear focus em elementos específicos
    (document as any).hasFocus = () => true;

    this.blockedFeatures.add('window.history');
    this.blockedFeatures.add('document.focus');

    console.log(`🔒 ${this.blockedFeatures.size} APIs de sistema bloqueadas`);
  }

  /**
   * Verificar se está em modo kiosk
   */
  static isActive(): boolean {
    return WebOSKioskMode.isKioskMode;
  }

  /**
   * Obter lista de features bloqueadas
   */
  static getBlockedFeatures(): string[] {
    return Array.from(this.blockedFeatures);
  }
}

/**
 * Gerenciador de tema para TV (otimizado para telas grandes)
 */
export class WebOSTVTheme {
  private static screenWidth = window.innerWidth;
  private static screenHeight = window.innerHeight;

  /**
   * Obter tamanho recomendado de fonte para TV
   */
  static getFontSize(scale: 'small' | 'medium' | 'large' = 'medium'): number {
    // TVs geralmente precisam de fontes maiores para legibilidade
    const baseFontSize = Math.max(16, this.screenWidth / 40);

    switch (scale) {
      case 'small':
        return baseFontSize * 0.8;
      case 'medium':
        return baseFontSize * 1.2;
      case 'large':
        return baseFontSize * 1.6;
      default:
        return baseFontSize;
    }
  }

  /**
   * Obter padding recomendado para elementos
   */
  static getPadding(element: 'button' | 'card' | 'container'): number {
    // TVs precisam de mais espaço entre elementos para facilitar navegação com remote
    const baseUnit = Math.max(8, this.screenWidth / 100);

    switch (element) {
      case 'button':
        return baseUnit * 2;
      case 'card':
        return baseUnit * 2.5;
      case 'container':
        return baseUnit * 3;
      default:
        return baseUnit * 2;
    }
  }

  /**
   * Obter altura mínima de hit target (para seleção com remote)
   */
  static getMinTouchTarget(): number {
    // Recomendado para TVs: ~44px mínimo (vs 40px para mobile)
    return Math.max(44, this.screenWidth / 30);
  }

  /**
   * Obter zoom CSS recomendado
   */
  static getScale(): number {
    // Se houver escala de dispositivo, usar
    if (window.devicePixelRatio > 1) {
      return window.devicePixelRatio;
    }

    // Se for TV 4K em 1080p, pode precisar de ajustes
    if (this.screenWidth > 2560) {
      return 2;
    }

    return 1;
  }

  /**
   * Obter paleta de cores otimizada para TV
   */
  static getColorPalette() {
    return {
      // TVs LCD precisam de contrast alto
      primary: '#00AA00', // Verde
      secondary: '#0066CC', // Azul
      background: '#000000', // Negro puro (evita glow)
      foreground: '#FFFFFF', // Branco puro
      success: '#00DD00',
      warning: '#FFAA00',
      error: '#FF0000',
      border: '#333333'
    };
  }

  /**
   * Aplicar CSS de otimização para TV
   */
  static applyTVOptimizations(): void {
    const style = document.createElement('style');
    style.textContent = `
      * {
        /* Evitar subpixel rendering em TVs */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      body {
        /* Escala para TV */
        zoom: ${this.getScale()};
        /* Fundo preto puro evita glow */
        background-color: #000000;
      }
      
      button, [role="button"] {
        /* Hit targets maiores para remote */
        min-height: ${this.getMinTouchTarget()}px;
        min-width: ${this.getMinTouchTarget()}px;
        /* Sem hover (não tem mouse em TV) */
        cursor: default;
      }
    `;

    document.head.appendChild(style);
    console.log('📺 Otimizações para TV aplicadas');
  }
}

/**
 * Gerenciador de memória para TV (recursos limitados)
 */
export class WebOSMemoryManager {
  private static memoryWarnings = 0;
  private static maxMemoryMB = 50; // Default ~50MB para apps webOS

  /**
   * Obter uso de memória estimado
   */
  static estimateMemoryUsage(): number {
    if ((performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize / (1024 * 1024);
    }
    return -1; // Indisponível
  }

  /**
   * Verificar se está próximo do limite de memória
   */
  static isMemoryWarning(): boolean {
    const usage = this.estimateMemoryUsage();
    return usage > 0 && usage > this.maxMemoryMB * 0.8; // 80% do limite
  }

  /**
   * Forçar limpeza de memória (garbage collection hint)
   */
  static forceCleanup(): void {
    // Sugerir garbage collection (não é obrigatório)
    if ((window as any).gc) {
      (window as any).gc();
      console.log('🧹 Memória limpa (GC sugerido)');
    }

    // Limpar event listeners não essenciais
    // Limpar caches
    // Descarregar imagens fora da tela
  }

  /**
   * Monitorar memória continuamente
   */
  static startMemoryMonitoring(intervalMs = 5000): void {
    setInterval(() => {
      const usage = this.estimateMemoryUsage();
      if (usage > 0) {
        console.log(`📊 Memória: ${usage.toFixed(2)}MB / ${this.maxMemoryMB}MB`);

        if (this.isMemoryWarning()) {
          this.memoryWarnings++;
          console.warn(
            `⚠️ Aviso de memória #${this.memoryWarnings}: Alta utilização (${usage.toFixed(2)}MB)`
          );

          if (this.memoryWarnings > 3) {
            console.error('🔴 Memória crítica! Reiniciando app...');
            window.location.reload();
          }
        }
      }
    }, intervalMs);
  }
}

/**
 * Inicializador completo de webOS
 */
export class WebOSInitializer {
  /**
   * Inicializar toda a plataforma webOS
   */
  static initialize(options: {
    debug?: boolean;
    kioskMode?: boolean;
    memoryMonitoring?: boolean;
    tvOptimizations?: boolean;
  } = {}): void {
    const {
      debug = false,
      kioskMode = true,
      memoryMonitoring = true,
      tvOptimizations = true
    } = options;

    console.log('📺 Inicializando webOS Platform...');

    // Debug info
    if (debug) {
      WebOSDebug.enableDebugMode();
      WebOSDebug.logInfo();
    }

    // Log features disponíveis
    const features = WebOSFeatures.getAvailableFeatures();
    console.log(`✅ Features disponíveis: ${features.join(', ') || 'Nenhuma'}`);

    // Ativar modo kiosk
    if (kioskMode && WebOSPlatformDetector.isWebOS()) {
      WebOSKioskMode.enableKioskMode();
    }

    // Aplicar otimizações para TV
    if (tvOptimizations && WebOSPlatformDetector.isTV()) {
      WebOSTVTheme.applyTVOptimizations();
    }

    // Inicializar ciclo de vida
    WebOSApplicationLifecycle.initialize();

    // Monitorar memória
    if (memoryMonitoring && WebOSPlatformDetector.isWebOS()) {
      WebOSMemoryManager.startMemoryMonitoring();
    }

    console.log('✅ WebOS Platform inicializado com sucesso!');
  }
}
