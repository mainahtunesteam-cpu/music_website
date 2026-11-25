import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Globe,
  Headphones,
  Palette,
  Laptop,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Creative Agency for Music & Digital Solutions | MainahtunesTeam',
  description:
    'Learn about MainahtunesTeam: our mission, vision, international creative expertise, client profiles, and commitment to independent artists.',
};

const clientTypes = [
  {
    title: 'Independent Recording Artists',
    description: 'Solo singers, vocalists, and rappers who need cohesive creative direction, release-ready audio mastering, cover artwork, and audience growth strategies.',
  },
  {
    title: 'Music Producers & Beatmakers',
    description: 'Composers and beatmakers who need high-converting beat stores, mix polish, audio restoration, and licensing administration.',
  },
  {
    title: 'Independent Record Labels',
    description: 'Growing music labels seeking multi-roster websites, scalable distribution coordination, release marketing rollouts, and sync licensing packages.',
  },
  {
    title: 'Music Managers & A&Rs',
    description: 'Artist managers requiring dependable execution partners who can handle video production, digital footprint audits, and press kits on tight deadlines.',
  },
  {
    title: 'Creative Brands & Studios',
    description: 'Commercial studios, fashion brands, and entertainment agencies looking for bespoke sound design, video advertising, and custom web engineering.',
  },
];

