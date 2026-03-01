import styled, { keyframes } from 'styled-components';
import type { LoadingProps } from './Loading';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const FullScreenContainer = styled(Container)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 9999;
`;

export const Message = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

// Spinner variant animations
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<{ size: LoadingProps['size'] }>`
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'width: 24px; height: 24px; border-width: 2px;';
      case 'lg':
        return 'width: 64px; height: 64px; border-width: 4px;';
      case 'md':
      default:
        return 'width: 40px; height: 40px; border-width: 3px;';
    }
  }}
  
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.primary};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

// Dots variant animation
const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const DotsLoader = styled.div<{ size: LoadingProps['size'] }>`
  display: flex;
  gap: ${({ size }) => (size === 'lg' ? '12px' : size === 'sm' ? '6px' : '8px')};

  &::before,
  &::after {
    content: '';
    ${({ size }) => {
      switch (size) {
        case 'sm':
          return 'width: 8px; height: 8px;';
        case 'lg':
          return 'width: 16px; height: 16px;';
        case 'md':
        default:
          return 'width: 12px; height: 12px;';
      }
    }}
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: ${bounce} 1.4s infinite ease-in-out both;
  }

  &::before {
    animation-delay: -0.32s;
  }

  &::after {
    animation-delay: -0.16s;
  }
`;

// Pulse variant animation
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
`;

export const PulseLoader = styled.div<{ size: LoadingProps['size'] }>`
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return 'width: 32px; height: 32px;';
      case 'lg':
        return 'width: 80px; height: 80px;';
      case 'md':
      default:
        return 'width: 48px; height: 48px;';
    }
  }}
  
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin: 0;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;
