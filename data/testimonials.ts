export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  location: string;
  serviceEngaged: string;
  quote: string;
  verifiedOutcome: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-01',
    clientName: 'Michelle Bond',
    role: 'Recording Artist',
    location: 'London, UK',
    serviceEngaged: 'Music Mixing & Mastering',
    quote: "MainahtunesTeam brought a level of punch and spatial dimension to 'Let’s Go Move Around' that completely transformed how it translated on Spotify and club sound systems. The A/B revisions were transparent, fast, and respectful of my creative identity.",
    verifiedOutcome: 'Radio airplay rotation in 4 countries & 350K+ organic streams',
  },
  {
    id: 't-02',
    clientName: 'Elara Moore',
    role: 'R&B / Soul Vocalist',
    location: 'Atlanta, USA',
    serviceEngaged: 'Cover Artwork & Artist Branding',
    quote: "The cover artwork for 'Kiss of Life' stopped everyone in their tracks on Instagram and Spotify. MainahtunesTeam gave me a visual world that looked like a major-label release from day one. I've never felt more confident pitching my music.",
    verifiedOutcome: 'Cover featured in Apple Music editorial showcase banner',
  },
  {
    id: 't-03',
    clientName: 'Vellum Noir',
    role: 'Music Producer & Label Head',
    location: 'Toronto, Canada',
    serviceEngaged: 'Record Label Website & Promotion',
    quote: "Finding an agency that understands both the creative grit of underground music and the precision of modern Next.js web engineering is virtually impossible. MainahtunesTeam built our multi-artist portal and ran an organic TikTok sound campaign that blew our expectations out of the water.",
    verifiedOutcome: '4.2M+ short-form impressions & 85K new monthly listeners',
  },
  {
    id: 't-04',
    clientName: 'Elias Rowe',
    role: 'Independent Singer-Songwriter',
    location: 'Nashville, USA',
    serviceEngaged: 'Spotify Promotion & Playlist Pitching',
    quote: "Zero bots, zero shady playlist farms. MainahtunesTeam pitched directly to genuine independent curators who loved the music. We achieved a 38.4% save rate that triggered Spotify's Discover Weekly algorithm for 6 consecutive weeks.",
    verifiedOutcome: '42,000+ organic algorithmic streams in first month',
  },
];
