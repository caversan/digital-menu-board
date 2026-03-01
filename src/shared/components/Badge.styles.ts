import styled from 'styled-components';
import type { BadgeProps } from './Badge';

export const StyledBadge = styled.span<{
  variant: BadgeProps['variant'];
  size: BadgeProps['size'];
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  white-space: nowrap;
  
  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.xs};
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.md};
        `;
      case 'md':
      default:
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.typography.fontSize.sm};
        `;
    }
  }}

  /* Variant colors */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.background};
        `;
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.background};
        `;
      case 'success':
        return `
          background: ${theme.colors.success};
          color: white;
        `;
      case 'warning':
        return `
          background: ${theme.colors.warning};
          color: white;
        `;
      case 'error':
        return `
          background: ${theme.colors.error};
          color: white;
        `;
      case 'default':
      default:
        return `
          background: ${theme.colors.surface};
          color: ${theme.colors.textSecondary};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}
`;
