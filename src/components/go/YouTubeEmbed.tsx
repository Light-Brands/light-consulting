'use client';

import React, { useState } from 'react';
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer';

interface YouTubeEmbedProps {
  videoId: string;
  className?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  className = '',
}) => {
  const containerId = `yt-${videoId}`;
  const [hasInteracted, setHasInteracted] = useState(false);

  const { isReady, isPlaying, play } = useYouTubePlayer({
    videoId,
    containerId,
  });

  const handlePlay = () => {
    setHasInteracted(true);
    play();
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-depth-border shadow-elevated bg-depth-surface ${className}`}
      style={{ aspectRatio: '16/9' }}
    >
      {/* YouTube player target */}
      <div id={containerId} className="absolute inset-0 w-full h-full" />

      {/* Custom play overlay */}
      {!hasInteracted && isReady && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-opacity duration-300 hover:bg-black/30 cursor-pointer group"
          aria-label="Play video"
        >
          <div className="w-20 h-20 rounded-full bg-radiance-gold flex items-center justify-center shadow-illumination transition-transform duration-300 group-hover:scale-110">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Loading state */}
      {!isReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-depth-surface">
          <div className="w-10 h-10 border-2 border-radiance-gold/30 border-t-radiance-gold rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
