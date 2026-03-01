import React from 'react';
import {
  StyledCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card.styles';

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

// Re-export styled components
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
