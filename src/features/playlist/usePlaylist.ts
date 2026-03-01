import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { MenuBoardSettings, MenuCategory, MediaItem } from '../../shared/types';

interface PlaylistState {
  paused: boolean;
  elapsedTime: number;
  currentIndex: number;
}

interface PlaylistAnalytics {
  totalDisplays: number;
  completeCycles: number;
  currentDisplayTime: number;
}

interface UsePlaylistOptions {
  paused?: boolean;
}

export const usePlaylist = (
  settings: MenuBoardSettings,
  options: UsePlaylistOptions = {}
) => {
  const [playlistState, setPlaylistState] = useState<PlaylistState>({
    paused: options.paused || false,
    elapsedTime: 0,
    currentIndex: 0
  });

  const [analytics, setAnalytics] = useState<PlaylistAnalytics>({
    totalDisplays: 0,
    completeCycles: 0,
    currentDisplayTime: 0
  });

  const [videoProgress, setVideoProgress] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout>();
  const videoEndedRef = useRef<boolean>(false);

  // Criar array de itens da playlist (categorias + mídia intercalada)
  const playlistItems = React.useMemo(() => {
    const items: Array<{ type: 'category' | 'media'; data: MenuCategory | MediaItem; duration: number }> = [];
    
    settings.playlist.order.forEach((categoryId, index) => {
      const category = settings.menuData.categories.find(cat => cat.id === categoryId);
      if (category && category.isActive) {
        // Adicionar categoria
        items.push({
          type: 'category',
          data: category,
          duration: settings.playlist.categoryDisplayTime
        });

        // Intercalar mídia após cada categoria (exceto a última)
        if (index < settings.playlist.order.length - 1 && settings.playlist.mediaItems.length > 0) {
          const mediaItem = settings.playlist.mediaItems[index % settings.playlist.mediaItems.length];
          if (mediaItem && mediaItem.isActive) {
            items.push({
              type: 'media',
              data: mediaItem,
              duration: settings.playlist.mediaDisplayTime
            });
          }
        }
      }
    });
    
    return items;
  }, [settings.playlist, settings.menuData.categories]);

  // Item atual
  const currentItem = playlistItems[playlistState.currentIndex];
  const currentCategory = currentItem?.type === 'category' ? currentItem.data as MenuCategory : null;
  const currentMedia = currentItem?.type === 'media' ? currentItem.data as MediaItem : null;
  const isShowingMedia = currentItem?.type === 'media';

  // Progresso atual - usar progresso do vídeo para vídeos, tempo decorrido para outros
  const isVideo = currentItem?.type === 'media' && (currentItem.data as MediaItem).type === 'video';
  const progressPercentage = isVideo 
    ? videoProgress 
    : currentItem 
      ? Math.min(100, (playlistState.elapsedTime / currentItem.duration) * 100) 
      : 0;

  // Timer principal
  useEffect(() => {
    if (playlistState.paused || !currentItem) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Reset do flag e progresso do vídeo quando mudar de item
    videoEndedRef.current = false;
    setVideoProgress(0);

    intervalRef.current = setInterval(() => {
      setPlaylistState(prev => {
        const newElapsedTime = prev.elapsedTime + 100; // Update every 100ms
        
        // Se for vídeo, avançar ao terminar OU por timeout (fallback)
        const isVideo = currentItem.type === 'media' && (currentItem.data as MediaItem).type === 'video';
        const shouldAdvance = isVideo 
          ? (videoEndedRef.current || newElapsedTime >= currentItem.duration)
          : newElapsedTime >= currentItem.duration;
        
        // Verificar se deve avançar para próximo item
        if (shouldAdvance) {
          const nextIndex = (prev.currentIndex + 1) % playlistItems.length;
          
          // Atualizar analytics
          setAnalytics(analytics => ({
            ...analytics,
            totalDisplays: analytics.totalDisplays + 1,
            completeCycles: nextIndex === 0 ? analytics.completeCycles + 1 : analytics.completeCycles
          }));

          return {
            ...prev,
            currentIndex: nextIndex,
            elapsedTime: 0
          };
        }

        return {
          ...prev,
          elapsedTime: newElapsedTime
        };
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playlistState.paused, currentItem, playlistItems.length]);

  // Controles da playlist
  const pausePlaylist = useCallback(() => {
    setPlaylistState(prev => ({ ...prev, paused: true }));
  }, []);

  const resumePlaylist = useCallback(() => {
    setPlaylistState(prev => ({ ...prev, paused: false }));
  }, []);

  const skipToNext = useCallback(() => {
    setPlaylistState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % playlistItems.length,
      elapsedTime: 0
    }));
  }, [playlistItems.length]);

  const skipToPrevious = useCallback(() => {
    setPlaylistState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? playlistItems.length - 1 : prev.currentIndex - 1,
      elapsedTime: 0
    }));
  }, [playlistItems.length]);

  const restartPlaylist = useCallback(() => {
    setPlaylistState({
      paused: false,
      currentIndex: 0,
      elapsedTime: 0
    });
    setAnalytics({
      totalDisplays: 0,
      completeCycles: 0,
      currentDisplayTime: 0
    });
  }, []);

  // Callback para quando o vídeo terminar
  const onVideoEnded = useCallback(() => {
    videoEndedRef.current = true;
  }, []);

  // Callback para falhas de mídia (imagem/vídeo)
  const onMediaError = useCallback(() => {
    videoEndedRef.current = true;
  }, []);

  // Callback para atualizar progresso do vídeo
  const onVideoTimeUpdate = useCallback((currentTime: number, duration: number) => {
    if (duration > 0) {
      const progress = (currentTime / duration) * 100;
      setVideoProgress(Math.min(100, progress));
    }
  }, []);

  return {
    // Estado atual
    currentCategory,
    currentMedia,
    isShowingMedia,
    progressPercentage,
    playlistState,

    // Controles
    pausePlaylist,
    resumePlaylist,
    skipToNext,
    skipToPrevious,
    restartPlaylist,
    onVideoEnded,
    onMediaError,
    onVideoTimeUpdate,

    // Analytics
    analytics: {
      ...analytics,
      currentDisplayTime: Math.round(playlistState.elapsedTime / 1000)
    }
  };
};