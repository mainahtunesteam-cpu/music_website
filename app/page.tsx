import Link from 'next/link';
import Image from 'next/image';
import HomeHeroStage from '@/components/HomeHeroStage';
import HomeTeamPreview from '@/components/HomeTeamPreview';
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Headphones,
  Sliders,
  Palette,
  Laptop,
  TrendingUp,
  Globe,
  Quote,
  Star,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { teamMembers } from '@/data/team';
import { categories } from '@/data/services';

const visualTiles = [
  {
    id: '01',
    title: 'Sound in motion',
    type: 'MUSIC VISUALIZER',
    cls: 'visualizer',
    note: 'Living visual identities and Spotify Canvas loops for your next release.',
    href: '/visuals#ai-music-video',
  },
  {
    id: '02',
    title: 'Build a world',
    type: '3D & AI MOTION',
    cls: 'motion-world',
    note: 'Immersive generative scenes that command attention on screen.',
    href: '/visuals#ai-music-video',
  },
  {
    id: '03',
    title: 'Make it memorable',
    type: 'ARTIST BRANDING',
    cls: 'cover-world',
    note: 'Genre-defining cover artwork and visual direction with an indelible point of view.',
    href: '/visuals#cover-artwork',
  },
];

const whyChooseUsPillars = [
  {
    number: '01',
    title: 'Independent Artist First',
    description: 'You retain 100% of your master rights, royalties, and creative control. We act as your standing creative director and digital operations team without restrictive label contracts.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'All 53 Services Under One Roof',
    description: 'No more coordinating 6 different freelancers who never speak to each other. From stems mixing to 3D artwork, promotion, and custom web development, every asset moves as one unified campaign.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Verified Results, Zero Shady Bots',
    description: 'We do not sell fake streams, bot playlist farms, or false guarantees. Every campaign is executed through legitimate curator networks, radio submissions, and high-converting creative.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'International Agency Standards',
    description: 'We engineer digital platforms using Next.js 14, master audio to strict True-Peak LUFS broadcast standards, and deliver 3000x3000px artwork ready for Apple Music editorial features.',
    icon: Globe,
  },
];

