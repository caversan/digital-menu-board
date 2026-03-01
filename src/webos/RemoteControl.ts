/**
 * WebOS Remote Control Handler
 * Gerencia entrada do controle remoto da LG TV
 * Permite apenas: EXIT (fechar app) e bloqueia tudo mais
 */

export interface RemoteKeyEvent {
  keyCode: number;
  keyName: string;
  isDown: boolean;
  isUp: boolean;
  isRepeat: boolean;
}

// Map de teclas webOS/webKit
const KEY_CODES = {
  // Teclas de navegação (BLOQUEADAS)
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  
  // Teclas de cores (BLOQUEADAS)
  RED: 403,
  GREEN: 404,
  YELLOW: 405,
  BLUE: 406,
  
  // Teclas de media (BLOQUEADAS)
  PLAY: 415,
  PAUSE: 19,
  STOP: 413,
  FF: 417,
  RW: 412,
  
  // Volume e Canal (BLOQUEADAS)
  VOLUME_UP: 447,
  VOLUME_DOWN: 448,
  MUTE: 449,
  CH_UP: 428,
  CH_DOWN: 427,
  
  // Home e Back (BLOQUEADAS)
  HOME: 36,
  BACK: 27,
  
  // ✅ EXIT - ÚNICA TECLA PERMITIDA
  EXIT: 27,
  
  // Power (BLOQUEADA)
  POWER: 116,
};

// Alternativas para EXIT em diferentes webOS
const EXIT_CODES = [27, 461]; // ESC + webOS Back button

/**
 * Gerenciador centralizado de controle remoto webOS
 */
export class WebOSRemoteControl {
  private static instance: WebOSRemoteControl;
  private blockedKeys: Set<number> = new Set();
  private isEnabled: boolean = true;
  private debugMode: boolean = false;

  private constructor(debugMode: boolean = false) {
    this.debugMode = debugMode;
    this.initializeBlockedKeys();
    this.attachListeners();
    this.logInitialization();
  }

  /**
   * Obter instância singleton
   */
  static getInstance(debugMode: boolean = false): WebOSRemoteControl {
    if (!WebOSRemoteControl.instance) {
      WebOSRemoteControl.instance = new WebOSRemoteControl(debugMode);
    }
    return WebOSRemoteControl.instance;
  }

  /**
   * Configurar todas as teclas como bloqueadas (exceto EXIT)
   */
  private initializeBlockedKeys(): void {
    // Bloquear TUDO exceto EXIT
    Object.entries(KEY_CODES).forEach(([name, code]) => {
      if (!EXIT_CODES.includes(code)) {
        this.blockedKeys.add(code);
      }
    });

    // Adicionar mais códigos comuns a bloquear
    const additionalBlockedCodes = [
      8, // Backspace
      9, // Tab
      11, // Vertical Tab
      12, // Form Feed
      16, // Shift
      17, // Ctrl
      18, // Alt
      20, // Caps Lock
      91, // Windows/Cmd
      92, // Windows Menu
      93, // Windows Right
      96, // Numpad 0
      97, // Numpad 1
      // ... numpad até 105
    ];

    for (let i = 96; i <= 105; i++) {
      this.blockedKeys.add(i); // Numpad 0-9
    }

    additionalBlockedCodes.forEach(code => this.blockedKeys.add(code));
  }

