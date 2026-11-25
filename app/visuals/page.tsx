'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Filter,
  Sparkles,
  Play,
  Volume2,
  Laptop,
  TrendingUp,
  Palette,
  Film,
  ArrowUpRight,
} from 'lucide-react';
import {
  artworkCatalog,
  videoCatalog,
  audioCatalog,
  webProjectsCatalog,
  promotionCaseStudies,
} from '@/data/portfolio';
import ArtworkLightboxModal from '@/components/ArtworkLightboxModal';
import AudioPlayerCatalog from '@/components/AudioPlayerCatalog';
import WebDevShowcase from '@/components/WebDevShowcase';
import PromotionCaseStudyCard from '@/components/PromotionCaseStudyCard';

export default function ReviewMyWorksPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'ARTWORK' | 'AUDIO' | 'VIDEO' | 'WEBSITES' | 'CAMPAIGNS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [artworks, setArtworks] = useState(artworkCatalog);
  const [audio, setAudio] = useState(audioCatalog);
  const [videos, setVideos] = useState(videoCatalog);
  const [websites] = useState(webProjectsCatalog);
  const [campaigns] = useState(promotionCaseStudies);

  useEffect(() => {
    // 1. Fetch live portfolio from external cloud storage / permanent registry
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('Portfolio fetch error');
        return res.json();
      })
      .then((data) => {
        if (data.artworks && Array.isArray(data.artworks)) setArtworks(data.artworks);
        if (data.audio && Array.isArray(data.audio)) setAudio(data.audio);
        if (data.videos && Array.isArray(data.videos)) setVideos(data.videos);
      })
      .catch((err) => {
        console.warn('Using baseline portfolio:', err);
      });

    // 2. Client-side browser sync for instant preview
    try {
      const local = localStorage.getItem('mainahtunes_custom_projects');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setArtworks((prev) => {
            const customArts = parsed
              .filter((p: any) => p.category === 'artwork')
              .map((p: any) => ({
                id: p.id,
                title: p.title,
                artist: p.artist,
                style: p.style || 'Custom Commission',
                image: p.fileUrl,
                concept: p.concept || p.description || 'Custom client commission',
                deliverables: p.deliverables || ['Digital Master', 'Commercial License'],
              }));
            const existingIds = new Set(prev.map((a) => a.id));
            const newArts = customArts.filter((a: any) => !existingIds.has(a.id));
            return [...newArts, ...prev];
          });

          setAudio((prev) => {
            const customAudios = parsed
              .filter((p: any) => p.category === 'audio')
              .map((p: any) => ({
                id: p.id,
                title: p.title,
                artist: p.artist,
                type: 'mastering' as const,
                src: p.fileUrl,
                format: p.format || 'Commercial Streaming Master',
                lufs: p.lufs || '-9.0 LUFS',
                description: p.description || 'Custom audio mastering commission',
                engineerNotes: 'Mastered with precision dynamics and commercial loudness.',
                beforeNotes: 'Raw mix before mastering enhancement.',
                afterNotes: 'Mastered with commercial loudness and punch.',
              }));
            const existingIds = new Set(prev.map((a) => a.id));
            const newAudios = customAudios.filter((a: any) => !existingIds.has(a.id));
            return [...newAudios, ...prev];
          });

          setVideos((prev) => {
            const customVids = parsed
              .filter((p: any) => p.category === 'video')
              .map((p: any) => ({
                id: p.id,
                title: p.title,
                type: 'AI-Assisted Music Video',
                videoSrc: p.fileUrl,
                description: p.description || 'Custom music video reel commission',
                duration: p.duration || '02:30',
                aspectRatio: '16:9',
                relatedServiceSlug: 'ai-assisted-music-videos',
              }));
            const existingIds = new Set(prev.map((v) => v.id));
            const newVids = customVids.filter((v: any) => !existingIds.has(v.id));
            return [...newVids, ...prev];
          });
        }
      }
    } catch {}
  }, []);

  // Filter artworks by search
  const filteredArtworks = useMemo(() => {
    if (!searchQuery.trim()) return artworks;
    const q = searchQuery.toLowerCase();
    return artworks.filter(
      (a) => a.title.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q) || a.style.toLowerCase().includes(q)
    );
  }, [searchQuery, artworks]);

  // Filter audio by search
  const filteredAudio = useMemo(() => {
    if (!searchQuery.trim()) return audio;
    const q = searchQuery.toLowerCase();
    return audio.filter(
      (a) => a.title.toLowerCase().includes(q) || (a.artist && a.artist.toLowerCase().includes(q)) || a.type.toLowerCase().includes(q)
    );
  }, [searchQuery, audio]);

  // Filter videos by search
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    const q = searchQuery.toLowerCase();
    return videos.filter(
      (v) => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.type.toLowerCase().includes(q)
    );
  }, [searchQuery, videos]);

  // Filter web by search
  const filteredWeb = useMemo(() => {
    if (!searchQuery.trim()) return websites;
    const q = searchQuery.toLowerCase();
    return websites.filter(
      (w) => w.title.toLowerCase().includes(q) || w.category.toLowerCase().includes(q) || w.clientType.toLowerCase().includes(q)
    );
  }, [searchQuery, websites]);

  // Filter campaigns by search
  const filteredCampaigns = useMemo(() => {
    if (!searchQuery.trim()) return campaigns;
    const q = searchQuery.toLowerCase();
    return campaigns.filter(
      (c) => c.title.toLowerCase().includes(q) || c.artistName.toLowerCase().includes(q) || c.genre.toLowerCase().includes(q)
    );
  }, [searchQuery, campaigns]);

  return (
    <main className="review-page">
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="page-hero review-hero">
        <div className="eyebrow">THE MAINAHTUNESTEAM CREATIVE PORTFOLIO</div>
        <h1>
          Hear the sound.<br />
          <em>See the vision. Verify results.</em>
        </h1>
        <p>
          A comprehensive showcase of authentic client work, master audio recordings, original AI music videos,
          responsive web platforms, and data-backed music promotion campaigns.
        </p>

        <div className="review-stats">
          <span><b>{artworks.length}</b> COVER ARTWORKS</span>
          <span><b>{audio.length}</b> MASTER AUDIO TRACKS</span>
          <span><b>{videos.length}</b> AI MUSIC VIDEOS</span>
          <span><b>{websites.length}</b> WEB PLATFORMS</span>
          <span><b>{campaigns.length}</b> CAMPAIGN CASE STUDIES</span>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SEARCH & CATEGORY FILTER BAR
         ========================================================================= */}
      <section className="section portfolio-controls-section">
        <div className="portfolio-filter-bar">
          <div className="search-bar-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by artist, project title, genre, or keyword..."
              className="services-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>

          <div className="portfolio-tab-pills">
            <button
              type="button"
              className={activeTab === 'ALL' ? 'cat-pill active' : 'cat-pill'}
              onClick={() => setActiveTab('ALL')}
            >
              All Works ({artworks.length + audio.length + videos.length + websites.length + campaigns.length})
            </button>
            <button
              type="button"
              className={activeTab === 'ARTWORK' ? 'cat-pill active' : 'cat-pill'}
              onClick={() => setActiveTab('ARTWORK')}
            >
              <Palette size={13} /> Cover Artwork ({artworks.length})
            </button>
            <button
              type="button"
              className={activeTab === 'AUDIO' ? 'cat-pill active' : 'cat-pill'}
              onClick={() => setActiveTab('AUDIO')}
            >
              <Volume2 size={13} /> Audio Mastering &amp; Mixing ({audio.length})
            </button>
            <button
              type="button"
              className={activeTab === 'VIDEO' ? 'cat-pill active' : 'cat-pill'}
              onClick={() => setActiveTab('VIDEO')}
            >
              <Film size={13} /> AI Music Videos ({videos.length})
            </button>
            <button
              type="button"
              className={activeTab === 'WEBSITES' ? 'cat-pill active' : 'cat-pill'}
              onClick={() => setActiveTab('WEBSITES')}
            >
              <Laptop size={13} /> Web Development ({websites.length})
            </button>
            <button
              type="button"
              className={activeTab === 'CAMPAIGNS' ? 'cat-pill active' : 'cat-pill'}
              onClick={() => setActiveTab('CAMPAIGNS')}
            >
              <TrendingUp size={13} /> Promotion Case Studies ({campaigns.length})
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: ALBUM & SINGLE COVER ARTWORK (19 PRESERVED ARTWORKS)
         ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'ARTWORK') && (
        <section className="section artwork-section" id="cover-artwork">
          <div className="section-heading">
            <div>
              <div className="eyebrow">VISUAL IDENTITY &amp; ART DIRECTION</div>
              <h2>
                Album &amp; Single <em>Cover Artwork</em>
              </h2>
              <p>
                A curated gallery of 20 original cover designs spanning R&amp;B, Blues, Hip-Hop, Indie Romance, and 3D Character Art. Click any artwork to preview in full resolution.
              </p>
            </div>
            <span className="audio-count">{filteredArtworks.length} ARTWORKS</span>
          </div>

          <ArtworkLightboxModal artworks={filteredArtworks} />
        </section>
      )}

      {/* =========================================================================
          SECTION 2: AUDIO SAMPLES (3 MASTERING, 3 MIXING WITH A/B COMPARE)
         ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'AUDIO') && (
        <section className="section audio-section" id="mastering">
          <div className="section-heading">
            <div>
              <div className="eyebrow">AUDIO ENGINEERING &amp; POST-PRODUCTION</div>
              <h2>
                Music Mixing &amp; <em>Track Mastering</em>
              </h2>
              <p>
                Experience our 6 preserved studio audio samples. Use the interactive A/B comparison toggle to hear the difference between raw mixdowns and release-ready masters.
              </p>
            </div>
            <span className="audio-count">{filteredAudio.length} AUDIO TRACKS</span>
          </div>

          <AudioPlayerCatalog tracks={filteredAudio} />
        </section>
      )}

      {/* =========================================================================
          SECTION 3: AI MUSIC VIDEOS (2 PRESERVED SAMPLES)
         ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'VIDEO') && (
        <section className="section ai-video-section" id="ai-music-video">
          <div className="section-heading">
            <div>
              <div className="eyebrow">MOTION &amp; GENERATIVE CINEMATOGRAPHY</div>
              <h2>
                AI-Assisted <em>Music Videos</em>
              </h2>
              <p>
                Watch the two original AI music video samples in their uncompressed, original form. Directed with surreal character design, rhythmic pacing, and cinematic color grades.
              </p>
            </div>
            <span className="audio-count">{filteredVideos.length} VIDEO SAMPLES</span>
          </div>

          <div className="video-catalog-grid">
            {filteredVideos.map((video) => (
              <article className="ai-video-card" key={video.id}>
                <div className="ai-video-frame">
                  {video.videoSrc.includes('youtube.com') || video.videoSrc.includes('youtu.be') ? (
                    <iframe
                      src={
                        video.videoSrc.includes('youtu.be/')
                          ? `https://www.youtube.com/embed/${video.videoSrc.split('youtu.be/')[1]?.split('?')[0]}`
                          : `https://www.youtube.com/embed/${video.videoSrc.split('v=')[1]?.split('&')[0] || ''}`
                      }
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', minHeight: '320px', border: 'none' }}
                    />
                  ) : video.videoSrc.includes('vimeo.com') ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${video.videoSrc.split('vimeo.com/')[1]?.split('?')[0]}`}
                      title={video.title}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      style={{ width: '100%', height: '100%', minHeight: '320px', border: 'none' }}
                    />
                  ) : video.videoSrc.includes('drive.google.com') ? (
                    <iframe
                      src={video.videoSrc.replace(/\/view(\?.*)?$/, '/preview')}
                      title={video.title}
                      allow="autoplay"
                      style={{ width: '100%', height: '100%', minHeight: '320px', border: 'none' }}
                    />
                  ) : (
                    <video
                      controls
                      preload="metadata"
                      playsInline
                      poster={video.poster}
                      aria-label={video.title}
                    >
                      <source src={video.videoSrc} type="video/mp4" />
                      Your browser does not support HTML5 video playback.
                    </video>
                  )}
                </div>
                <div className="ai-video-meta">
                  <div>
                    <span className="eyebrow">{video.type.toUpperCase()}</span>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                  <div className="video-card-actions">
                    <Link
                      href={`/services/${video.relatedServiceSlug}`}
                      className="text-link"
                    >
                      Explore Service Details ↗
                    </Link>
                    <Link
                      href={`/contact?service=AI-Assisted%20Music%20Video%20Production&project=${encodeURIComponent(
                        video.title
                      )}`}
                      className="button button-orange"
                    >
                      Request Similar Video ↗
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 4: WEBSITE DEVELOPMENT PORTFOLIO (8 PROJECTS)
         ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'WEBSITES') && (
        <section className="section web-portfolio-section" id="websites">
          <div className="section-heading">
            <div>
              <div className="eyebrow">DIGITAL &amp; WEB ENGINEERING</div>
              <h2>
                Website Development <em>Portfolio</em>
              </h2>
              <p>
                Explore 8 custom web projects engineered for artists, labels, and creative brands. Switch between desktop and mobile previews, explore features, and inspect tech stacks.
              </p>
            </div>
            <span className="audio-count">{filteredWeb.length} WEB PROJECTS</span>
          </div>

          <WebDevShowcase projects={filteredWeb} />
        </section>
      )}

      {/* =========================================================================
          SECTION 5: MUSIC PROMOTION CASE STUDIES (4 VERIFIED CAMPAIGNS)
         ========================================================================= */}
      {(activeTab === 'ALL' || activeTab === 'CAMPAIGNS') && (
        <section className="section promo-case-section" id="case-studies">
          <div className="section-heading">
            <div>
              <div className="eyebrow">AUDIENCE GROWTH &amp; CAMPAIGN BLUEPRINTS</div>
              <h2>
                Music Promotion <em>Case Studies</em>
              </h2>
              <p>
                Verified campaign breakdowns detailing objectives, platform channels, strategy timelines, and organic streaming outcomes. Zero bot farms or fabricated numbers.
              </p>
            </div>
            <span className="audio-count">{filteredCampaigns.length} CAMPAIGN STUDIES</span>
          </div>

          <PromotionCaseStudyCard caseStudies={filteredCampaigns} />
        </section>
      )}

      {/* =========================================================================
          BOTTOM CTA
         ========================================================================= */}
      <section className="review-cta">
        <div className="eyebrow">READY TO MAKE YOUR NEXT MOVE?</div>
        <h2>
          Let’s make your next release <em>impossible to ignore.</em>
        </h2>
        <p>
          Whether you need single cover artwork, world-class mastering, a viral video, or a custom artist web platform,
          we provide custom quotations tailored to your exact creative vision.
        </p>
        <Link className="button button-orange" href="/contact">
          Start Your Project Enquiry ↗
        </Link>
      </section>
    </main>
  );
}
