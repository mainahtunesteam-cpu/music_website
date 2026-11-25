import Link from 'next/link';
import type { Metadata } from 'next';
import { FileCheck, Shield, Award, HelpCircle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | MainahtunesTeam',
  description: 'Terms of engagement, client agreements, and delivery standards for MainahtunesTeam agency services.',
};

export default function TermsOfService() {
  return (
    <main>
      <section className="page-hero">
        <div className="eyebrow">LEGAL &amp; COMPLIANCE</div>
        <h1>
          Terms of <em>Service.</em>
        </h1>
        <p>
          These terms outline our collaborative working standards, client expectations, deliverables,
          and transparent service agreements.
        </p>
      </section>

      <section className="section legal-content-section">
        <div className="legal-container">
          <div className="legal-block">
            <div className="legal-icon">
              <FileCheck size={28} />
            </div>
            <h2>1. Bespoke Project Quotations</h2>
            <p>
              MainahtunesTeam operates on custom project quotations tailored to each client&apos;s creative brief, technical scope, and release timeline. We do not provide fixed, one-size-fits-all packages. A formal quote is provided following review of your enquiry.
            </p>
          </div>

          <div className="legal-block">
            <div className="legal-icon">
              <Shield size={28} />
            </div>
            <h2>2. Client Responsibilities &amp; Materials</h2>
            <p>
              Clients must hold the requisite rights or permissions for all audio recordings, lyrics, samples, logos, and imagery submitted for mixing, mastering, video production, artwork design, or distribution.
            </p>
          </div>

          <div className="legal-block">
            <div className="legal-icon">
              <Award size={28} />
            </div>
            <h2>3. Revisions &amp; Quality Delivery</h2>
            <p>
              Every service includes an agreed round of revisions to ensure the final output reflects your creative vision. Additional revisions beyond agreed project milestones may be quoted separately.
            </p>
          </div>

          <div className="legal-block">
            <div className="legal-icon">
              <HelpCircle size={28} />
            </div>
            <h2>4. Third-Party Platform Disclaimers</h2>
            <p>
              In accordance with international industry standards, promotion, playlist submissions, radio pitching, Google Knowledge Panels, and YouTube monetization readiness are performed with professional rigor. However, final placement or verification decisions rest solely with independent playlist curators, station directors, Google algorithms, and streaming platforms. MainahtunesTeam does not use artificial stream inflation, bot networks, or fake guarantees.
            </p>
          </div>

          <div className="legal-block">
            <h2>5. Inquiries &amp; Project Support</h2>
            <p>
              For project scope updates or agreement clarifications, reach us at:
            </p>
            <p>
              <a href="mailto:contact.mainahtunesteam@gmail.com" className="text-link">
                contact.mainahtunesteam@gmail.com ↗
              </a>
            </p>
          </div>

          <div className="legal-back-nav">
            <Link href="/" className="button button-outline">
              <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