export default function Home() {
  return (
    <main>
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="hero hero-new">
        <div className="hero-topline">
          <span className="eyebrow">MUSIC · BRANDING · DIGITAL SOLUTIONS</span>
          <span className="hero-index">INDEPENDENT ARTISTS &amp; LABELS / 53 SERVICES</span>
        </div>

        <div className="hero-grid hero-grid-new">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="pulse-dot" /> YOUR SOUND. YOUR STORY. YOUR NEXT CHAPTER.
            </div>
            <h1>
              Make your music <em>impossible to ignore.</em>
            </h1>
            <p className="lead">
              We bring sound, visuals, and digital identity together to help independent artists,
              producers, and record labels build a presence that moves far beyond the music.
            </p>

            <div className="actions hero-actions">
              <Link className="button button-orange" href="/visuals">
                Explore Our Work <span>↗</span>
              </Link>
              <Link className="button button-outline" href="/services">
                View Services <span>↗</span>
              </Link>
              <Link className="button button-dark" href="/contact">
                Start Your Project <span>↗</span>
              </Link>
            </div>

            <div className="hero-proof">
              <span><b>53</b> CONNECTED SERVICES</span>
              <span><b>06</b> DISCIPLINES</span>
              <span><b>100%</b> INDEPENDENT OWNERSHIP</span>
            </div>
          </div>

          {/* Interactive Hero Audio & Stage */}
          <HomeHeroStage />
        </div>

        <div className="hero-bottom hero-bottom-new">
          <span>01 / MUSIC &amp; PROMOTION</span>
          <span>02 / AUDIO ENGINEERING</span>
          <span>03 / VISUAL PRODUCTION</span>
          <span>04 / ARTIST BRANDING</span>
          <span>05 / DIGITAL PRESENCE</span>
          <span>06 / WEB ENGINEERING</span>
        </div>
      </section>

      {/* =========================================================================
          MARQUEE BANNER
         ========================================================================= */}
      <section className="marquee-band" aria-label="Our creative capabilities">
        <div className="marquee-track">
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>
              MUSIC THAT MOVES <b>✳</b> VISUALS THAT SPEAK <b>✳</b> IDENTITIES THAT LAST <b>✳</b> DIGITAL THAT CONNECTS <b>✳</b> MUSIC THAT MOVES <b>✳</b> VISUALS THAT SPEAK <b>✳</b>
            </span>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: WHY ARTISTS CHOOSE MAINAHTUNESTEAM
         ========================================================================= */}
      <section className="section why-choose-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">THE MAINAHTUNESTEAM ADVANTAGE</div>
            <h2>
              Why ambitious artists <em>choose our agency.</em>
            </h2>
          </div>
          <p>
            We believe independent creators deserve the same meticulous creative direction and technical rigor as major-label superstars.
          </p>
        </div>

        <div className="why-grid">
          {whyChooseUsPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article className="why-card" key={pillar.number}>
                <div className="why-icon-wrap">
                  <Icon size={24} />
                </div>
                <span className="why-num">{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ANIMATED SHOWCASE (VISUAL TILES)
         ========================================================================= */}
      <section className="section visual-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">A FEEL FOR THE POSSIBILITIES</div>
            <h2>
              Give your sound <em>a visual world.</em>
            </h2>
          </div>
          <p>
            From bold motion pieces to artist identities, we turn creative direction into visuals your audience can feel.
          </p>
        </div>

        <div className="visual-showcase">
          {visualTiles.map((tile) => (
            <article className={`visual-tile ${tile.cls}`} key={tile.id}>
              <div className="tile-art">
                <span className="tile-number">{tile.id} / 03</span>
                {tile.cls === 'visualizer' && (
                  <>
                    <div className="sun-disc" />
                    <div className="sound-bars">
                      {Array.from({ length: 25 }, (_, i) => (
                        <i key={i} style={{ '--i': i } as React.CSSProperties} />
                      ))}
                    </div>
                    <div className="tile-orbit" />
                  </>
                )}
                {tile.cls === 'motion-world' && (
                  <>
                    <div className="planet planet-a" />
                    <div className="planet planet-b" />
                    <div className="landscape">
                      <i /><i /><i />
                    </div>
                    <div className="motion-beam" />
                  </>
                )}
                {tile.cls === 'cover-world' && (
                  <>
                    <div className="cover-shape shape-a" />
                    <div className="cover-shape shape-b" />
                    <div className="cover-type">
                      OWN<br />YOUR<br /><em>ERA.</em>
                    </div>
                    <div className="cover-stamp">MT / ARTIST SERIES</div>
                  </>
                )}
              </div>
              <div className="tile-caption">
                <div>
                  <small>{tile.type}</small>
                  <h3>{tile.title}</h3>
                  <p>{tile.note}</p>
                </div>
                <Link href={tile.href} className="tile-arrow" aria-label={`Explore ${tile.title}`}>
                  ↗
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="visual-note">
          <span className="note-mark">✳</span>
          <p>
            Every visual begins with your sound, your story, and the feeling you want people to remember.
          </p>
          <Link href="/visuals" className="text-link">
            Explore the complete 39-item portfolio in Review My Works ↗
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 6 CONNECTED DISCIPLINES (53 SERVICES OVERVIEW)
         ========================================================================= */}
      <section className="section intro-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">WHAT WE BRING TOGETHER</div>
            <h2>
              One creative partner.<br />
              <em>53 connected services.</em>
            </h2>
          </div>
          <p>
            Explore our 6 core creative disciplines designed to support every phase of your musical journey.
          </p>
        </div>

        <div className="pillar-grid">
          {categories.map((cat) => (
            <article className="pillar service-pillar" key={cat.number}>
              <small>DISCIPLINE {cat.number} / {cat.code}</small>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
              <Link href={`/services#discipline-${cat.number}`}>
                Explore services in this discipline ↗
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CLIENT TESTIMONIALS & VERIFIED RESULTS
         ========================================================================= */}
      <section className="section testimonials-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">CLIENT FEEDBACK &amp; TRUST</div>
            <h2>
              Verified results from <em>our collaborative work.</em>
            </h2>
          </div>
          <p>
            Real feedback from recording artists, producers, and label founders who have partnered with MainahtunesTeam.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <article className="testimonial-card" key={t.id}>
              <div className="test-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} fill="#f47713" color="#f47713" />
                ))}
              </div>
              <p className="test-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="test-outcome">
                <CheckCircle2 size={14} className="outcome-icon" />
                <span>{t.verifiedOutcome}</span>
              </div>
              <div className="test-author">
                <div>
                  <strong>{t.clientName}</strong>
                  <span>{t.role} · {t.location}</span>
                </div>
                <span className="test-service-tag">{t.serviceEngaged}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: STUDIO STRIP
         ========================================================================= */}
      <section className="studio-strip">
        <div className="studio-visual">
          <div className="studio-screen">
            <div className="screen-top">
              <i /><i /><i />
              <span>MAINAHTUNES / CREATIVE DESK</span>
            </div>
            <div className="screen-content">
              <div className="screen-sidebar" />
              <div className="screen-main">
                <div className="screen-wave">
                  {Array.from({ length: 42 }, (_, i) => (
                    <i key={i} style={{ '--i': i } as React.CSSProperties} />
                  ))}
                </div>
                <div className="screen-lines">
                  <i /><i /><i />
                </div>
              </div>
            </div>
          </div>
          <div className="studio-floating">
            SOUND<br /><b>IN MOTION</b>
          </div>
        </div>

        <div className="studio-copy">
          <div className="eyebrow">MORE THAN A SERVICE PROVIDER</div>
          <h2>
            Creative energy.<br />
            <em>International execution.</em>
          </h2>
          <p>
            We eliminate the gap between raw talent and major-label polish. From your master audio to single artwork and responsive websites, we make your rollout cohesive, stress-free, and calibrated for listener discovery.
          </p>
          <div className="actions">
            <Link href="/about" className="button button-outline">
              Get to know our agency ↗
            </Link>
            <Link href="/artist-growth" className="button button-orange">
              Explore Artist Growth Blueprint ↗
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: OUR TEAM PREVIEW (DYNAMIC)
         ========================================================================= */}
      <HomeTeamPreview initialMembers={teamMembers} />

      {/* =========================================================================
          FINAL CINEMATIC CTA BAND
         ========================================================================= */}
      <section className="cta-band cta-band-new">
        <div>
          <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
          <h2>
            Have a sound. Have a vision. <em>Let’s build it together.</em>
          </h2>
          <p>
            Tell us about your upcoming single, EP, or brand project. We will craft a bespoke quotation and strategic execution plan tailored to your release.
          </p>
        </div>
        <Link className="button button-orange" href="/contact">
          Start Your Project ↗
        </Link>
        <div className="cta-orbit" />
      </section>
    </main>
  );
}
