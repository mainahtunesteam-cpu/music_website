import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { categories, services, serviceBySlug } from '@/data/services';
import ServiceSampleShowcase from '@/components/ServiceSampleShowcase';
import { siteConfig } from '@/data/siteConfig';
import { CheckCircle2, ArrowRight, Sparkles, Shield, Compass, ArrowUpRight, MessageCircle } from 'lucide-react';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = serviceBySlug(params.slug);
  if (!service) return { title: 'Service not found | MainahtunesTeam' };
  return {
    title: `${service.name} | MainahtunesTeam`,
    description: service.short,
    openGraph: {
      title: `${service.name} — MainahtunesTeam Creative Agency`,
      description: service.short,
      url: `https://mainahtunesteam.com/services/${service.slug}`,
    },
  };
}

export default function ServiceDetail({ params }: Props) {
  const service = serviceBySlug(params.slug);
  if (!service) notFound();

  const category = categories.find((item) => item.name === service.category);
  const related = services
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, 3);

  // Split title for styling
  const nameParts = service.name.split(' ');
  const firstPart = nameParts.slice(0, -1).join(' ');
  const lastPart = nameParts[nameParts.length - 1];

  return (
    <main>
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="page-hero service-detail-hero">
        <div className="eyebrow">
          <Link href="/services">ALL 53 SERVICES</Link> / DISCIPLINE {service.categoryNumber} · {service.category.toUpperCase()}
        </div>
        <h1>
          {firstPart ? `${firstPart} ` : ''}<em>{lastPart}</em>
        </h1>
        <p className="detail-hero-lead">{service.intro}</p>

        <div className="actions service-hero-actions">
          <a className="button button-orange" href="#samples">
            Listen &amp; View Live Sample <span>↓</span>
          </a>
          <Link
            className="button button-dark"
            href={`/contact?service=${encodeURIComponent(service.name)}`}
          >
            Enquire About This Service <span>↗</span>
          </Link>
          <a
            className="button button-outline"
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Consultation <span>↗</span>
          </a>
        </div>

        <div className="detail-meta">
          <span>DISCIPLINE {service.categoryNumber} / {service.category.toUpperCase()}</span>
          <span>MAINAHTUNESTEAM · INTERNATIONAL CREATIVE SOLUTIONS</span>
        </div>
      </section>

      {/* =========================================================================
          COMPULSORY PORTFOLIO SAMPLE SHOWCASE COMPONENT
          (Placed immediately after Hero so visitors see real audio/artwork/video/web demos first!)
         ========================================================================= */}
      <ServiceSampleShowcase service={service} />

      {/* =========================================================================
          STRATEGIC BENEFITS SECTION
         ========================================================================= */}
      <section className="section detail-benefits-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">WHY CHOOSE THIS SERVICE</div>
            <h2>
              Strategic value for <em>your music &amp; brand.</em>
            </h2>
          </div>
          <p>
            We focus on tangible outcomes that improve listener discovery, brand authority, and commercial viability.
          </p>
        </div>

        <div className="benefits-grid">
          {service.benefits.map((benefit, idx) => (
            <article className="benefit-card" key={idx}>
              <div className="benefit-icon">
                <Sparkles size={20} />
              </div>
              <span className="benefit-number">0{idx + 1}</span>
              <h3>Key Advantage</h3>
              <p>{benefit}</p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          OVERVIEW & SCOPE SECTION
         ========================================================================= */}
      <section className="section detail-overview">
        <div>
          <div className="eyebrow">COMPREHENSIVE OVERVIEW</div>
          <h2>
            Engineered around <em>your next career chapter.</em>
          </h2>
        </div>
        <div>
          <p className="detail-lead">{service.overview}</p>
          {service.note && (
            <div className="detail-note">
              <Shield size={16} className="note-shield" />
              <div>
                <strong>Industry Standard Compliance:</strong>
                <p>{service.note}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          WHAT'S INCLUDED (DELIVERABLES)
         ========================================================================= */}
      <section className="section detail-deliverables">
        <div className="section-heading">
          <div>
            <div className="eyebrow">SPECIFIC OUTPUTS</div>
            <h2>What you will receive</h2>
          </div>
          <p>
            A defined, transparent scope agreed before work commences so every file meets release-ready standards.
          </p>
        </div>
        <div className="deliverable-grid">
          {service.deliverables.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          WORKING PROCESS
         ========================================================================= */}
      <section className="section detail-process">
        <div className="section-heading">
          <div>
            <div className="eyebrow">COLLABORATIVE METHODOLOGY</div>
            <h2>How we execute</h2>
          </div>
          <p>
            A transparent four-phase process keeping you informed, collaborative, and in creative control.
          </p>
        </div>
        <div className="steps-grid">
          {service.process.map((step, index) => (
            <article key={step}>
              <small>PHASE {String(index + 1).padStart(2, '0')}</small>
              <h3>{['Discovery', 'Planning', 'Creation', 'Delivery'][index] || 'Review'}</h3>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          RELATED SERVICES IN SAME DISCIPLINE
         ========================================================================= */}
      {related.length > 0 && (
        <section className="section related-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">DISCIPLINE COMPANIONS</div>
              <h2>Related {service.category} services</h2>
            </div>
            <p>Combine multiple services into a coordinated release campaign.</p>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <Link href={`/services/${item.slug}`} key={item.slug} className="related-card">
                <small>DISCIPLINE {item.categoryNumber}</small>
                <strong>{item.name}</strong>
                <p>{item.short}</p>
                <span className="related-link-text">
                  Explore service details <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          BOTTOM CTA BAND
         ========================================================================= */}
      <section className="cta-band">
        <div>
          <div className="eyebrow">BESPOKE QUOTATIONS · NO FIXED PACKAGES</div>
          <h2>
            Ready to collaborate on <em>{service.name}?</em>
          </h2>
          <p>
            Tell us about your project requirements, audio references, and preferred deadlines.
            We will provide a custom quotation tailored to your exact creative vision.
          </p>
        </div>
        <Link
          className="button button-orange"
          href={`/contact?service=${encodeURIComponent(service.name)}`}
        >
          Start Your Project Enquiry ↗
        </Link>
      </section>
    </main>
  );
}
