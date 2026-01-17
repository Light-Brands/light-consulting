/**
 * YouTube IFrame Player API Hook
 * Provides dynamic video duration detection and progress tracking
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// YouTube Player State Constants
const PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

interface YouTubePlayer {
  getDuration: () => number;
  getCurrentTime: () => number;
  getPlayerState: () => number;
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
}

interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data?: number;
}

interface UseYouTubePlayerOptions {
  videoId: string;
  containerId: string;
  onProgress?: (progress: number) => void;
  onDurationReady?: (duration: number) => void;
  onStateChange?: (state: number, isPlaying: boolean) => void;
}

interface UseYouTubePlayerReturn {
  isReady: boolean;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  progress: number;
  formattedDuration: string;
  play: () => void;
  pause: () => void;
}

// Extract video ID from various YouTube URL formats
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

// Format seconds to human-readable duration
export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0 minutes';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (minutes === 0) {
    return `${remainingSeconds} seconds`;
  } else if (remainingSeconds === 0) {
    return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  } else {
    const minText = minutes === 1 ? '1 minute' : `${minutes} minutes`;
    return `${minText} ${remainingSeconds} seconds`;
  }
}

// Simplified format for display (e.g., "15 min")
export function formatDurationShort(seconds: number): string {
  if (!seconds || seconds <= 0) return '0 min';

  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min`;
}

// Declare global YouTube types
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: YouTubePlayerEvent) => void;
            onStateChange?: (event: YouTubePlayerEvent) => void;
            onError?: (event: YouTubePlayerEvent) => void;
          };
        }
      ) => YouTubePlayer;
      PlayerState: typeof PlayerState;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Load YouTube IFrame API script
function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
    if (existingScript) {
      // Wait for existing script to load
      const checkReady = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkReady);
          resolve();
        }
      }, 100);
      return;
    }

    // Set up callback for when API is ready
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };

    // Load the script
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
  });
}

export function useYouTubePlayer({
  videoId,
  containerId,
  onProgress,
  onDurationReady,
  onStateChange,
}: UseYouTubePlayerOptions): UseYouTubePlayerReturn {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);

  const playerRef = useRef<YouTubePlayer | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate formatted duration
  const formattedDuration = formatDurationShort(duration);

  // Update progress tracking
  const updateProgress = useCallback(() => {
    if (!playerRef.current || duration === 0) return;

    const time = playerRef.current.getCurrentTime();
    const newProgress = Math.min((time / duration) * 100, 100);

    setCurrentTime(time);
    setProgress(newProgress);
    onProgress?.(newProgress);
  }, [duration, onProgress]);

  // Start progress tracking
  const startProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) return;

    progressIntervalRef.current = setInterval(updateProgress, 500);
  }, [updateProgress]);

  // Stop progress tracking
  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Play video
  const play = useCallback(() => {
    playerRef.current?.playVideo();
  }, []);

  // Pause video
  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
  }, []);

  // Initialize YouTube player
  useEffect(() => {
    let mounted = true;

    async function initPlayer() {
      await loadYouTubeAPI();

      if (!mounted) return;

      // Check if container exists
      const container = document.getElementById(containerId);
      if (!container) {
        console.warn(`YouTube player container #${containerId} not found`);
        return;
      }

      // Create player
      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
        events: {
          onReady: (event: YouTubePlayerEvent) => {
            if (!mounted) return;

            const videoDuration = event.target.getDuration();
            setDuration(videoDuration);
            setIsReady(true);
            onDurationReady?.(videoDuration);
          },
          onStateChange: (event: YouTubePlayerEvent) => {
            if (!mounted) return;

            const state = event.data ?? -1;
            const playing = state === PlayerState.PLAYING;

            setIsPlaying(playing);
            onStateChange?.(state, playing);

            if (playing) {
              startProgressTracking();
            } else {
              stopProgressTracking();
              // Update progress one more time when paused
              updateProgress();
            }
          },
          onError: (event: YouTubePlayerEvent) => {
            console.error('YouTube player error:', event.data);
          },
        },
      });
    }

    initPlayer();

    return () => {
      mounted = false;
      stopProgressTracking();
      playerRef.current?.destroy();
    };
  }, [videoId, containerId, onDurationReady, onStateChange, startProgressTracking, stopProgressTracking, updateProgress]);

  return {
    isReady,
    isPlaying,
    duration,
    currentTime,
    progress,
    formattedDuration,
    play,
    pause,
  };
}

export default useYouTubePlayer;
