'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { categories, services } from '@/data/services';
import { Search, ArrowUpRight, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'ALL' || service.categoryNumber === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main>
      {/* =========================================================================
          DIRECTORY HERO
         ========================================================================= */}
      <section className="page-hero services-hero">
        <div className="eyebrow">THE MAINAHTUNESTEAM SERVICE DIRECTORY</div>
        <h1>
          One creative partner.<br />
          <em>53 ways to move forward.</em>
        </h1>
        <p>
          Music distribution, audio engineering, cinematic visuals, artist branding, digital presence,
          and custom web development — connected under one international agency roof.
        </p>
        <div className="catalog-count">
          <strong>53</strong>
          <span>Services · 6 Connected Disciplines · Tailored Quotations</span>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SEARCH & DISCIPLINE JUMPS
         ========================================================================= */}
      <section className="section catalog-filter-section">
        <div className="filter-controls-wrap">
          <div className="search-bar-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 53 services (e.g. Mixing, Spotify, AI Video, Merch, Website)..."
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

          <div className="category-jump-pills">
            <button
              type="button"
              className={selectedCategory === 'ALL' ? 'jump-pill active' : 'jump-pill'}
              onClick={() => setSelectedCategory('ALL')}
            >
              <span>ALL</span> All 53 Services
            </button>
            {categories.map((cat) => {
              const count = services.filter((s) => s.category === cat.name).length;
              return (
                <button
                  key={cat.number}
                  type="button"
                  className={selectedCategory === cat.number ? 'jump-pill active' : 'jump-pill'}
                  onClick={() => setSelectedCategory(cat.number)}
                >
                  <span>{cat.number}</span> {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SERVICES LISTING
         ========================================================================= */}
      <section className="section services-catalog-list">
        {selectedCategory === 'ALL' && searchQuery.trim() === '' ? (
          // Render grouped by discipline
          categories.map((cat) => {
            const items = services.filter((s) => s.category === cat.name);
            return (
              <div className="discipline-block" id={`discipline-${cat.number}`} key={cat.number}>
                <div className="category-heading">
                  <div>
                    <div className="eyebrow">DISCIPLINE {cat.number}</div>
                    <h2>{cat.name}</h2>
                    <p>{cat.description}</p>
                  </div>
                  <span className="category-total">{String(items.length).padStart(2, '0')} SERVICES</span>
                </div>

                <div className="services-grid">
                  {items.map((service, index) => (
                    <article className="service-card catalog-card" key={service.slug}>
                      <div className="service-card-top">
                        <small>{cat.number} / {String(index + 1).padStart(2, '0')}</small>
                        <span className="sample-type-badge">{service.sampleType}</span>
                      </div>
                      <h3>{service.name}</h3>
                      <p>{service.short}</p>
                      <Link href={`/services/${service.slug}`} className="service-card-link">
                        <span>Explore details &amp; samples</span>
                        <ArrowUpRight size={16} />
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          // Render filtered results
          <div className="filtered-results-block">
            <div className="filtered-header">
              <h2>
                Found {filteredServices.length} {filteredServices.length === 1 ? 'Service' : 'Services'}
              </h2>
              {searchQuery && (
                <p>Matching keyword &ldquo;{searchQuery}&rdquo;</p>
              )}
            </div>

            {filteredServices.length === 0 ? (
              <div className="no-services-found">
                <p>No services match your search criteria. Try a different keyword or reset filters.</p>
                <button
                  type="button"
                  className="button button-orange"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('ALL');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="services-grid">
                {filteredServices.map((service, index) => (
                  <article className="service-card catalog-card" key={service.slug}>
                    <div className="service-card-top">
                      <small>DISCIPLINE {service.categoryNumber}</small>
                      <span className="sample-type-badge">{service.sampleType}</span>
                    </div>
                    <h3>{service.name}</h3>
                    <p>{service.short}</p>
                    <Link href={`/services/${service.slug}`} className="service-card-link">
                      <span>Explore details &amp; samples</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* =========================================================================
          DIRECTORY BOTTOM CTA
         ========================================================================= */}
      <section className="cta-band">
        <div>
          <div className="eyebrow">CUSTOM QUOTATIONS · MULTI-SERVICE COMBINATIONS</div>
          <h2>
            Have a project spanning multiple disciplines?
          </h2>
          <p>
            Combine music production, artwork, video creation, and custom website development into one cohesive rollout plan.
            Tell us about your goals for a customized project quotation.
          </p>
        </div>
        <Link className="button button-orange" href="/contact">
          Request Custom Quotation ↗
        </Link>
      </section>
    </main>
  );
}
