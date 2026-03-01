import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  
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
  background: #000;
  
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
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
  opacity: ${({ visible }) => visible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

export const ProgressBar = styled.div<{ progress: number; color: string }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${({ color }) => color};
  transition: width 0.1s linear;
`;

export const DebugControls = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  opacity: ${({ visible }) => visible ? 1 : 0};
  pointer-events: ${({ visible }) => visible ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.25rem 0.5rem;
    margin: 0.125rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.75rem;
    
    &:hover {
      background: #0056b3;
    }
    
    &:disabled {
      background: #666;
      cursor: not-allowed;
    }
  }
`;

export const FallbackDisplay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  color: #fff;
  font-size: 2rem;
  
  h1 {
    margin: 0;
  }
`;
