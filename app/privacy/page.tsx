import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | MainahtunesTeam',
  description: 'How MainahtunesTeam protects artist privacy, project data, and creative assets.',
};

export default function PrivacyPolicy() {
  return (
    <main>
      <section className="page-hero">
        <div className="eyebrow">LEGAL &amp; COMPLIANCE</div>
        <h1>
          Privacy <em>Policy.</em>
        </h1>
        <p>
          MainahtunesTeam is dedicated to protecting the privacy, creative confidentiality, and rights
          of the artists, labels, and creative partners we work with worldwide.
        </p>
      </section>

      <section className="section legal-content-section">
        <div className="legal-container">
          <div className="legal-block">
            <div className="legal-icon">
              <ShieldCheck size={28} />
            </div>
            <h2>1. Information We Collect</h2>
            <p>
              When you submit a project enquiry, engage our agency services, or communicate with us,
              we collect information necessary to scope, deliver, and support your creative work. This includes:
            </p>
            <ul>
              <li><strong>Contact Information:</strong> Your name, artist/stage name, business entity, email address, and country of residence.</li>
              <li><strong>Project Materials:</strong> Unreleased audio demos, stems, artwork concepts, lyric sheets, reference links, and creative briefs.</li>
              <li><strong>Technical Metadata:</strong> ISRC codes, ISWC numbers, songwriter credits, and distributor details required for music distribution or sync licensing.</li>
            </ul>
          </div>

          <div className="legal-block">
            <div className="legal-icon">
              <Lock size={28} />
            </div>
            <h2>2. Confidentiality &amp; Intellectual Property Protection</h2>
            <p>
              <strong>Your music and creative assets remain 100% your property.</strong> MainahtunesTeam treats all unreleased audio, unreleased artwork, and campaign strategies with strict confidentiality. We do not sell, rent, or distribute your intellectual property to unauthorized third parties under any circumstances.
            </p>
          </div>

          <div className="legal-block">
            <div className="legal-icon">
              <Eye size={28} />
            </div>
            <h2>3. How Your Information Is Used</h2>
            <p>Collected details are strictly used to:</p>
            <ul>
              <li>Prepare tailored quotations and scope production timelines.</li>
              <li>Deliver agreed creative, audio engineering, video production, and web development services.</li>
              <li>Coordinate distribution, playlist submissions, and sync licensing opportunities when authorized by you.</li>
              <li>Maintain ongoing project support and deliver final production files.</li>
            </ul>
          </div>

          <div className="legal-block">
            <div className="legal-icon">
              <FileText size={28} />
            </div>
            <h2>4. Third-Party Platforms &amp; External Services</h2>
            <p>
              Certain services involve interacting with third-party platforms (e.g. Spotify, Apple Music, YouTube, Google, Vercel, Stripe). Your relationship with those third-party services is governed by their respective privacy terms and community guidelines.
            </p>
          </div>

          <div className="legal-block">
            <h2>5. Contacting Our Data &amp; Privacy Officer</h2>
            <p>
              If you have any questions regarding how your data is handled or wish to request the deletion of your enquiry information, please contact our team directly at:
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
