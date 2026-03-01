/**
 * WebOS Native APIs
 * Interface com as APIs nativas da LG webOS
 */

// Interfaces webOS detectadas em runtime
declare global {
  interface Window {
    webOS?: WebOSObject;
    PalmServiceBridge?: PalmServiceBridgeObject;
    enyo?: EnyoObject;
    __WEBOS_DEBUG__?: boolean;
  }
}

// Tipos webOS
export interface WebOSObject {
  service: WebOSServiceManager;
  platform?: {
    tv?: boolean;
    phone?: boolean;
    desktop?: boolean;
  };
  xhrClient?: any;
  window?: any;
}

export interface WebOSServiceManager {
  request(
    uri: string,
    payload: WebOSServicePayload
  ): WebOSServiceSubscription;
  subscribe(
    uri: string,
    payload: WebOSServicePayload
  ): WebOSServiceSubscription;
}

export interface WebOSServicePayload {
  method?: string;
  parameters?: Record<string, any>;
  subscribe?: boolean;
  onSuccess?: (response: any) => void;
  onFailure?: (error: any) => void;
  onComplete?: (response: any) => void;
}

export interface WebOSServiceSubscription {
  cancel(): void;
}

export interface PalmServiceBridgeObject {
  appId?: string;
  onClose?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export interface EnyoObject {
  windows?: {
    getActiveWindow(): EnyoWindow;
  };
}

export interface EnyoWindow {
  close(): void;
  minimize(): void;
  maximize(): void;
  restore(): void;
}

/**
 * Detector de plataforma webOS
 */
export class WebOSPlatformDetector {
  private static _isWebOS: boolean | null = null;
  private static _isTV: boolean | null = null;

  /**
   * Verificar se está rodando em webOS
   */
  static isWebOS(): boolean {
    if (WebOSPlatformDetector._isWebOS !== null) {
      return WebOSPlatformDetector._isWebOS;
    }

    const isWebOS =
      !!(window as any).webOS ||
      !!(window as any).PalmServiceBridge ||
      !!(window as any).enyo;

    WebOSPlatformDetector._isWebOS = isWebOS;
    return isWebOS;
  }

  /**
   * Verificar se está em TV
   */
  static isTV(): boolean {
    if (WebOSPlatformDetector._isTV !== null) {
      return WebOSPlatformDetector._isTV;
    }

    const webOS = (window as any).webOS;
    if (webOS?.platform?.tv === true) {
      WebOSPlatformDetector._isTV = true;
      return true;
    }

    // Verificar userAgent para webOS
    const isTV = /webos|netcast|smarttv/i.test(navigator.userAgent);
    WebOSPlatformDetector._isTV = isTV;
    return isTV;
  }

  /**
   * Obter versão webOS
   */
  static getWebOSVersion(): string | null {
    const match = navigator.userAgent.match(/webOS\/(\d+\.\d+)/);
    return match ? match[1] : null;
  }

  /**
   * Obter modelo da TV
   */
  static getTVModel(): string | null {
    const match = navigator.userAgent.match(/\((.*?)\)/);
    return match ? match[1] : null;
  }
}

/**
 * Gerenciador de informações do dispositivo
 */
export class WebOSDeviceInfo {
  /**
   * Obter app ID
   */
  static getAppId(): string {
    return (window as any).PalmServiceBridge?.appId || 'com.example.digital-menu-board';
  }

  /**
   * Obter informações do sistema
   */
  static async getSystemInfo(): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const webOS = (window as any).webOS;
      if (!webOS?.service) {
        reject(new Error('webOS service não disponível'));
        return;
      }

      webOS.service.request('luna://com.webos.service.sm', {
        method: 'getInfo',
        parameters: {},
        onSuccess: (response: any) => {
          resolve(response);
        },
        onFailure: (error: any) => {
          reject(error);
        }
      });
    });
  }

  /**
   * Obter configurações de tela
   */
  static async getDisplayInfo(): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
      const webOS = (window as any).webOS;
      if (!webOS?.service) {
        reject(new Error('webOS service não disponível'));
        return;
      }

      webOS.service.request('luna://com.webos.settingsservice', {
        method: 'getSystemSettings',
        parameters: {
          keys: ['screenHeight', 'screenWidth', 'screenRefreshRate']
        },
        onSuccess: (response: any) => {
          resolve(response);
        },
        onFailure: (error: any) => {
          reject(error);
        }
      });
    });
  }
}

/**
 * Utilidades para ciclo de vida de aplicação
 */
export class WebOSApplicationLifecycle {
  private static pauseCallbacks: Set<() => void> = new Set();
  private static resumeCallbacks: Set<() => void> = new Set();

  /**
   * Registrar callback para pausa (backgrounding)
   */
  static onPause(callback: () => void): void {
    WebOSApplicationLifecycle.pauseCallbacks.add(callback);
  }

  /**
   * Registrar callback para retoma (foregrounding)
   */
  static onResume(callback: () => void): void {
    WebOSApplicationLifecycle.resumeCallbacks.add(callback);
  }

  /**
   * Inicializar listeners de ciclo de vida
   */
  static initialize(): void {
    const bridge = (window as any).PalmServiceBridge;
    if (!bridge) return;

    // Pausa quando app sai do foco
    if (bridge.onPause) {
      bridge.onPause = () => {
        console.log('📺 App paused');
        WebOSApplicationLifecycle.pauseCallbacks.forEach(cb => cb());
      };
    }

    // Retoma quando app retorna ao foco
    if (bridge.onResume) {
      bridge.onResume = () => {
        console.log('📺 App resumed');
        WebOSApplicationLifecycle.resumeCallbacks.forEach(cb => cb());
      };
    }
  }
}

/**
 * Log e debug webOS
 */
export class WebOSDebug {
  static logInfo(): void {
    const isWebOS = WebOSPlatformDetector.isWebOS();
    const isTV = WebOSPlatformDetector.isTV();
    const version = WebOSPlatformDetector.getWebOSVersion();
    const model = WebOSPlatformDetector.getTVModel();
    const appId = WebOSDeviceInfo.getAppId();

    console.log(`
╔═══════════════════════════════════════════════════════════╗
║            📺 WebOS Platform Information                  ║
╠═══════════════════════════════════════════════════════════╣
║ WebOS Detectado:      ${isWebOS ? '✅ SIM' : '❌ NÃO'}                        ║
║ TV Detectada:         ${isTV ? '✅ SIM' : '❌ NÃO'}                        ║
║ Versão webOS:         ${version ? `${version}` : 'Desconhecida'}             ║
║ Modelo TV:            ${model ? `${model}` : 'Desconhecido'}              ║
║ App ID:               ${appId}          ║
║ User Agent:           ${navigator.userAgent.substring(0, 40)}... ║
║ Resolution:           ${window.innerWidth}x${window.innerHeight}              ║
╚═══════════════════════════════════════════════════════════╝
    `);
  }

  /**
   * Habilitar debug mode global
   */
  static enableDebugMode(): void {
    (window as any).__WEBOS_DEBUG__ = true;
    console.log('🔍 WebOS Debug Mode HABILITADO');
  }

  /**
   * Desabilitar debug mode
   */
  static disableDebugMode(): void {
    (window as any).__WEBOS_DEBUG__ = false;
    console.log('🔍 WebOS Debug Mode DESABILITADO');
  }
}
