import type { Metadata } from 'next';
import { teamMembers, upcomingRoles } from '@/data/team';
import TeamMemberList from '@/components/TeamMemberList';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Team & Leadership | MainahtunesTeam',
  description:
    'Meet the leadership, creative direction, video production, and client success professionals driving MainahtunesTeam agency operations.',
};

export default function TeamPage() {
  return (
    <main>
      {/* =========================================================================
          HERO SECTION
         ========================================================================= */}
      <section className="page-hero team-hero">
        <div className="eyebrow">THE PEOPLE BEHIND THE VISION</div>
        <h1>
          Meet <em>Our Team.</em>
        </h1>
        <p>
          MainahtunesTeam combines seasoned creative direction, international music production, cinematic video direction,
          client operations, and financial management to deliver dependable, high-impact creative solutions.
        </p>
      </section>

      {/* =========================================================================
          SEPARATE SECTIONS: FOUNDER (ON TOP) & TEAM MEMBERS (BELOW)
         ========================================================================= */}
      <TeamMemberList initialMembers={teamMembers} />

      {/* =========================================================================
          CREATIVE ROSTER & NETWORK
         ========================================================================= */}
      <section className="section upcoming-roles-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">CREATIVE NETWORK &amp; DEPARTMENTS</div>
            <h2>Specialized Studio Departments</h2>
          </div>
          <p>
            Our international network of specialist audio engineers, 3D animators, and software architects collaborate seamlessly on client projects.
          </p>
        </div>

        <div className="departments-grid">
          {upcomingRoles.map((dept) => (
            <article className="department-card" key={dept.role}>
              <span className="dept-tag">{dept.department.toUpperCase()}</span>
              <h3>{dept.role}</h3>
              <p>{dept.description}</p>
              <div className="dept-status">
                <span className="pulse-dot" /> Active Specialist Roster
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BAND
         ========================================================================= */}
      <section className="cta-band">
        <div>
          <div className="eyebrow">WORK WITH OUR AGENCY</div>
          <h2>Ready to collaborate with our team?</h2>
          <p>
            Tell us about your upcoming musical project, branding needs, or web platform.
            We will review your requirements and coordinate the right creative specialists.
          </p>
        </div>
        <Link className="button button-orange" href="/contact">
          Start Your Project ↗
        </Link>
      </section>
    </main>
  );
}
