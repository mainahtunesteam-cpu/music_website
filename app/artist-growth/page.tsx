import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Sparkles,
  Sliders,
  Palette,
  Send,
  TrendingUp,
  Globe,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Headphones,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Artist Growth & Career Development Roadmap | MainahtunesTeam',
  description:
    'A 7-stage creative and strategic framework designed to guide independent recording artists from raw demos to global reach.',
};

const stages = [
  {
    step: '01',
    title: 'Artist Identity & Visual Branding',
    subtitle: 'The Foundation',
    icon: Sparkles,
    tagline: 'Define who you are before you ask the world to listen.',
    overview:
      'We work with recording artists to uncover their authentic story, aesthetic tone, and distinct visual signature. From logo design and typography kits to comprehensive brand books and mood boards, we ensure your artist identity stands out instantly across streaming services and social media.',
    deliverables: [
      'Comprehensive Brand Guidelines & Typography',
      'Artist Logo, Insignia & Monogram Design',
      'Color Palettes & Visual Mood Boards',
      'Social Media Profile Kits & Banners',
    ],
    services: [
      { name: 'Artist Branding', slug: 'artist-branding' },
      { name: 'Logo Design & Visual Identity', slug: 'logo-design-visual-identity' },
      { name: 'Social Media Branding', slug: 'social-media-branding' },
    ],
    sampleRef: '/visuals#cover-artwork',
    sampleLabel: 'View Visual Branding Samples ↗',
  },
  {
    step: '02',
    title: 'Music Mixing & Track Mastering',
    subtitle: 'Sonic Excellence',
    icon: Sliders,
    tagline: 'Give your songs the warmth, depth, and punch of international releases.',
    overview:
      'Great songwriting deserves world-class production fidelity. Our audio engineering team works with individual vocal stems, multi-track sessions, and stereo mixes to deliver release-ready masters calibrated for Spotify, Apple Music, radio broadcasting, and sync licensing.',
    deliverables: [
      'Multi-track Balancing & Dynamic Stereo Imaging',
      'Vocal Tuning, Pitch Correction & Pocketing',
      'Audio Restoration, De-essing & Hum Removal',
      'Release-ready Stereo & Streaming Masters',
    ],
    services: [
      { name: 'Music Mixing', slug: 'music-mixing' },
      { name: 'Track Mastering', slug: 'track-mastering' },
      { name: 'Vocal Editing & Tuning', slug: 'vocal-editing-tuning' },
    ],
    sampleRef: '/visuals#mastering',
    sampleLabel: 'Listen to Audio Mastering Samples ↗',
  },
  {
    step: '03',
    title: 'Cover Artwork & Visual Production',
    subtitle: 'Visual Storytelling',
    icon: Palette,
    tagline: 'Make the first visual impression of your music unforgettable.',
    overview:
      'In a visual-first streaming landscape, artwork and motion determine whether a listener hits play. We create striking album and single covers, 2D and 3D animated visualizers, lyric videos, and AI-assisted music videos that capture the soul of each record.',
    deliverables: [
      'Original Single & Album Cover Artwork (3000x3000px)',
      'AI-Assisted & Cinematic Music Videos',
      'Dynamic Lyric Videos & Kinetic Motion',
      'Canvas Loops & Social Teaser Cutdowns',
    ],
    services: [
      { name: 'Album & Single Cover Artwork', slug: 'album-single-cover-artwork' },
      { name: 'AI-Assisted Music Video Production', slug: 'ai-assisted-music-videos' },
      { name: 'Lyric Video Production', slug: 'lyric-video-production' },
    ],
    sampleRef: '/visuals#cover-artwork',
    sampleLabel: 'Explore 19 Cover Artwork Samples ↗',
  },
  {
    step: '04',
    title: 'Music Distribution & Release Preparation',
    subtitle: 'Platform Readiness',
    icon: Send,
    tagline: 'Flawless platform delivery, metadata accuracy, and sync readiness.',
    overview:
      'Avoid release day headaches. We manage release timelines, audio formats, clean metadata tagging (ISRC, UPC, songwriter splits), and delivery coordination to all major digital service providers (Spotify, Apple Music, Tidal, Amazon, Deezer, TikTok).',
    deliverables: [
      'Metadata & Asset Compliance Audits',
      'Release Timeline & Lead-Time Coordination',
      'Sync Licensing Catalogue Preparation',
      'Split-Sheet & Copyright Documentation Guidance',
    ],
    services: [
      { name: 'Music Distribution', slug: 'music-distribution' },
      { name: 'Sync Licensing', slug: 'sync-licensing' },
      { name: 'Music Copyright Support', slug: 'music-copyright-support' },
    ],
    sampleRef: '/services/music-distribution',
    sampleLabel: 'Explore Distribution Workflows ↗',
  },
  {
    step: '05',
    title: 'Music Promotion & Audience Development',
    subtitle: 'Listener Discovery',
    icon: TrendingUp,
    tagline: 'Targeted campaigns that connect your sound with genuine listeners.',
    overview:
      'We design organic, strategy-backed promotion campaigns designed to spark discovery and grow genuine listener bases. From editorial playlist pitch submissions and independent curator outreach to TikTok music campaigns and radio servicing.',
    deliverables: [
      'Tailored Editorial Playlist Pitch Copy',
      'Independent Curator Outreach Strategy',
      'TikTok & Reels Sound Campaign Direction',
      'Radio Servicing Materials & Press Packs',
    ],
    services: [
      { name: 'Music Promotion', slug: 'music-promotion' },
      { name: 'Playlist Pitching', slug: 'playlist-pitching' },
      { name: 'Spotify Promotion', slug: 'spotify-promotion' },
    ],
    sampleRef: '/services/music-promotion',
    sampleLabel: 'Explore Promotion Case Studies ↗',
  },
  {
    step: '06',
    title: 'Artist Websites & Digital Footprint',
    subtitle: 'Owned Presence',
    icon: Globe,
    tagline: 'Own your digital home and direct relationship with fans.',
    overview:
      'Social media algorithms change; an official artist website is forever. We design and build responsive, lightning-fast artist websites featuring integrated audio players, gig listings, tour dates, merch e-commerce stores, and Google Knowledge Panel entity optimization.',
    deliverables: [
      'Custom Responsive Artist & Beatmaker Websites',
      'Merch Store & E-commerce Integration',
      'Google Knowledge Panel Entity Signals',
      'Artist EPK & Electronic Press Kit Portals',
    ],
    services: [
      { name: 'Artist Website Development', slug: 'artist-website-development' },
      { name: 'Google Knowledge Panel Support', slug: 'google-knowledge-panel-development-support' },
      { name: 'E-commerce Website Development', slug: 'ecommerce-website-development' },
    ],
    sampleRef: '/services/artist-website-development',
    sampleLabel: 'View Artist Website Demonstrations ↗',
  },
  {
    step: '07',
    title: 'Long-Term Creative Development',
    subtitle: 'Sustainable Career',
    icon: Rocket,
    tagline: 'A continuous partnership supporting your journey release after release.',
    overview:
      'Sustainable music careers are built over time. MainahtunesTeam acts as your standing creative director and digital operations arm, coordinating multi-single rollout strategies, EP/Album cycles, brand sponsorships, merchandise expansion, and digital catalog audits.',
    deliverables: [
      'Multi-release Rollout Roadmaps & Strategy',
      'Catalog Digital Presence Audits',
      'Merchandise Expansion & Tour Visuals',
      'Direct Access to Senior Creative Direction',
    ],
    services: [
      { name: 'Music Release Strategy & Campaign Planning', slug: 'music-release-strategy-campaign-planning' },
      { name: 'Digital Presence Audits', slug: 'digital-presence-audits' },
      { name: 'Artist Merchandise Design', slug: 'artist-merchandise-design' },
    ],
    sampleRef: '/contact',
    sampleLabel: 'Book Long-Term Advisory Discussion ↗',
  },
];

