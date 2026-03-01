import React from 'react';
import styled from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
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
          color: ${theme.colors.text};
          
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
            opacity: 0.9;
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
        `;
    }
  }}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
