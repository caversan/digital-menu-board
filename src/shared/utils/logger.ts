/**
 * Logger utility for structured logging
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: Record<string, any>;
  stack?: string;
}

class Logger {
  private level: LogLevel;
  private enableConsole: boolean;
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;

  constructor(level: LogLevel = LogLevel.INFO, enableConsole: boolean = true) {
    this.level = level;
    this.enableConsole = enableConsole;
  }

  /**
   * Set the minimum log level
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }

  /**
   * Enable or disable console output
   */
  setConsoleEnabled(enabled: boolean): void {
    this.enableConsole = enabled;
  }

  /**
   * Get all stored logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Clear all stored logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  private log(level: LogLevel, levelName: string, message: string, context?: Record<string, any>): void {
    if (level < this.level) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: levelName,
      message,
      context,
    };

    // Store log entry
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output
    if (this.enableConsole) {
      const logMethod = this.getConsoleMethod(level);
      const prefix = `[${entry.timestamp}] [${levelName}]`;
      
      if (context) {
        logMethod(`${prefix} ${message}`, context);
      } else {
        logMethod(`${prefix} ${message}`);
      }
    }

    // Send to external service in production (if configured)
    if (level >= LogLevel.ERROR && typeof window !== 'undefined') {
      this.sendToExternalService(entry);
    }
  }

  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }

  private sendToExternalService(entry: LogEntry): void {
    // Implement external logging service integration here
    // e.g., Sentry, LogRocket, etc.
    // This is a placeholder for future implementation
  }

  /**
   * Log debug message
   */
  debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, context);
  }

  /**
   * Log info message
   */
  info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, 'INFO', message, context);
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, 'WARN', message, context);
  }

  /**
   * Log error message
   */
  error(message: string, context?: Record<string, any>): void {
    const stack = new Error().stack;
    this.log(LogLevel.ERROR, 'ERROR', message, { ...context, stack });
  }

  /**
   * Create a child logger with a specific context
   */
  child(defaultContext: Record<string, any>): Logger {
    const childLogger = new Logger(this.level, this.enableConsole);
    
    // Override log method to include default context
    const originalLog = childLogger.log.bind(childLogger);
    childLogger.log = (level: LogLevel, levelName: string, message: string, context?: Record<string, any>) => {
      originalLog(level, levelName, message, { ...defaultContext, ...context });
    };

    return childLogger;
  }
}

// Export singleton instance
export const logger = new Logger(
  process.env.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.DEBUG,
  true
);

// Export Logger class for custom instances
export { Logger };
