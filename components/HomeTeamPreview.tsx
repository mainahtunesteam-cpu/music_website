'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { TeamMember } from '@/data/team';

interface Props {
  initialMembers?: TeamMember[];
}

export default function HomeTeamPreview({ initialMembers = [] }: Props) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  useEffect(() => {
    // 1. Immediately sync with localStorage for manually added team members
    let localMembers: TeamMember[] = [];
    try {
      const stored = localStorage.getItem('mainahtunes_custom_team');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localMembers = parsed;
          setMembers(parsed);
        }
      }
    } catch {}

    // 2. Fetch live team from API
    fetch('/api/team')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch team');
        return res.json();
      })
      .then((data) => {
        const serverList: TeamMember[] =
          data && data.teamMembers && Array.isArray(data.teamMembers) && data.teamMembers.length > 0
            ? data.teamMembers
            : [];

        setMembers(() => {
          const map = new Map<string, TeamMember>();
          localMembers.forEach((m) => map.set(m.id, m));
          serverList.forEach((m) => {
            if (!map.has(m.id)) map.set(m.id, m);
          });
          return Array.from(map.values());
        });
      })
      .catch((err) => console.warn('Home team preview err:', err));
  }, []);

  if (members.length === 0) {
    return null;
  }

  // 1. Separate Founder
  const founder = members.find((m) =>
    m.role.toLowerCase().includes('founder') ||
    m.name.toLowerCase().includes('amelia')
  );

  // 2. Remaining team members in the order uploaded
  const teamFollowers = founder
    ? members.filter((m) => m.id !== founder.id)
    : members;

  return (
    <section className="section team-preview-section">
      {/* =========================================================================
          SECTION 1: FOUNDER PREVIEW (ON TOP)
         ========================================================================= */}
      {founder && (
        <div style={{ marginBottom: teamFollowers.length > 0 ? '56px' : '0' }}>
          <div className="section-heading">
            <div>
              <div className="eyebrow">THE PEOPLE BEHIND THE VISION</div>
              <h2>
                Meet our <em>Founder.</em>
              </h2>
            </div>
            <p>
              Dedicated to the creative direction, music production standards, and executive vision of your releases.
            </p>
          </div>

          <div className="team-preview-grid">
            <article className="team-preview-card" key={founder.id}>
              <div className="team-preview-photo">
                <Image
                  src={founder.image || '/team/amelia-clarke.jpeg'}
                  alt={`${founder.name}, ${founder.role}`}
                  width={600}
                  height={750}
                  unoptimized
                />
              </div>
              <div className="team-preview-info">
                <span className="team-preview-role">{founder.role.toUpperCase()}</span>
                <h3>{founder.name}</h3>
                <p>{founder.bio}</p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Link href="/team" className="text-link">
                    View full profile &amp; credentials ↗
                  </Link>
                  <Link href="/contact" className="button button-orange button-sm">
                    Consult with {founder.name.split(' ')[0]} ↗
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: REMAINING TEAM MEMBERS (BELOW FOUNDER)
         ========================================================================= */}
      {teamFollowers.length > 0 && (
        <div>
          <div className="section-heading">
            <div>
              <div className="eyebrow">PRODUCTION &amp; OPERATIONS TEAM</div>
              <h2>
                Meet our <em>Team Members.</em>
              </h2>
            </div>
            <p>
              Our specialist directors and managers guiding video production, client communications, and daily support.
            </p>
          </div>

          <div className="team-preview-grid">
            {teamFollowers.map((member) => (
              <article className="team-preview-card" key={member.id}>
                <div className="team-preview-photo">
                  <Image
                    src={member.image || '/team/oliver-bennett.jpeg'}
                    alt={`${member.name}, ${member.role}`}
                    width={600}
                    height={750}
                    unoptimized
                  />
                </div>
                <div className="team-preview-info">
                  <span className="team-preview-role">{member.role.toUpperCase()}</span>
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                  <Link href="/team" className="text-link">
                    View full profile &amp; credentials ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