  /**
   * Anexar listeners de teclado
   */
  private attachListeners(): void {
    // Evento de tecla pressionada
    document.addEventListener('keydown', (event) => {
      this.handleKeyEvent(event, 'down');
    }, true); // Captura

    // Evento de tecla liberada
    document.addEventListener('keyup', (event) => {
      this.handleKeyEvent(event, 'up');
    }, true);

    // Evento de tecla (fallback)
    document.addEventListener('keypress', (event) => {
      this.handleKeyEvent(event, 'press');
    }, true);

    // Desabilitar context menu (clique direito)
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.log('ContextMenu blocked');
    });

    // Desabilitar drag
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      this.log('Drag blocked');
    });

    this.log('Event listeners attached');
  }

  /**
   * Processar evento de teclado
   */
  private handleKeyEvent(
    event: KeyboardEvent,
    eventType: 'down' | 'up' | 'press'
  ): void {
    const keyCode = event.keyCode;
    const key = event.key;

    // ✅ PERMITIR: EXIT
    if (EXIT_CODES.includes(keyCode)) {
      this.log(`✅ EXIT KEY (${eventType}) - Permitido`, { keyCode, key });
      
      if (eventType === 'down') {
        // Mostrar feedback visual
        this.showExitConfirmation();
      }
      
      if (eventType === 'up') {
        // Executar saída
        this.closeApplication();
      }
      
      return; // NÃO prevenir padrão para EXIT
    }

    // ❌ BLOQUEAR: Qualquer outra tecla
    if (this.blockedKeys.has(keyCode)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      this.log(`🔒 BLOCKED: ${key} (${eventType})`, { keyCode });
      return;
    }

    // Bloquear também teclas não mapeadas
    if (eventType === 'down' || eventType === 'press') {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      
      this.log(`🔒 UNKNOWN KEY BLOCKED: ${key} (${eventType})`, { keyCode });
    }
  }

  /**
   * Mostrar confirmação visual antes de fechar
   */
  private showExitConfirmation(): void {
    const overlay = document.getElementById('webos-exit-overlay');
    
    if (!overlay) {
      const div = document.createElement('div');
      div.id = 'webos-exit-overlay';
      div.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        border: 4px solid #ff6b00;
      `;
      div.innerHTML = `
        <div style="
          color: #fff;
          font-size: 48px;
          font-weight: bold;
          text-align: center;
          font-family: Arial, sans-serif;
        ">
          🔴 Fechando aplicação...
        </div>
      `;
      document.body.appendChild(div);
      
      setTimeout(() => {
        div.remove();
      }, 500);
    }
  }

  /**
   * Fechar aplicação webOS
   */
  private closeApplication(): void {
    this.log('🔴 Executando closeApplication()');

    try {
      // Tentar usar webOS Enyo/PalmService
      if ((window as any).webOS) {
        this.log('📺 webOS object found - Usando webOS exit');
        
        // Método 1: webOS.xhrClient
        if ((window as any).webOS.service) {
          (window as any).webOS.service.request('luna://com.webos.applicationManager', {
            method: 'close',
            parameters: {
              id: (window as any).PalmServiceBridge?.appId || 'com.example.digital-menu-board'
            },
            onSuccess: () => {
              this.log('✅ App closed via webOS service');
            },
            onFailure: (error: any) => {
              this.log('❌ webOS service error:', error);
              this.fallbackClose();
            }
          });
          return;
        }
      }

      // Método 2: PalmServiceBridge (mais antigo)
      if ((window as any).PalmServiceBridge) {
        this.log('📺 PalmServiceBridge found');
        (window as any).PalmServiceBridge.onClose();
        return;
      }

      // Método 3: Enyo (framework antigo webOS)
      if ((window as any).enyo && (window as any).enyo.windows) {
        this.log('📺 Enyo framework found');
        (window as any).enyo.windows.getActiveWindow().close();
        return;
      }

      // Fallback: Todas as tentativas falharam
      this.fallbackClose();
    } catch (error) {
      this.log('❌ Error closing app:', error);
      this.fallbackClose();
    }
  }

  /**
   * Fechar por fallback (quando webOS APIs não disponíveis)
   */
  private fallbackClose(): void {
    this.log('⚠️ Usando fallback close method');
    
    // Tentar window.close()
    window.close();
    
    // Se não funcionar, mostrar mensagem
    setTimeout(() => {
      if (!document.hidden) {
        alert('❌ Erro ao fechar app. Pressione EXIT novamente ou use o menu da TV.');
        this.log('❌ Fallback close failed - app ainda ativo');
      }
    }, 1000);
  }

  /**
   * Habilitar/desabilitar bloqueio de teclado
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    this.log(`Controle remoto ${enabled ? 'habilitado' : 'desabilitado'}`);
  }

  /**
   * Debug logging
   */
  private log(message: string, data?: any): void {
    if (this.debugMode || (window as any).__WEBOS_DEBUG__) {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[WebOS Remote ${timestamp}] ${message}`, data || '');
    }
  }

  /**
   * Log de inicialização
   */
  private logInitialization(): void {
    console.log(`
╔════════════════════════════════════════════════════════╗
║     📺 WebOS Remote Control Initialized                ║
╠════════════════════════════════════════════════════════╣
║ Tecla Permitida:  EXIT/BACK (para fechar)              ║
║ Outras Teclas:    🔒 BLOQUEADAS                        ║
║ Debug Mode:       ${this.debugMode ? '✅ ON' : '❌ OFF'}                     ║
║ Detectado webOS:  ${(window as any).webOS ? '✅ SIM' : '❌ NÃO'}                  ║
╚════════════════════════════════════════════════════════╝
    `);
  }
}

/**
 * Inicializar automaticamente na importação
 */
export function initializeWebOSRemoteControl(debugMode: boolean = false) {
  return WebOSRemoteControl.getInstance(debugMode);
}
