'use client';

import Link from 'next/link';
import { TrendingUp, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { CampaignCaseStudy } from '@/data/portfolio';

interface Props {
  caseStudies: CampaignCaseStudy[];
}

export default function PromotionCaseStudyCard({ caseStudies }: Props) {
  return (
    <div className="case-studies-container">
      {caseStudies.map((study) => (
        <article className="case-study-entry" key={study.id}>
          <div className="case-entry-top">
            <div>
              <span className="case-genre-tag">{study.genre}</span>
              <h3>{study.title}</h3>
              <p className="case-artist-label">Campaign Focus: <strong>{study.artistName}</strong></p>
            </div>
            <div className="case-meta-badges">
              <span className="duration-badge">Duration: {study.duration}</span>
              <div className="platform-badges">
                {study.platforms.map((p) => (
                  <span key={p} className="p-badge">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="case-strategy-grid">
            <div className="strategy-box">
              <small>CAMPAIGN OBJECTIVE</small>
              <p>{study.objective}</p>
            </div>
            <div className="strategy-box">
              <small>EXECUTION STRATEGY</small>
              <p>{study.strategy}</p>
            </div>
          </div>

          {/* Verified Results Metrics */}
          <div className="verified-metrics-row">
            {study.verifiedResults.map((result, idx) => (
              <div className="result-metric-card" key={idx}>
                <span className="res-val">{result.value}</span>
                <span className="res-label">{result.label}</span>
                <small className="res-sub">{result.subtext}</small>
              </div>
            ))}
          </div>

          <div className="case-summary-bar">
            <div className="summary-left">
              <ShieldCheck size={18} className="shield-green" />
              <span>{study.summary}</span>
            </div>
            <Link
              href={`/contact?service=Music%20Promotion&project=${encodeURIComponent(study.title)}`}
              className="button button-orange case-cta-btn"
            >
              Request Similar Campaign <span>↗</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