const coreExpertise = [
  {
    icon: Headphones,
    title: 'Sonic Engineering',
    description: 'Precision multi-track mixing, True-Peak mastering, vocal tuning with Melodyne, and spectral noise restoration calibrated for international streaming translation.',
  },
  {
    icon: Palette,
    title: 'Visual Direction',
    description: 'Original 3000x3000px cover artwork, AI-assisted music videos, kinetic lyric animations, 3D character CGI, and comprehensive artist brand books.',
  },
  {
    icon: Laptop,
    title: 'Digital & Web Engineering',
    description: 'High-performance, edge-rendered Next.js websites, continuous audio player portals, direct-to-fan e-commerce stores, and third-party API integrations.',
  },
  {
    icon: Globe,
    title: 'Distribution & Growth',
    description: 'Metadata compliance across 150+ DSPs, legitimate playlist curator pitching, TikTok audio sound campaigns, and Google Knowledge Panel entity building.',
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="page-hero about-hero">
        <div className="eyebrow">ABOUT MAINAHTUNESTEAM</div>
        <h1>
          Independent does not mean <em>doing it alone.</em>
        </h1>
        <p>
          MainahtunesTeam is an international creative production, branding, and digital technology agency.
          We bridge the gap between raw musical talent and world-class commercial execution.
        </p>

        <div className="hero-proof" style={{ marginTop: '36px' }}>
          <span><b>53</b> SERVICES</span>
          <span><b>06</b> DISCIPLINES</span>
          <span><b>100%</b> INDEPENDENT ARTIST OWNERSHIP</span>
        </div>
      </section>

      {/* =========================================================================
          MISSION & VISION SPLIT
         ========================================================================= */}
      <section className="split-section about-split">
        <div>
          <div className="eyebrow">OUR MISSION &amp; VISION</div>
          <h2>
            Empowering independent creators with <em>major-label caliber capabilities.</em>
          </h2>
        </div>
        <div>
          <p>
            For decades, major record labels held a monopoly on world-class audio engineers, elite graphic designers, film directors, and web architects. Independent artists were forced to compromise, managing dozens of disparate freelancers or using generic, template-driven tools.
          </p>
          <p>
            <strong>MainahtunesTeam was founded to shatter that divide.</strong> Our mission is to provide independent artists, recording studios, and indie record labels with a dedicated, standing creative agency that delivers international-standard music production, striking visuals, and bespoke web platforms — all under one unified roof.
          </p>
          <p>
            Our vision is a music industry where artists maintain 100% ownership of their master recordings and publishing royalties, while competing visually and sonically at the highest international level.
          </p>
        </div>
      </section>

      {/* =========================================================================
          CREATIVE EXPERTISE PILLARS
         ========================================================================= */}
      <section className="section expertise-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">OUR CAPABILITIES</div>
            <h2>Four pillars of creative excellence</h2>
          </div>
          <p>
            We eliminate fragmentation by aligning every creative discipline around your core musical sound.
          </p>
        </div>

        <div className="expertise-grid">
          {coreExpertise.map((item) => {
            const Icon = item.icon;
            return (
              <article className="expertise-card" key={item.title}>
                <div className="exp-icon-wrap">
                  <Icon size={24} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          CLIENTS WE SUPPORT
         ========================================================================= */}
      <section className="section clients-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">WHO WE WORK WITH</div>
            <h2>Clients we support worldwide</h2>
          </div>
          <p>
            From emerging grassroots talent to established touring acts and enterprise entertainment companies.
          </p>
        </div>

        <div className="clients-grid">
          {clientTypes.map((client, idx) => (
            <article className="client-card" key={client.title}>
              <span className="client-idx">0{idx + 1}</span>
              <h3>{client.title}</h3>
              <p>{client.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          OUR WORKING PROCESS
         ========================================================================= */}
      <section className="section values-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">OUR METHODOLOGY</div>
            <h2>Clear thinking. Considered execution.</h2>
          </div>
          <p>
            A proven 4-stage collaborative workflow designed to ensure complete creative alignment.
          </p>
        </div>

        <div className="steps-grid">
          <article>
            <small>PHASE 01</small>
            <h3>Listen &amp; Understand</h3>
            <p>
              We conduct thorough creative discovery, listen to your unreleased audio, review visual references, and understand your release objectives and audience targets.
            </p>
          </article>
          <article>
            <small>PHASE 02</small>
            <h3>Plan &amp; Scope</h3>
            <p>
              We define deliverables, establish transparent milestones, agree on chronological deadlines, and formulate a custom quotation tailored to your scope.
            </p>
          </article>
          <article>
            <small>PHASE 03</small>
            <h3>Create &amp; Refine</h3>
            <p>
              Our specialists develop the work — engineering stems, animating visuals, designing artwork, or coding your website — with integrated feedback rounds.
            </p>
          </article>
          <article>
            <small>PHASE 04</small>
            <h3>Deliver &amp; Support</h3>
            <p>
              You receive master files in industry-standard specifications (WAV, 4K video, 3000px artwork, Vercel deployment) plus practical guidance for next steps.
            </p>
          </article>
        </div>
      </section>

      {/* =========================================================================
          COMMITMENT TO PROFESSIONAL DELIVERY
         ========================================================================= */}
      <section className="section commitment-section">
        <div className="commitment-card">
          <div className="commitment-content">
            <span className="eyebrow">OUR COMMITMENT</span>
            <h2>Integrity, transparency, and artist trust.</h2>
            <p>
              At MainahtunesTeam, we adhere strictly to international agency ethics. We do not use fake stream farms or make false promises regarding algorithmic playlisting or third-party verifications. We provide genuine, high-caliber creative and technical execution that builds sustainable, compounding artist value.
            </p>
            <div className="commitment-badges">
              <span><CheckCircle2 size={15} /> 100% Rights &amp; Master Ownership Retained</span>
              <span><CheckCircle2 size={15} /> Transparent Custom Quotations</span>
              <span><CheckCircle2 size={15} /> Global DSP &amp; Web Standards Compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BAND
         ========================================================================= */}
      <section className="cta-band">
        <div>
          <div className="eyebrow">LET’S COLLABORATE</div>
          <h2>Have a vision? Let’s build around it.</h2>
          <p>
            Tell us about your next record, visual project, or website. We will formulate a tailored quotation and strategic execution plan.
          </p>
        </div>
        <Link className="button button-orange" href="/contact">
          Start a Conversation ↗
        </Link>
      </section>
    </main>
  );
}
