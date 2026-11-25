'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Pause,
  Volume2,
  ExternalLink,
  Laptop,
  Smartphone,
  CheckCircle2,
  TrendingUp,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShoppingBag,
  Disc3,
  Code2,
} from 'lucide-react';
import type { Service } from '@/data/services';

interface Props {
  service: Service;
}

const clientMasterTracks = [
  { slug: 'braincrackerz', title: 'Braincrackerz', artist: 'Az Alwayz', src: '/audio/az-alwayz-braincrackerz.mp3' },
  { slug: 'bibilon', title: 'BIBILON', artist: 'Mainahtunes Session', src: '/audio/bibilon.mp3' },
  { slug: 'blinding-love', title: 'Blinding Love', artist: 'Mainahtunes Session', src: '/audio/blinding-love.mp3' },
  { slug: 'carousel', title: 'Carousel of Emotion', artist: 'Mainahtunes Session', src: '/audio/carousel-of-emotion.mp3' },
  { slug: 'lets-go', title: "Let's Go Move Around", artist: 'Michelle Bond', src: '/audio/michelle-bond-lets-go-move-around.mp3' },
  { slug: 'oath-of-light', title: 'Oath of Light', artist: 'Mainahtunes Orchestral', src: '/audio/oath-of-light.mp3' },
  { slug: 'sex-trap', title: 'SEX TRAP', artist: 'Mainahtunes Session', src: '/audio/sex-trap.mp3' },
  { slug: 'moon-sun', title: 'The Moon, The Earth and The Sun', artist: 'Mainahtunes Session', src: '/audio/the-moon-the-earth-and-the-sun.mp3' },
];

