import React from 'react';
import {
  Container,
  FullScreenContainer,
  Message,
  Spinner,
  DotsLoader,
  PulseLoader,
  ErrorIcon,
  ErrorMessage,
} from './Loading.styles';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  message?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  message,
  fullScreen = false,
}) => {
  const LoadingComponent = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader size={size} />;
      case 'pulse':
        return <PulseLoader size={size} />;
      case 'spinner':
      default:
        return <Spinner size={size} />;
    }
  };

  if (fullScreen) {
    return (
      <FullScreenContainer>
        <LoadingComponent />
        {message && <Message>{message}</Message>}
      </FullScreenContainer>
    );
  }

  return (
    <Container>
      <LoadingComponent />
      {message && <Message>{message}</Message>}
    </Container>
  );
};

// Menu board specific loading
export const MenuBoardLoading: React.FC<{ message?: string }> = ({ 
  message = '🍽️ Carregando menu...' 
}) => (
  <Loading variant="pulse" size="lg" message={message} fullScreen />
);

// Error loading
export const ErrorLoading: React.FC<{ message?: string }> = ({ 
  message = '⚠️ Erro ao carregar dados' 
}) => (
  <FullScreenContainer>
    <ErrorIcon>⚠️</ErrorIcon>
    <ErrorMessage>{message}</ErrorMessage>
  </FullScreenContainer>
);
