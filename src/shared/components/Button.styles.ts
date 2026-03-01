import styled from 'styled-components';
import type { ButtonProps } from './Button';

export const StyledButton = styled.button<{
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.fast} ${({ theme }) => theme.animations.easing.easeInOut};
  border: none;
  outline: none;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
          min-height: 32px;
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.lg};
          min-height: 48px;
        `;
      case 'md':
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.md};
          min-height: 40px;
        `;
    }
  }}

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.text};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.accent};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.primary};
            color: ${theme.colors.background};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.primary};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.surface};
          }
        `;
      case 'primary':
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.background};
          
          &:hover:not(:disabled) {
            background: ${theme.colors.secondary};
          }
        `;
    }
  }}

  /* Disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Focus state */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
