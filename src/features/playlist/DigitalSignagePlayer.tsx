import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { usePlaylist } from './usePlaylist';
import { MenuBoard } from '../menu-board/components/MenuBoard';
import type { MenuBoardSettings } from '../../shared/types';

interface DigitalSignagePlayerProps {
  settings: MenuBoardSettings;
  showControls?: boolean;
  autoStart?: boolean;
}

export const DigitalSignagePlayer: React.FC<DigitalSignagePlayerProps> = ({
  settings,
  showControls = false,
  autoStart = true
}) => {
  const [debugVisible, setDebugVisible] = useState(showControls);
  
  const {
    currentCategory,
    currentMedia,
    isShowingMedia,
    progressPercentage,
    playlistState,
    pausePlaylist,
    resumePlaylist,
    skipToNext,
    skipToPrevious,
    restartPlaylist,
    analytics
  } = usePlaylist(settings, { paused: !autoStart });

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'd' && event.ctrlKey) {
      event.preventDefault();
      setDebugVisible(prev => !prev);
    }
  }, []);

  // Always show menu board if no current category (fallback)
  const shouldShowMenuBoard = !isShowingMedia;
  const displayCategory = currentCategory || settings.menuData?.categories[0];

  return (
    <Container onKeyDown={handleKeyPress} tabIndex={0}>
      <CategoryDisplay isVisible={shouldShowMenuBoard}>
        {displayCategory && settings.menuData ? (
          <MenuBoard
            settings={{
              ...settings,
              activeCategory: displayCategory.id
            }}
          />
        ) : (
          <FallbackDisplay>
            <h1>🍽️ Carregando menu...</h1>
          </FallbackDisplay>
        )}
      </CategoryDisplay>

      <MediaDisplay isVisible={isShowingMedia && !!currentMedia}>
        {currentMedia && currentMedia.type === 'video' && (
          <video
            src={currentMedia.url}
            autoPlay
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {currentMedia && currentMedia.type === 'image' && (
          <img
            src={currentMedia.url}
            alt={currentMedia.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </MediaDisplay>

      <ProgressOverlay visible={!playlistState.paused}>
        <ProgressBar
          progress={progressPercentage}
          color={settings.theme.colors.primary}
        />
      </ProgressOverlay>

      <DebugControls visible={debugVisible}>
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>Estado da Playlist</strong>
        </div>
        
        <div style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}>
          Status: {playlistState.paused ? 'Pausado' : 'Ativo'}<br/>
          Categoria: {currentCategory?.name || 'N/A'}<br/>
          Mídia: {isShowingMedia ? currentMedia?.title || 'N/A' : 'Menu'}<br/>
          Progresso: {Math.round(progressPercentage)}%<br/>
          Tempo decorrido: {Math.round(playlistState.elapsedTime / 1000)}s<br/>
          Total exibições: {analytics.totalDisplays}<br/>
          Ciclos completos: {analytics.completeCycles}
        </div>

        <div>
          <button
            onClick={playlistState.paused ? resumePlaylist : pausePlaylist}
          >
            {playlistState.paused ? 'Play ▶️' : 'Pause ⏸️'}
          </button>
          <button onClick={skipToPrevious}>⏮️ Anterior</button>
          <button onClick={skipToNext}>⏭️ Próximo</button>
          <button onClick={restartPlaylist}>🔄 Reiniciar</button>
        </div>
      </DebugControls>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  
  &:focus {
    outline: none;
  }
`;

const CategoryDisplay = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 100%;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
`;

const MediaDisplay = styled.div<{ isVisible: boolean }>`
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

const ProgressOverlay = styled.div<{ visible: boolean }>`
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

const ProgressBar = styled.div<{ progress: number; color: string }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: ${({ color }) => color};
  transition: width 0.1s linear;
`;

const DebugControls = styled.div<{ visible: boolean }>`
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

const FallbackDisplay = styled.div`
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