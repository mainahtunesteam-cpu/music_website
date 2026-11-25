'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';

const homeTracks = [
  {
    title: 'Braincrackerz (Master)',
    artist: 'Az Alwayz',
    src: '/audio/az-alwayz-braincrackerz.mp3',
    durationStr: '03:26',
  },
  {
    title: 'Blinding Love (Master)',
    artist: 'Mainahtunes Session',
    src: '/audio/blinding-love.mp3',
    durationStr: '03:15',
  },
  {
    title: "Let's Go Move Around",
    artist: 'Michelle Bond',
    src: '/audio/michelle-bond-lets-go-move-around.mp3',
    durationStr: '03:40',
  },
];

export default function HomeHeroStage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = homeTracks[trackIndex];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio playback error:', err);
          setIsPlaying(false);
        });
    }
  };

  const nextTrack = () => {
    const nextIdx = (trackIndex + 1) % homeTracks.length;
    setTrackIndex(nextIdx);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.src = homeTracks[nextIdx].src;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div
      className={`hero-stage ${isPlaying ? 'hero-stage-playing' : ''}`}
      aria-label="Interactive master audio showcase"
    >
      {/* Hidden real HTML5 audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="stage-glow" />
      <div className="stage-grid" />
      <div className="stage-orbit orbit-one" />
      <div className="stage-orbit orbit-two" />

      <div className="stage-label stage-label-top">
        <span className={isPlaying ? 'live-dot pulse-red' : 'live-dot'} />
        {isPlaying ? (
          <>
            NOW PLAYING MASTER: <b>{currentTrack.title.toUpperCase()}</b>
          </>
        ) : (
          <>
            MAINAH CREATIVE LAB <b>CLICK TO PLAY MASTER</b>
          </>
        )}
      </div>

      {/* Interactive Spinning Vinyl */}
      <div
        className="vinyl-wrap"
        onClick={togglePlay}
        style={{ cursor: 'pointer' }}
        title={isPlaying ? 'Click to pause' : 'Click to play master'}
      >
        <div className={`vinyl ${isPlaying ? 'spinning' : ''}`}>
          <div className="vinyl-label">
            <span>MT</span>
            <i>{isPlaying ? 'PLAYING' : 'CLICK PLAY'}</i>
          </div>
        </div>
      </div>

      {/* Main Play / Pause Button */}
      <div
        className="stage-play interactive-play-btn"
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? 'Pause master audio' : 'Play master audio'}
        title={isPlaying ? 'Pause' : 'Play master audio'}
        style={{ cursor: 'pointer' }}
      >
        <span>{isPlaying ? '❚❚' : '▶'}</span>
      </div>

      {/* Animated Equalizer */}
      <div className={`equalizer ${isPlaying ? 'equalizer-live' : ''}`} aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <i
            key={i}
            style={
              {
                '--i': i,
                animationPlayState: isPlaying ? 'running' : 'paused',
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Track Player Bar */}
      <div className="stage-track interactive-track-bar">
        <div
          onClick={nextTrack}
          style={{ cursor: 'pointer' }}
          title="Click to switch to next master track"
        >
          <small>
            {isPlaying ? '▶ LIVE STREAMING MASTER (CLICK NEXT)' : 'CLICK TO AUDITION'}
          </small>
          <b>{currentTrack.title}</b>
        </div>
        <div
          className="track-wave"
          onClick={togglePlay}
          style={{ cursor: 'pointer' }}
        >
          {Array.from({ length: 30 }, (_, i) => {
            const ratio = duration > 0 ? currentTime / duration : 0;
            const isPassed = i / 30 <= ratio;
            return (
              <i
                key={i}
                className={isPassed ? 'wave-bar passed' : 'wave-bar'}
                style={{
                  '--i': i,
                  height: isPlaying ? undefined : '30%',
                  opacity: isPassed ? 1 : 0.45,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
        <span className="track-time-counter">
          {formatTime(currentTime)} / {formatTime(duration || 206)}
        </span>
      </div>

      <div className="floating-tag tag-top">
        ✳ MASTER AUDIO <b>8 TRACKS</b>
      </div>
      <div className="floating-tag tag-side">
        SOUND <span>×</span> STORY <span>×</span> VISION
      </div>
      <div className="stage-corner">
        MT<span>{isPlaying ? 'LIVE AUDIO' : 'CREATIVE STUDIO'}</span>
      </div>
    </div>
  );
}
