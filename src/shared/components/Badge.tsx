import React from 'react';
import { StyledBadge } from './Badge.styles';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
}) => {
  return (
    <StyledBadge variant={variant} size={size} className={className}>
      {children}
    </StyledBadge>
  );
};

// Predefined badge components for common use cases
export const NewBadge: React.FC<{ size?: BadgeProps['size'] }> = ({ size }) => (
  <Badge variant="success" size={size}>
    🆕 Novo
  </Badge>
);

export const PromotionBadge: React.FC<{ size?: BadgeProps['size'] }> = ({ size }) => (
  <Badge variant="error" size={size}>
    🔥 Promoção
  </Badge>
);

export const BestsellerBadge: React.FC<{ size?: BadgeProps['size'] }> = ({ size }) => (
  <Badge variant="warning" size={size}>
    ⭐ Mais Vendido
  </Badge>
);

export const VegetarianBadge: React.FC<{ size?: BadgeProps['size'] }> = ({ size }) => (
  <Badge variant="success" size={size}>
    🌱 Vegetariano
  </Badge>
);

export const SpicyBadge: React.FC<{ size?: BadgeProps['size'] }> = ({ size }) => (
  <Badge variant="error" size={size}>
    🌶️ Picante
  </Badge>
);
