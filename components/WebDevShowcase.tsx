'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Laptop,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Layers,
  ArrowRight,
  Code2,
  ShoppingBag,
  Play,
  Pause,
  Calendar,
  Users,
  Music,
  Clock,
  Sparkles,
} from 'lucide-react';
import type { WebProject } from '@/data/portfolio';

interface Props {
  projects: WebProject[];
}

export default function WebDevShowcase({ projects }: Props) {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || '');
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Interactive demo states
  const [cartCount, setCartCount] = useState(0);
  const [preSaved, setPreSaved] = useState(false);
  const [demoPlaying, setDemoPlaying] = useState(false);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="web-portfolio-wrapper">
      {/* Project Selector Navigation */}
      <div className="web-project-pills">
        {projects.map((proj) => (
          <button
            key={proj.id}
            type="button"
            className={selectedProjectId === proj.id ? 'web-pill active' : 'web-pill'}
            onClick={() => {
              setSelectedProjectId(proj.id);
              setDemoPlaying(false);
            }}
          >
            <span className="pill-cat">{proj.category}</span>
            <span className="pill-title">{proj.title}</span>
          </button>
        ))}
      </div>

      {activeProject && (
        <div className="web-display-card">
          <div className="web-display-header">
            <div>
              <span className="eyebrow">{activeProject.category.toUpperCase()}</span>
              <h2>{activeProject.title}</h2>
              <p className="client-type-label">Client Type: <strong>{activeProject.clientType}</strong></p>
            </div>

            <div className="device-toggle-bar">
              <button
                type="button"
                className={activeDevice === 'desktop' ? 'dev-btn active' : 'dev-btn'}
                onClick={() => setActiveDevice('desktop')}
                aria-label="Desktop preview"
              >
                <Laptop size={14} /> Desktop View
              </button>
              <button
                type="button"
                className={activeDevice === 'mobile' ? 'dev-btn active' : 'dev-btn'}
                onClick={() => setActiveDevice('mobile')}
                aria-label="Mobile preview"
              >
                <Smartphone size={14} /> Mobile View
              </button>
            </div>
          </div>

          {/* Interactive Simulated Device Mockup */}
          <div className="device-frame-container">
            {activeDevice === 'desktop' ? (
              <div className="desktop-browser-frame">
                <div className="browser-topbar">
                  <div className="browser-dots">
                    <i /><i /><i />
                  </div>
                  <div className="browser-url">
                    https://{activeProject.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.mainahtunesteam.com
                  </div>
                  <div className="browser-actions">
                    <ExternalLink size={13} />
                  </div>
                </div>

                <div className="browser-canvas">
                  {/* Dynamic interactive content based on project type */}
                  {activeProject.id === 'web-01' && (
                    <div className="interactive-web-screen artist-site-screen">
                      <div className="screen-hero-bar">
                        <span className="screen-brand">ELARA MOORE · OFFICIAL SITE</span>
                        <nav className="screen-nav">
                          <span>Music</span>
                          <span>Tour</span>
                          <span>Merch</span>
                          <span className="active-pill">Listen Now</span>
                        </nav>
                      </div>
                      <div className="screen-content-area">
                        <div className="screen-left">
                          <span className="screen-kicker">NEW SINGLE OUT NOW</span>
                          <h3>&ldquo;Kiss of Life&rdquo; (Deluxe Master)</h3>
                          <p>Available on all streaming platforms worldwide.</p>
                          <div className="mini-player-strip">
                            <button
                              type="button"
                              className="mini-play-btn"
                              onClick={() => setDemoPlaying(!demoPlaying)}
                            >
                              {demoPlaying ? <Pause size={14} /> : <Play size={14} />}
                            </button>
                            <span>{demoPlaying ? 'Streaming: Kiss of Life (01:24 / 03:30)' : 'Click to preview track'}</span>
                          </div>
                        </div>
                        <div className="screen-right-dates">
                          <h4>UPCOMING WORLD TOUR</h4>
                          <div className="tour-row">
                            <span>NOV 24</span>
                            <b>New York, NY — Webster Hall</b>
                            <button type="button" className="tour-tix-btn">Tickets</button>
                          </div>
                          <div className="tour-row">
                            <span>DEC 02</span>
                            <b>London, UK — O2 Academy</b>
                            <button type="button" className="tour-tix-btn">Tickets</button>
                          </div>
                          <div className="tour-row">
                            <span>DEC 10</span>
                            <b>Paris, FR — Le Bataclan</b>
                            <button type="button" className="tour-tix-btn">Sold Out</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProject.id === 'web-04' && (
                    <div className="interactive-web-screen merch-site-screen">
                      <div className="screen-hero-bar">
                        <span className="screen-brand">OFFICIAL ARTIST MERCH STORE</span>
                        <div className="screen-cart-badge">
                          <ShoppingBag size={14} /> Cart: <b>{cartCount} items</b>
                        </div>
                      </div>
                      <div className="merch-demo-grid">
                        <div className="merch-item-box">
                          <span className="item-tag">VINYL</span>
                          <h4>Heavyweight 180g Gatefold Vinyl</h4>
                          <span className="item-price">$38.00</span>
                          <button
                            type="button"
                            className="item-btn"
                            onClick={() => setCartCount((c) => c + 1)}
                          >
                            + Add to Cart
                          </button>
                        </div>
                        <div className="merch-item-box">
                          <span className="item-tag">APPAREL</span>
                          <h4>Tour Heavyweight Hoodie</h4>
                          <span className="item-price">$65.00</span>
                          <button
                            type="button"
                            className="item-btn"
                            onClick={() => setCartCount((c) => c + 1)}
                          >
                            + Add to Cart
                          </button>
                        </div>
                        <div className="merch-item-box">
                          <span className="item-tag">COLLECTIBLE</span>
                          <h4>Enamel Lapel Pin 3-Pack</h4>
                          <span className="item-price">$16.00</span>
                          <button
                            type="button"
                            className="item-btn"
                            onClick={() => setCartCount((c) => c + 1)}
                          >
                            + Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProject.id === 'web-06' && (
                    <div className="interactive-web-screen presave-screen">
                      <div className="presave-center-card">
                        <span className="presave-kicker">OFFICIAL PRE-SAVE CAMPAIGN</span>
                        <h3>MAINAH RECORDS · NEW ALBUM</h3>
                        <div className="presave-timer">
                          <div><b>04</b><small>DAYS</small></div>
                          <div><b>18</b><small>HOURS</small></div>
                          <div><b>42</b><small>MINS</small></div>
                          <div><b>09</b><small>SECS</small></div>
                        </div>
                        <div className="presave-actions">
                          <button
                            type="button"
                            className={preSaved ? 'presave-btn saved' : 'presave-btn'}
                            onClick={() => setPreSaved(true)}
                          >
                            {preSaved ? '✓ Pre-Saved to Spotify!' : 'Pre-Save on Spotify ↗'}
                          </button>
                          <button
                            type="button"
                            className="presave-btn outline"
                            onClick={() => setPreSaved(true)}
                          >
                            Pre-Add on Apple Music ↗
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeProject.id !== 'web-01' && activeProject.id !== 'web-04' && activeProject.id !== 'web-06' && (
                    <div className="canvas-agency-header">
                      <span className="agency-brand-tag">MAINAHTUNESTEAM DIGITAL PRODUCTION</span>
                      <h3>{activeProject.title}</h3>
                      <p>{activeProject.overview}</p>
                      <div className="canvas-tech-row">
                        {activeProject.techStack.map((tech) => (
                          <span key={tech} className="tech-badge">
                            <Code2 size={12} /> {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mobile-phone-frame">
                <div className="phone-notch">
                  <div className="phone-speaker" />
                  <div className="phone-camera" />
                </div>
                <div className="phone-screen">
                  <div className="phone-content">
                    <span className="mobile-tag">100% RESPONSIVE VIEW</span>
                    <h4>{activeProject.title}</h4>
                    <p>{activeProject.overview}</p>
                    <div className="mobile-features-compact">
                      {activeProject.features.slice(0, 4).map((f) => (
                        <div key={f} className="mobile-feat-row">
                          <CheckCircle2 size={12} /> <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="phone-home-indicator" />
              </div>
            )}
          </div>

          {/* Features and Details Grid */}
          <div className="web-details-grid">
            <div className="web-features-col">
              <h4>CORE FEATURES &amp; CAPABILITIES</h4>
              <div className="features-checklist">
                {activeProject.features.map((feature) => (
                  <div key={feature} className="feat-item">
                    <CheckCircle2 size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="web-tech-col">
              <h4>TECHNOLOGY ARCHITECTURE</h4>
              <div className="tech-badges-grid">
                {activeProject.techStack.map((tech) => (
                  <div key={tech} className="tech-chip">
                    <Code2 size={14} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>

              <div className="web-demo-actions">
                <Link
                  href={`/contact?service=Website%20Development&project=${encodeURIComponent(
                    activeProject.title
                  )}`}
                  className="button button-orange"
                >
                  Commission This Website Architecture <span>↗</span>
                </Link>
                <Link
                  href={`/services/${activeProject.relatedServiceSlug}`}
                  className="button button-outline"
                >
                  Explore Service Specifications
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
