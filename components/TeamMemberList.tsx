'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import type { TeamMember } from '@/data/team';
import { siteConfig } from '@/data/siteConfig';

interface Props {
  initialMembers: TeamMember[];
}

export default function TeamMemberList({ initialMembers }: Props) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);

  useEffect(() => {
    // 1. Immediately read localStorage to show any client-side added members
    let localMembers: TeamMember[] = [];
    try {
      const local = localStorage.getItem('mainahtunes_custom_team');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localMembers = parsed;
          setMembers((prev) => {
            const map = new Map<string, TeamMember>();
            localMembers.forEach((m) => map.set(m.id, m));
            prev.forEach((m) => {
              if (!map.has(m.id)) map.set(m.id, m);
            });
            return Array.from(map.values());
          });
        }
      }
    } catch {}

    // 2. Fetch live team roster from API (merges baseline with cloud-stored members)
    fetch('/api/team')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch team members');
        return res.json();
      })
      .then((data) => {
        const serverList: TeamMember[] =
          data && data.teamMembers && Array.isArray(data.teamMembers) && data.teamMembers.length > 0
            ? data.teamMembers
            : initialMembers;

        setMembers(() => {
          const map = new Map<string, TeamMember>();
          localMembers.forEach((m) => map.set(m.id, m));
          serverList.forEach((m) => {
            if (!map.has(m.id)) map.set(m.id, m);
          });
          return Array.from(map.values());
        });
      })
      .catch((err) => {
        console.warn('Using baseline team roster:', err);
      });
  }, [initialMembers]);

  if (members.length === 0) {
    return (
      <section className="section team-catalog-section" aria-label="Team members">
        <div
          className="team-empty-state"
          style={{
            padding: '60px 24px',
            textAlign: 'center',
            border: '1px dashed var(--line)',
            borderRadius: '12px',
            background: 'var(--card-bg)',
            margin: '0 auto',
            maxWidth: '800px',
          }}
        >
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
            Our leadership and creative team profiles are currently being updated.
          </p>
          <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="button button-orange">
              Start a Project Enquiry ↗
            </Link>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <MessageCircle size={14} color="#25D366" /> Chat on WhatsApp ↗
            </a>
          </div>
        </div>
      </section>
    );
  }

  // 1. Separate Founder
  const founder = members.find((m) =>
    m.role.toLowerCase().includes('founder') ||
    m.name.toLowerCase().includes('amelia')
  );

  // 2. Remaining Team Members in the exact order they were uploaded
  const teamFollowers = founder
    ? members.filter((m) => m.id !== founder.id)
    : members;

  return (
    <>
      {/* =========================================================================
          SECTION 1: AGENCY FOUNDER (ON TOP)
         ========================================================================= */}
      {founder && (
        <section className="section team-founder-section" aria-label="Agency Founder">
          <div className="section-heading">
            <div>
              <div className="eyebrow">FOUNDER &amp; CREATIVE DIRECTION</div>
              <h2>
                Agency <em>Founder.</em>
              </h2>
            </div>
            <p>
              Guiding the executive vision, creative direction, and client excellence across Mainahtunes Team.
            </p>
          </div>

          <div className="team-detailed-grid">
            <article className="team-detailed-card founder-featured-card" key={founder.id}>
              <div className="team-photo-column">
                <div className="team-photo-frame">
                  <Image
                    src={founder.image || '/team/amelia-clarke.jpeg'}
                    alt={`${founder.name}, ${founder.role}`}
                    width={800}
                    height={1000}
                    priority
                    unoptimized
                  />
                  <div className="photo-tag-overlay">
                    <span>{founder.department.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="team-info-column">
                <span className="team-role-pill">{founder.role}</span>
                <h2>{founder.name}</h2>
                <p className="team-bio-lead">{founder.bio}</p>

                {founder.credentials && founder.credentials.length > 0 && (
                  <div className="team-credentials-box">
                    <small>EXECUTIVE RESPONSIBILITIES &amp; EXPERTISE</small>
                    <div className="credentials-grid">
                      {founder.credentials.map((cred) => (
                        <div key={cred} className="cred-item">
                          <CheckCircle2 size={15} />
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="team-contact-action" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link
                    href={`/contact?service=General%20Enquiry&project=${encodeURIComponent(
                      `Attention: ${founder.name} (${founder.role})`
                    )}`}
                    className="button button-orange"
                  >
                    Enquire with {founder.name.split(' ')[0]} <span>↗</span>
                  </Link>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-outline"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <MessageCircle size={14} color="#25D366" /> Chat on WhatsApp ↗
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 2: REMAINING TEAM MEMBERS (BELOW FOUNDER)
         ========================================================================= */}
      {teamFollowers.length > 0 && (
        <section className="section team-members-section" aria-label="Team Members">
          <div className="section-heading">
            <div>
              <div className="eyebrow">OPERATIONS, PRODUCTION &amp; CLIENT SUCCESS</div>
              <h2>
                Our <em>Team Members.</em>
              </h2>
            </div>
            <p>
              Working alongside the founder to lead cinematic video production, audio engineering, and dedicated daily client support.
            </p>
          </div>

          <div className="team-detailed-grid">
            {teamFollowers.map((member) => (
              <article className="team-detailed-card" key={member.id}>
                <div className="team-photo-column">
                  <div className="team-photo-frame">
                    <Image
                      src={member.image || '/team/oliver-bennett.jpeg'}
                      alt={`${member.name}, ${member.role}`}
                      width={800}
                      height={1000}
                      unoptimized
                    />
                    <div className="photo-tag-overlay">
                      <span>{member.department.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="team-info-column">
                  <span className="team-role-pill">{member.role}</span>
                  <h2>{member.name}</h2>
                  <p className="team-bio-lead">{member.bio}</p>

                  {member.credentials && member.credentials.length > 0 && (
                    <div className="team-credentials-box">
                      <small>CORE RESPONSIBILITIES &amp; EXPERTISE</small>
                      <div className="credentials-grid">
                        {member.credentials.map((cred) => (
                          <div key={cred} className="cred-item">
                            <CheckCircle2 size={15} />
                            <span>{cred}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="team-contact-action" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link
                      href={`/contact?service=General%20Enquiry&project=${encodeURIComponent(
                        `Attention: ${member.name} (${member.role})`
                      )}`}
                      className="button button-orange"
                    >
                      Enquire with {member.name.split(' ')[0]} <span>↗</span>
                    </Link>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-outline"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <MessageCircle size={14} color="#25D366" /> Chat on WhatsApp ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