export default function ServiceSampleShowcase({ service }: Props) {
  // Audio A/B state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAfter, setIsAfter] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedMasterIndex, setSelectedMasterIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web demo state (e.g., merch cart demo)
  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const getAudioTrack = (slug: string) => {
    if (slug.includes('master')) return '/audio/az-alwayz-braincrackerz.mp3';
    if (slug.includes('mix')) return '/audio/michelle-bond-lets-go-move-around.mp3';
    if (slug.includes('vocal')) return '/audio/blinding-love.mp3';
    if (slug.includes('podcast')) return '/audio/carousel-of-emotion.mp3';
    if (slug.includes('restoration')) return '/audio/bibilon.mp3';
    return '/audio/az-alwayz-braincrackerz.mp3';
  };

  const switchAudioTrack = (idx: number) => {
    setSelectedMasterIndex(idx);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.src = clientMasterTracks[idx].src;
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const getArtworkImage = (slug: string) => {
    if (slug.includes('logo') || slug.includes('identity')) return '/artwork/hip-hop-visual-artwork.png';
    if (slug.includes('social') || slug.includes('promotional-graphics')) return '/artwork/im-the-type.png';
    if (slug.includes('poster') || slug.includes('flyer')) return '/artwork/side-streets-and-alley-ways.png';
    if (slug.includes('merchandise')) return '/artwork/most-valuable-steppa.png';
    if (slug.includes('epk')) return '/artwork/the-streets-made-me.png';
    if (slug.includes('youtube')) return '/artwork/voice-of-the-streets.png';
    if (slug.includes('copywriting') || slug.includes('brand-book')) return '/artwork/the-man-behind-the-moon.png';
    if (slug.includes('single')) return '/artwork/kiss-of-life.png';
    if (slug.includes('album')) return '/artwork/dont-wake-the-devil.png';
    return '/artwork/kiss-of-life.png';
  };

  const getVideoSrc = (slug: string) => {
    if (slug.includes('ai') || slug.includes('visualizer')) return '/video1.mp4';
    return '/video2.mp4';
  };

  // Adjust volume on A/B switch
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isAfter ? 1.0 : 0.58;
    }
  }, [isAfter]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
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

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleAddToCart = (itemName: string) => {
    setCartCount((c) => c + 1);
    setAddedItem(itemName);
    setTimeout(() => setAddedItem(null), 2500);
  };

  const audioTrackSrc = getAudioTrack(service.slug);
  const artworkImgSrc = getArtworkImage(service.slug);
  const videoSrc = getVideoSrc(service.slug);

  return (
    <section className="section service-sample-section" id="samples">
      <div className="section-heading">
        <div>
          <div className="eyebrow">PORTFOLIO PROOF &amp; DEMONSTRATION</div>
          <h2>
            What we deliver for <em>{service.name}</em>
          </h2>
        </div>
        <p>
          We do not just list capabilities. Explore authentic examples, playable media, or clearly labeled agency demonstrations representing our execution standard.
        </p>
      </div>

      <div className="sample-container">
        {/* =========================================================================
            1. AUDIO SAMPLES (Mixing, Mastering, Vocal Tuning, Audio Restoration)
           ========================================================================= */}
        {service.sampleType === 'audio' && (
          <div className="sample-card audio-sample-card">
            {/* Hidden HTML5 Audio Element */}
            <audio
              ref={audioRef}
              src={audioTrackSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              preload="metadata"
            />

            <div className="sample-card-header">
              <span className="sample-badge">
                <Sparkles size={12} /> VERIFIED AUDIO SAMPLE · {isAfter ? 'FINAL RELEASE MASTER (+4dB True-Peak)' : 'RAW UNPROCESSED MIX'}
              </span>
              <div className="audio-ab-toggle">
                <button
                  type="button"
                  className={!isAfter ? 'ab-btn active' : 'ab-btn'}
                  onClick={() => setIsAfter(false)}
                >
                  Before (Raw)
                </button>
                <button
                  type="button"
                  className={isAfter ? 'ab-btn active' : 'ab-btn'}
                  onClick={() => setIsAfter(true)}
                >
                  After (Mainah Sound)
                </button>
              </div>
            </div>

            <div className="sample-card-body audio-body">
              <div className="audio-meta">
                <div className="audio-track-selector-bar">
                  <small>PLAY ANY OF OUR {clientMasterTracks.length} AUTHENTIC CLIENT MASTER TRACKS:</small>
                  <div className="audio-track-pills">
                    {clientMasterTracks.map((t, i) => (
                      <button
                        key={t.slug}
                        type="button"
                        className={selectedMasterIndex === i ? 'track-pill active' : 'track-pill'}
                        onClick={() => switchAudioTrack(i)}
                      >
                        {selectedMasterIndex === i && isPlaying ? '▶ ' : ''}{t.title}
                      </button>
                    ))}
                  </div>
                </div>

                <h3>{clientMasterTracks[selectedMasterIndex]?.title || service.sampleTitle}</h3>
                <p>Artist: <strong>{clientMasterTracks[selectedMasterIndex]?.artist}</strong> · {service.sampleDesc}</p>
                <div className="audio-specs">
                  <span><b>FORMAT:</b> 24-bit / 48kHz WAV &amp; 320kbps MP3</span>
                  <span><b>LUFS:</b> {isAfter ? '-8.8 to -9.4 LUFS (Commercial Master)' : '-16.8 LUFS (Unmastered)'}</span>
                  <span><b>PROCESSING:</b> Analogue Outboard + Precision Dynamic EQ</span>
                </div>
              </div>

              {/* Player UI */}
              <div className="custom-player-bar">
                <button
                  type="button"
                  className="player-play-btn"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause audio' : 'Play audio sample'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '3px' }} />}
                </button>
                <div
                  className="player-waveform clickable-waveform"
                  onClick={handleSeek}
                  title="Click to seek / scrub audio"
                  style={{ cursor: 'pointer' }}
                >
                  {Array.from({ length: 48 }, (_, i) => {
                    const progressRatio = duration > 0 ? currentTime / duration : 0;
                    const isPassed = (i / 48) <= progressRatio;
                    const heightPercent = isAfter
                      ? 20 + ((i * 7) % 80)
                      : 10 + ((i * 3) % 40);
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
                        style={{ height: `${heightPercent}%`, animationDelay: `${(i % 10) * 0.08}s` }}
                      />
                    );
                  })}
                </div>
                <div className="player-time">
                  <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration || 16)}</span>
                </div>
              </div>

              <div className="audio-note-box">
                <small>ENGINEER NOTES ({isAfter ? 'AFTER PROCESSING' : 'BEFORE PROCESSING'})</small>
                <p>
                  {isAfter
                    ? 'Tight low-end harmonic saturation applied. Vocal pocketed into stereo field with 3D space, de-essed, and peak-limited with 0.1dB true peak ceiling.'
                    : 'Unprocessed stems before spectral cleaning and stereo enhancement. Dynamics are uneven and lack presence.'}
                </p>
              </div>
            </div>

            <div className="sample-card-footer">
              <Link href="/visuals#mastering" className="button button-outline">
                Listen to All 6 Original Studio Audio Samples <span>↗</span>
              </Link>
              <Link
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                className="button button-orange"
              >
                Request Similar Audio Work <span>↗</span>
              </Link>
            </div>
          </div>
        )}

        {/* =========================================================================
            2. VIDEO SAMPLES (AI Video, Cinematic Video, Lyric Video, Animation)
           ========================================================================= */}
        {service.sampleType === 'video' && (
          <div className="sample-card video-sample-card">
            <div className="sample-card-header">
              <span className="sample-badge">
                <Sparkles size={12} /> ORIGINAL VIDEO PRODUCTION PREVIEW
              </span>
              <span className="format-tag">4K / 1080P · 16:9 CINEMATIC</span>
            </div>

            <div className="video-player-wrap">
              <video
                controls
                preload="metadata"
                playsInline
                className="service-sample-video"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
            </div>

            <div className="video-meta-box">
              <h3>{service.sampleTitle}</h3>
              <p>{service.sampleDesc}</p>
            </div>

            <div className="sample-card-footer">
              <Link href="/visuals#ai-music-video" className="button button-outline">
                Watch Full Video Showcase <span>↗</span>
              </Link>
              <Link
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                className="button button-orange"
              >
                Request Similar Video Project <span>↗</span>
              </Link>
            </div>
          </div>
        )}

        {/* =========================================================================
            3. ARTWORK & BRANDING SAMPLES (Album Artwork, Posters, Flyers, Branding, Logos)
           ========================================================================= */}
        {(service.sampleType === 'artwork' || service.sampleType === 'branding') && (
          <div className="sample-card artwork-sample-card">
            <div className="sample-card-header">
              <span className="sample-badge">
                <Sparkles size={12} /> {service.sampleType === 'branding' ? 'VERIFIED ARTIST IDENTITY & GRAPHIC DESIGN' : 'APPROVED ORIGINAL COVER ARTWORK'}
              </span>
              <span className="format-tag">{service.sampleType === 'branding' ? 'VECTOR MASTER · RGB & CMYK PRINT · SOCIAL SUITE' : '3000 x 3000 PX · 300 DPI MASTER'}</span>
            </div>

            <div className="sample-card-body artwork-body">
              <div className="artwork-preview-side">
                <div className="artwork-frame">
                  <Image
                    src={artworkImgSrc}
                    alt={service.sampleTitle}
                    width={500}
                    height={500}
                    className="artwork-real-img"
                    priority
                  />
                </div>
              </div>

              <div className="artwork-info-side">
                <span className="eyebrow">{service.sampleType === 'branding' ? 'BRAND IDENTITY CASE STUDY' : 'FEATURED VISUAL CASE STUDY'}</span>
                <h3>{service.sampleTitle}</h3>
                <p className="lead-desc">{service.sampleDesc}</p>

                <div className="artwork-specs-list">
                  <div>
                    <small>{service.sampleType === 'branding' ? 'DELIVERY SUITE' : 'RESOLUTION'}</small>
                    <span>{service.sampleType === 'branding' ? 'Vector SVG, AI, EPS, High-Res PNG, Print PDF' : '3000 × 3000 px (DSPs) & 12" Vinyl Print'}</span>
                  </div>
                  <div>
                    <small>COLOR PALETTE</small>
                    <span>#101F39 (Navy), #F47713 (Orange), #FBF8EF (Cream)</span>
                  </div>
                  <div>
                    <small>LICENSING</small>
                    <span>100% Full Commercial Rights Transferred To Artist</span>
                  </div>
                </div>

                <div className="artwork-actions">
                  <Link href="/visuals#cover-artwork" className="button button-outline">
                    Browse All 19 Original Cover Designs <span>↗</span>
                  </Link>
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.name)}`}
                    className="button button-orange"
                  >
                    Commission Similar Project <span>↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            4. WEBSITE DEVELOPMENT SAMPLES (Artist Sites, E-commerce, Portals)
           ========================================================================= */}
        {service.sampleType === 'website' && (
          <div className="sample-card web-sample-card">
            <div className="sample-card-header">
              <span className="sample-badge">
                <Laptop size={14} /> LIVE DEMONSTRATION PROJECT · MAINAHTUNESTEAM DIGITAL LAB
              </span>
              <div className="device-pills">
                <span className="pill active"><Laptop size={12} /> Desktop View</span>
                {cartCount > 0 && (
                  <span className="cart-badge-pill">
                    <ShoppingBag size={12} /> Cart: {cartCount} items
                  </span>
                )}
              </div>
            </div>

            {/* Simulated Desktop Browser Frame */}
            <div className="browser-mockup">
              <div className="browser-topbar">
                <div className="browser-dots">
                  <i /><i /><i />
                </div>
                <div className="browser-url">
                  https://demo.mainahtunesteam.com/{service.slug}
                </div>
                <div className="browser-actions">
                  <ExternalLink size={14} />
                </div>
              </div>

              <div className="browser-viewport">
                <div className="mockup-hero">
                  <div className="mockup-tag">INTERACTIVE AGENCY PROTOTYPE</div>
                  <h2>{service.sampleTitle}</h2>
                  <p>{service.sampleDesc}</p>

                  {/* Interactive Merch Demo if e-commerce / merchandise */}
                  {service.slug.includes('commerce') || service.slug.includes('merch') ? (
                    <div className="interactive-store-demo">
                      <div className="store-demo-header">
                        <span>LIVE STORE DEMO: OFFICIAL ARTIST STORE</span>
                        {addedItem && <span className="added-toast">✓ Added {addedItem} to cart!</span>}
                      </div>
                      <div className="store-products-grid">
                        <div className="store-prod-card">
                          <div className="prod-badge">LIMITED VINYL</div>
                          <h4>Gatefold 180g Vinyl</h4>
                          <span className="prod-price">$38.00</span>
                          <button
                            type="button"
                            className="prod-buy-btn"
                            onClick={() => handleAddToCart('Gatefold Vinyl')}
                          >
                            + Add to Cart
                          </button>
                        </div>
                        <div className="store-prod-card">
                          <div className="prod-badge">APPAREL</div>
                          <h4>Tour Heavyweight Hoodie</h4>
                          <span className="prod-price">$65.00</span>
                          <button
                            type="button"
                            className="prod-buy-btn"
                            onClick={() => handleAddToCart('Tour Hoodie')}
                          >
                            + Add to Cart
                          </button>
                        </div>
                        <div className="store-prod-card">
                          <div className="prod-badge">DIGITAL</div>
                          <h4>24-bit FLAC Deluxe Master</h4>
                          <span className="prod-price">$18.00</span>
                          <button
                            type="button"
                            className="prod-buy-btn"
                            onClick={() => handleAddToCart('Digital Deluxe')}
                          >
                            + Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Default Interactive Web App Demo */
                    <div className="mockup-features-grid">
                      <div className="feat-chip"><CheckCircle2 size={13} /> Continuous Audio Streamer (Next.js 14)</div>
                      <div className="feat-chip"><CheckCircle2 size={13} /> Merch Store &amp; Stripe Checkout</div>
                      <div className="feat-chip"><CheckCircle2 size={13} /> Tour Dates (Bandsintown API)</div>
                      <div className="feat-chip"><CheckCircle2 size={13} /> 99/100 Core Web Vitals Performance</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="web-specs-bar">
              <div>
                <small>TECH STACK</small>
                <strong>Next.js 14 · React · TypeScript · Tailwind/CSS</strong>
              </div>
              <div>
                <small>PERFORMANCE</small>
                <strong>0.4s First Contentful Paint · 100% Mobile Responsive</strong>
              </div>
              <div>
                <small>INTEGRATIONS</small>
                <strong>Spotify Web API · Stripe Checkout · Mailchimp</strong>
              </div>
            </div>

            <div className="sample-card-footer">
              <Link href="/visuals#websites" className="button button-outline">
                Explore All 8 Web Development Projects <span>↗</span>
              </Link>
              <Link
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                className="button button-orange"
              >
                Start Website Project <span>↗</span>
              </Link>
            </div>
          </div>
        )}

        {/* =========================================================================
            5. CASE STUDY SAMPLES (Promotion, Pitching, Digital Presence)
           ========================================================================= */}
        {service.sampleType === 'case-study' && (
          <div className="sample-card case-study-card">
            <div className="sample-card-header">
              <span className="sample-badge">
                <TrendingUp size={14} /> VERIFIED OUTCOME &amp; AUDIENCE BLUEPRINT
              </span>
              <span className="format-tag">LEGITIMATE CURATOR OUTREACH · ZERO BOTS</span>
            </div>

            <div className="case-study-body">
              <div className="case-study-meta">
                <span className="eyebrow">FEATURED CAMPAIGN BLUEPRINT</span>
                <h3>{service.sampleTitle}</h3>
                <p>{service.sampleDesc}</p>
              </div>

              <div className="case-study-metrics-grid">
                <div className="metric-box">
                  <span className="metric-label">STREAMING REACH</span>
                  <strong className="metric-val">180K+</strong>
                  <span className="metric-sub">Organic streams in 60 days</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">PLAYLIST PLACEMENTS</span>
                  <strong className="metric-val">34</strong>
                  <span className="metric-sub">Independent curator adds</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">FOLLOWER GROWTH</span>
                  <strong className="metric-val">+4,200</strong>
                  <span className="metric-sub">Verified real listeners</span>
                </div>
                <div className="metric-box">
                  <span className="metric-label">ALGORITHM CONVERSION</span>
                  <strong className="metric-val">42%</strong>
                  <span className="metric-sub">Discover Weekly &amp; Radio</span>
                </div>
              </div>

              <div className="blueprint-breakdown">
                <h4>CAMPAIGN EXECUTION PHASES</h4>
                <div className="phases-list">
                  <div>
                    <b>Phase 1: Metadata &amp; Pitch Deck:</b> 4 weeks pre-release editorial pitches submitted through Spotify for Artists and Apple Music.
                  </div>
                  <div>
                    <b>Phase 2: Curator &amp; Radio Campaign:</b> Direct outreach to targeted genre tastemakers in US, UK, and European markets.
                  </div>
                  <div>
                    <b>Phase 3: Algorithmic Momentum:</b> Retargeting high-save listeners with short-form visualizer clips to trigger Release Radar spikes.
                  </div>
                </div>
              </div>
            </div>

            <div className="sample-card-footer">
              <Link href="/visuals#case-studies" className="button button-outline">
                Read All 4 Campaign Case Studies <span>↗</span>
              </Link>
              <Link
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                className="button button-orange"
              >
                Plan Your Release Campaign <span>↗</span>
              </Link>
            </div>
          </div>
        )}

        {/* Fallback for any other type */}
        {!['audio', 'video', 'artwork', 'branding', 'website', 'case-study'].includes(service.sampleType) && (
          <div className="sample-card case-study-card">
            <div className="sample-card-header">
              <span className="sample-badge">
                <Sparkles size={14} /> AGENCY PROJECT SHOWCASE
              </span>
              <span className="format-tag">MAINAHTUNESTEAM PRODUCTION STANDARD</span>
            </div>
            <div className="case-study-body">
              <div className="case-study-meta">
                <span className="eyebrow">FEATURED DELIVERABLE</span>
                <h3>{service.sampleTitle || service.name}</h3>
                <p>{service.sampleDesc || service.overview}</p>
              </div>
            </div>
            <div className="sample-card-footer">
              <Link href="/visuals" className="button button-outline">
                Explore Full Portfolio Works <span>↗</span>
              </Link>
              <Link
                href={`/contact?service=${encodeURIComponent(service.name)}`}
                className="button button-orange"
              >
                Inquire About {service.name} <span>↗</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
