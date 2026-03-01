import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  
  &:focus {
    outline: none;
  }
`;

export const CategoryDisplay = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
`;

export const MediaDisplay = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.background};
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressOverlay = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${({ theme }) => theme.colors.surface};
  opacity: ${({ visible }) => visible ? 0.3 : 0};
  z-index: 2000;
  transition: opacity ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};
`;

export const ProgressBar = styled.div<{ progress: number; color: string }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${({ color }) => color};
  transition: width ${({ theme }) => theme.animations.duration.fast} linear;
`;

export const DebugControls = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3000;
  background: ${({ theme }) => theme.colors.surface};
  opacity: ${({ visible }) => visible ? 0.95 : 0};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  pointer-events: ${({ visible }) => visible ? 'auto' : 'none'};
  transition: opacity ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.easeOut};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  
  button {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
    border: none;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    margin: ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    cursor: pointer;
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    transition: background ${({ theme }) => theme.animations.duration.fast};
    
    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
    
    &:disabled {
      background: ${({ theme }) => theme.colors.border};
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

export const FallbackDisplay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  
  h1 {
    margin: 0;
  }
`;
