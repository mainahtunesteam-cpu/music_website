import Link from 'next/link';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <div className="footer-brand">
            MAINAHTUNESTEAM
            <span>MUSIC · BRANDING · DIGITAL SOLUTIONS</span>
          </div>
          <p className="footer-desc">
            An international creative and digital solutions agency dedicated to independent musicians, recording artists, producers, record labels, and visionary creative businesses.
          </p>
          <div className="footer-badge">
            <span className="pulse-dot" /> 53 Connected Services · Global Client Base
          </div>
        </div>

        <div className="footer-links-col">
          <h4>EXPLORE AGENCY</h4>
          <Link href="/services">Complete 53 Services Directory</Link>
          <Link href="/visuals">Review My Works (Portfolio)</Link>
          <Link href="/artist-growth">Artist Growth Roadmap</Link>
          <Link href="/about">About MainahtunesTeam</Link>
          <Link href="/team">Our Team &amp; Leadership</Link>
          <Link href="/contact">Request a Custom Quotation</Link>
        </div>

        <div className="footer-links-col">
          <h4>LEGAL &amp; COMPLIANCE</h4>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <div style={{ marginTop: '20px' }}>
            <h4>DIRECT EMAIL</h4>
            <a
              href={`mailto:${siteConfig.email}`}
              className="footer-email-link"
            >
              <Mail size={13} style={{ display: 'inline', marginRight: '6px' }} />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>DIRECT SUPPORT &amp; CHAT</h4>
          <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 14px 0', lineHeight: 1.5 }}>
            Direct 1-on-1 consultations with our senior creative director and engineers.
          </p>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-cta"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
            <ArrowUpRight size={13} />
          </a>
          <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '10px' }}>
            Available 24/7 for project enquiries &amp; artist consultations.
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MainahtunesTeam. All rights reserved.</span>
        <span>Independent Vision. International Execution.</span>
      </div>
    </footer>
  );
}
