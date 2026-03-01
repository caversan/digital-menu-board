import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  onClick,
  hover = false,
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      className={className}
      onClick={onClick}
      clickable={!!onClick}
      hover={hover}
    >
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div<{
  variant: CardProps['variant'];
  padding: CardProps['padding'];
  clickable: boolean;
  hover: boolean;
}>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeInOut};
  
  /* Padding variants */
  ${({ padding, theme }) => {
    switch (padding) {
      case 'none':
        return 'padding: 0;';
      case 'sm':
        return `padding: ${theme.spacing.sm};`;
      case 'lg':
        return `padding: ${theme.spacing.xl};`;
      case 'md':
      default:
        return `padding: ${theme.spacing.md};`;
    }
  }}

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'elevated':
        return `
          box-shadow: ${theme.shadows.lg};
        `;
      case 'outlined':
        return `
          border: 1px solid ${theme.colors.border};
          box-shadow: none;
        `;
      case 'default':
      default:
        return `
          box-shadow: ${theme.shadows.sm};
        `;
    }
  }}

  /* Interactive states */
  ${({ clickable, hover, theme }) =>
    (clickable || hover) &&
    `
      cursor: pointer;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.xl};
      }
      
      &:active {
        transform: translateY(0);
      }
    `}
`;

// Card subcomponents
export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const CardContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

export const CardFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;
