import Link from 'next/link';
import { ArrowLeft, Compass, Music, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="not-found-main">
      <section className="page-hero not-found-hero">
        <div className="eyebrow">404 ERROR — PAGE NOT FOUND</div>
        <h1>
          Lost in the <em>soundscape.</em>
        </h1>
        <p>
          The page or track you are looking for may have been moved, renamed, or is currently being produced in the studio.
        </p>

        <div className="actions" style={{ marginTop: '32px' }}>
          <Link href="/" className="button button-orange">
            <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Return to Homepage
          </Link>
          <Link href="/services" className="button button-outline">
            <Compass size={16} style={{ marginRight: '8px' }} /> Explore All 53 Services
          </Link>
          <Link href="/visuals" className="button button-dark">
            <Sparkles size={16} style={{ marginRight: '8px' }} /> Review My Works
          </Link>
        </div>

        <div className="not-found-watermark">404</div>
      </section>
    </main>
  );
}