export default function ArtistGrowthPage() {
  return (
    <main>
      <section className="page-hero growth-hero">
        <div className="eyebrow">ARTIST DEVELOPMENT FRAMEWORK</div>
        <h1>
          From raw talent to <em>global resonance.</em>
        </h1>
        <p>
          Building a lasting music career requires more than great songs. Our 7-stage creative development
          framework guides independent artists through every milestone of sonic, visual, and digital growth.
        </p>
        <div className="catalog-count">
          <strong>07</strong>
          <span>Stages · End-to-End Creative Support</span>
        </div>
      </section>

      <section className="section growth-timeline-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">THE 7-STAGE BLUEPRINT</div>
            <h2>How MainahtunesTeam builds artist careers</h2>
          </div>
          <p>
            Whether you need support on a single release or long-term management of your creative direction,
            we connect every piece into one cohesive machine.
          </p>
        </div>

        <div className="growth-stages-list">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <article className="growth-stage-card" key={stage.step}>
                <div className="stage-card-sidebar">
                  <span className="stage-num">{stage.step}</span>
                  <div className="stage-icon-wrap">
                    <Icon size={24} />
                  </div>
                  <span className="stage-badge">{stage.subtitle}</span>
                </div>

                <div className="stage-card-body">
                  <div className="stage-header">
                    <h3>{stage.title}</h3>
                    <p className="stage-tagline">&ldquo;{stage.tagline}&rdquo;</p>
                  </div>

                  <p className="stage-overview">{stage.overview}</p>

                  <div className="stage-deliverables-box">
                    <small>KEY DELIVERABLES IN THIS STAGE</small>
                    <div className="stage-deliverables-grid">
                      {stage.deliverables.map((item) => (
                        <div key={item} className="stage-deliv-item">
                          <CheckCircle2 size={15} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="stage-footer">
                    <div className="stage-services-pills">
                      <small>RELATED SERVICES:</small>
                      {stage.services.map((srv) => (
                        <Link
                          key={srv.slug}
                          href={`/services/${srv.slug}`}
                          className="service-pill"
                        >
                          {srv.name} <span>↗</span>
                        </Link>
                      ))}
                    </div>

                    <Link href={stage.sampleRef} className="sample-link">
                      {stage.sampleLabel}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <div className="eyebrow">YOUR NEXT CHAPTER STARTS NOW</div>
          <h2>Ready to map your artist development?</h2>
          <p>
            Tell us where you are in your career journey and where you want to go. We will help formulate the right creative and strategic roadmap.
          </p>
        </div>
        <Link className="button button-orange" href="/contact">
          Schedule a Career Discussion ↗
        </Link>
      </section>
    </main>
  );
}
