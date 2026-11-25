'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  Sliders,
  Volume2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Disc3,
  RotateCcw,
} from 'lucide-react';
import type { AudioTrackProject } from '@/data/portfolio';

interface Props {
  tracks: AudioTrackProject[];
  initialType?: 'all' | 'mastering' | 'mixing';
}

export default function AudioPlayerCatalog({ tracks, initialType = 'all' }: Props) {
  const [filterType, setFilterType] = useState<'all' | 'mastering' | 'mixing'>(initialType);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAfter, setIsAfter] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredTracks = tracks.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const activeTrack = filteredTracks[activeTrackIndex] || filteredTracks[0];

  // Sync audio source when track changes
  useEffect(() => {
    if (audioRef.current && activeTrack) {
      const currentSrc = audioRef.current.src || '';
      if (!currentSrc.endsWith(activeTrack.src)) {
        audioRef.current.src = activeTrack.src;
        setCurrentTime(0);
      }
    }
  }, [activeTrack]);

  // Adjust volume / gain when switching Before / After
  useEffect(() => {
    if (audioRef.current) {
      // In "Before" mode, volume is reduced to simulate unmastered -16 LUFS
      // In "After" mode, full volume commercial -9 LUFS
      audioRef.current.volume = isAfter ? 1.0 : 0.58;
    }
  }, [isAfter]);

  const playTrack = (track: AudioTrackProject, idx: number) => {
    setActiveTrackIndex(idx);
    setCurrentTime(0);
    if (!audioRef.current) return;
    audioRef.current.src = track.src;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((e) => {
        console.warn('Playback error:', e);
        setIsPlaying(false);
      });
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.error('Audio playback error', e);
          setIsPlaying(false);
        });
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
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="audio-catalog-wrapper">
      {/* Hidden real audio element */}
      <audio
        ref={audioRef}
        src={activeTrack?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Category Tabs */}
      <div className="audio-tab-bar">
        <button
          type="button"
          className={filterType === 'all' ? 'audio-tab active' : 'audio-tab'}
          onClick={() => {
            setFilterType('all');
            setActiveTrackIndex(0);
          }}
        >
          All 8 Master Tracks
        </button>
        <button
          type="button"
          className={filterType === 'mastering' ? 'audio-tab active' : 'audio-tab'}
          onClick={() => {
            setFilterType('mastering');
            setActiveTrackIndex(0);
          }}
        >
          Track Mastering (6)
        </button>
        <button
          type="button"
          className={filterType === 'mixing' ? 'audio-tab active' : 'audio-tab'}
          onClick={() => {
            setFilterType('mixing');
            setActiveTrackIndex(0);
          }}
        >
          Music Mixing (2)
        </button>
      </div>

      <div className="audio-console-grid">
        {/* Playlist Tracklist Column */}
        <div className="audio-tracklist-col">
          <div className="tracklist-header">
            <Disc3 size={16} className={isPlaying ? 'disc-icon spinning' : 'disc-icon'} />
            <span>STUDIO SESSION TRACKLIST ({filteredTracks.length})</span>
          </div>

          <div className="tracklist-items">
            {filteredTracks.map((track, idx) => {
              const isSelected = activeTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  className={isSelected ? 'track-item active' : 'track-item'}
                  onClick={() => {
                    playTrack(track, idx);
                  }}
                  tabIndex={0}
                  role="button"
                >
                  <span className="track-number">
                    {isSelected && isPlaying ? '▶' : String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="track-info">
                    <h4>{track.title}</h4>
                    <p>{track.artist || 'MainahtunesTeam Studio Session'}</p>
                  </div>
                  <span className="track-type-pill">{track.type}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Master Control & A/B Engine Column */}
        {activeTrack && (
          <div className="audio-console-col">
            <div className="console-topline">
              <span className="console-badge">
                <Sparkles size={13} /> {activeTrack.type.toUpperCase()} CONSOLE · {isAfter ? 'MASTERED (+4.2dB True-Peak)' : 'RAW UNPROCESSED MIX'}
              </span>
              <div className="audio-ab-toggle">
                <button
                  type="button"
                  className={!isAfter ? 'ab-btn active' : 'ab-btn'}
                  onClick={() => setIsAfter(false)}
                  title="Switch to Raw Mixdown (Before)"
                >
                  Before (Raw Mix)
                </button>
                <button
                  type="button"
                  className={isAfter ? 'ab-btn active' : 'ab-btn'}
                  onClick={() => setIsAfter(true)}
                  title="Switch to Mastered Polish (After)"
                >
                  After (Mastered)
                </button>
              </div>
            </div>

            <div className="console-meta">
              <h2>{activeTrack.title}</h2>
              <p className="console-artist">
                {activeTrack.artist ? `Artist: ${activeTrack.artist}` : 'MainahtunesTeam Production Master'}
              </p>
              <p className="console-desc">{activeTrack.description}</p>
            </div>

            {/* Custom Interactive Player */}
            <div className="custom-player-bar">
              <button
                type="button"
                className="player-play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause sample' : 'Play sample'}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '4px' }} />}
              </button>

              <div
                className="player-waveform clickable"
                onClick={handleSeek}
                title="Click anywhere to seek"
              >
                {Array.from({ length: 42 }, (_, i) => {
                  const progressRatio = duration > 0 ? currentTime / duration : 0;
                  const barProgress = i / 42;
                  const isPassed = barProgress <= progressRatio;
                  const baseHeight = isAfter
                    ? 25 + ((i * 11) % 75)
                    : 15 + ((i * 5) % 35);
                  return (
                    <span
                      key={i}
                      className={
                        isPlaying
                          ? isPassed
                            ? 'bar active passed'
                            : 'bar active'
                          : isPassed
                          ? 'bar passed'
                          : 'bar'
                      }
                      style={{
                        height: `${baseHeight}%`,
                        animationDelay: `${(i % 8) * 0.09}s`,
                      }}
                    />
                  );
                })}
              </div>

              <div className="player-time">
                <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration || 16)}</span>
              </div>
            </div>

            {/* Real-time Engineering Comparison Notes */}
            <div className="comparison-notes-grid">
              <div className={!isAfter ? 'note-card before-note active-highlight' : 'note-card before-note'}>
                <small>BEFORE (SOURCE RECORDING)</small>
                <p>{activeTrack.beforeNotes}</p>
              </div>
              <div className={isAfter ? 'note-card after-note active-highlight' : 'note-card after-note'}>
                <small>AFTER (MAINAHTUNESTEAM POLISH)</small>
                <p>{activeTrack.afterNotes}</p>
              </div>
            </div>

            <div className="console-specs-row">
              <div>
                <small>FORMAT</small>
                <span>{activeTrack.format}</span>
              </div>
              <div>
                <small>LOUDNESS</small>
                <span>{isAfter ? activeTrack.lufs : '-16.5 LUFS (Raw)'}</span>
              </div>
              <div>
                <small>OUTBOARD GEAR</small>
                <span>Analogue EQ · Tube Compression · True Peak Limiter</span>
              </div>
            </div>

            <div className="console-actions">
              <Link
                href={`/contact?service=${encodeURIComponent(
                  activeTrack.type === 'mastering' ? 'Track Mastering' : 'Music Mixing'
                )}&project=${encodeURIComponent(activeTrack.title)}`}
                className="button button-orange"
              >
                Request Similar {activeTrack.type === 'mastering' ? 'Mastering' : 'Mixing'} <span>↗</span>
              </Link>
              <Link
                href={`/services/${activeTrack.type === 'mastering' ? 'track-mastering' : 'music-mixing'}`}
                className="button button-outline"
              >
                View Service Specifications
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
