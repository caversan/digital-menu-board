import type { Theme } from '../types/theme';

export const modernTheme: Theme = {
  name: 'modern',
  colors: {
    primary: '#ff6b35',
    secondary: '#f7931e',
    accent: '#ffd23f',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    border: '#404040',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

export const elegantTheme: Theme = {
  ...modernTheme,
  name: 'elegant',
  colors: {
    primary: '#2c3e50',
    secondary: '#34495e',
    accent: '#e74c3c',
    background: '#ecf0f1',
    surface: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#bdc3c7',
    error: '#e74c3c',
    warning: '#f39c12',
    success: '#27ae60',
  },
  typography: {
    ...modernTheme.typography,
    fontFamily: 'Playfair Display, Georgia, serif',
  },
};

export const vibrantTheme: Theme = {
  ...modernTheme,
  name: 'vibrant',
  colors: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    accent: '#fbbf24',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
  },
};

export const minimalistTheme: Theme = {
  ...modernTheme,
  name: 'minimalist',
  colors: {
    primary: '#000000',
    secondary: '#666666',
    accent: '#ff0000',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e9ecef',
    error: '#dc3545',
    warning: '#ffc107',
    success: '#28a745',
  },
  typography: {
    ...modernTheme.typography,
    fontFamily: 'Roboto, Arial, sans-serif',
  },
};