export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  credentials: string[];
}

// Baseline team members array left empty - manage and add team members manually via the Admin Panel (/admin)
export const teamMembers: TeamMember[] = [];

export const upcomingRoles = [
  {
    role: 'Head of Audio Engineering',
    department: 'Music Production & Mastering',
    description: 'Guiding multi-track mixing, Dolby Atmos workflows, and spectral audio restoration.',
  },
  {
    role: 'Lead 3D & VFX Animator',
    department: 'Visual Production & CGI',
    description: 'Directing cinematic visualizers, 3D character CGI, and album art concepts.',
  },
  {
    role: 'Principal Digital Architect',
    department: 'Web Engineering & Digital Solutions',
    description: 'Architecting high-performance Next.js artist portals, e-commerce, and API systems.',
  },
];
