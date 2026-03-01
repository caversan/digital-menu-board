import React, { useState, useCallback, useMemo } from 'react';
import { usePlaylist } from './usePlaylist';
import { MenuBoard } from '../menu-board/components/MenuBoard';
import type { MenuBoardSettings } from '../../shared/types';
import {
  Container,
  CategoryDisplay,
  MediaDisplay,
  ProgressOverlay,
  ProgressBar,
  DebugControls,
  FallbackDisplay,
} from './DigitalSignagePlayer.styles';

interface DigitalSignagePlayerProps {
  settings: MenuBoardSettings;
  showControls?: boolean;
  autoStart?: boolean;
}

const DigitalSignagePlayerComponent: React.FC<DigitalSignagePlayerProps> = ({
  settings,
  showControls = false,
  autoStart = true,
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
    onVideoEnded,
    onVideoTimeUpdate,
    analytics
  } = usePlaylist(settings, { paused: !autoStart,
  });

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'd' && event.ctrlKey) {
      event.preventDefault();
      setDebugVisible(prev => !prev);
    }
  }, []);

  // Handler para atualizar progresso do vídeo
  const handleVideoTimeUpdate = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    onVideoTimeUpdate(video.currentTime, video.duration);
  }, [onVideoTimeUpdate]);

  // Always show menu board if no current category (fallback)
  const shouldShowMenuBoard = !isShowingMedia;
  const displayCategory = currentCategory || settings.menuData?.categories[0];

  // Memoizar settings para o MenuBoard para evitar re-renders desnecessários
  const menuBoardSettings = useMemo(() => ({
    ...settings,
    activeCategory: displayCategory?.id
  }), [settings, displayCategory?.id]);

  return (
    <Container onKeyDown={handleKeyPress} tabIndex={0}>
      <CategoryDisplay isVisible={shouldShowMenuBoard}>
        {displayCategory && settings.menuData ? (
          <MenuBoard settings={menuBoardSettings} />
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
            onEnded={onVideoEnded}
            onTimeUpdate={handleVideoTimeUpdate}
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

// Memoizar componente para evitar re-renders desnecessários
export const DigitalSignagePlayer = React.memo(DigitalSignagePlayerComponent);