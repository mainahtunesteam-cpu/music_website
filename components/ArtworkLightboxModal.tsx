'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ExternalLink, ArrowRight, Sparkles, CheckCircle2, ZoomIn, Download } from 'lucide-react';
import type { ArtworkProject } from '@/data/portfolio';

interface Props {
  artworks: ArtworkProject[];
}

function getArtworkSrc(img: string): string {
  if (!img) return '/brand/placeholder.png';
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:') || img.startsWith('/')) {
    return img;
  }
  return `/artwork/${img}`;
}

export default function ArtworkLightboxModal({ artworks }: Props) {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkProject | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArtwork(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedArtwork]);

  return (
    <>
      <div className="artwork-grid">
        {artworks.map((item, index) => (
          <article
            className="artwork-card"
            key={item.id}
            onClick={() => setSelectedArtwork(item)}
            tabIndex={0}
            role="button"
            aria-label={`Open ${item.title} artwork preview`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedArtwork(item);
              }
            }}
          >
            <div className="artwork-image-container">
              <Image
                src={failedImages[item.id] ? '/brand/placeholder.png' : getArtworkSrc(item.image)}
                alt={`${item.title} by ${item.artist}`}
                width={500}
                height={500}
                className="artwork-thumb-img"
                loading="lazy"
                unoptimized
                onError={() => {
                  setFailedImages((prev) => ({ ...prev, [item.id]: true }));
                }}
              />
              <div className="artwork-overlay-hover">
                <span className="artwork-view-tag">
                  <ZoomIn size={14} /> Full Resolution ↗
                </span>
              </div>
            </div>

            <div className="artwork-caption">
              <span className="eyebrow">
                {String(index + 1).padStart(2, '0')} / {item.style}
              </span>
              <h3>{item.title}</h3>
              <p>{item.artist}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedArtwork && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedArtwork(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedArtwork(null)}
              aria-label="Close artwork preview"
            >
              <X size={24} />
            </button>

            <div className="lightbox-grid">
              <div className="lightbox-art-display">
                <div className="lightbox-image-wrap">
                  <Image
                    src={failedImages[selectedArtwork.id] ? '/brand/placeholder.png' : getArtworkSrc(selectedArtwork.image)}
                    alt={`${selectedArtwork.title} by ${selectedArtwork.artist}`}
                    width={900}
                    height={900}
                    className="lightbox-master-img"
                    priority
                    unoptimized
                    onError={() => {
                      setFailedImages((prev) => ({ ...prev, [selectedArtwork.id]: true }));
                    }}
                  />
                </div>
              </div>

              <div className="lightbox-details-panel">
                <div className="lightbox-details-header">
                  <span className="sample-badge">
                    <Sparkles size={13} /> {selectedArtwork.style} · 3000 × 3000 PX MASTER
                  </span>
                  <h2>{selectedArtwork.title}</h2>
                  <p className="artist-byline">Artist / Client: <strong>{selectedArtwork.artist}</strong></p>
                </div>

                <div className="concept-box">
                  <small>CREATIVE CONCEPT &amp; ART DIRECTION</small>
                  <p>{selectedArtwork.concept}</p>
                </div>

                <div className="lightbox-specs-section">
                  <small>DELIVERABLES DELIVERED TO CLIENT</small>
                  <ul>
                    {selectedArtwork.deliverables.map((d) => (
                      <li key={d}>
                        <CheckCircle2 size={14} /> <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lightbox-actions-bar">
                  <Link
                    href={`/contact?service=Album%20%26%20Single%20Cover%20Artwork&project=${encodeURIComponent(
                      selectedArtwork.title
                    )}`}
                    className="button button-orange"
                  >
                    Commission Similar Artwork <span>↗</span>
                  </Link>
                  <a
                    href={getArtworkSrc(selectedArtwork.image)}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-outline"
                  >
                    Open Master File ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
