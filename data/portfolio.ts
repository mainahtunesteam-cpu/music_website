export interface ArtworkProject {
  id: string;
  title: string;
  artist: string;
  style: string;
  image: string;
  concept: string;
  deliverables: string[];
}

export interface VideoProject {
  id: string;
  title: string;
  type: string;
  videoSrc: string;
  poster?: string;
  description: string;
  duration: string;
  aspectRatio: string;
  relatedServiceSlug: string;
}

export interface AudioTrackProject {
  id: string;
  title: string;
  artist?: string;
  type: 'mastering' | 'mixing';
  src: string;
  format: string;
  lufs: string;
  description: string;
  engineerNotes: string;
  beforeNotes: string;
  afterNotes: string;
}

export interface WebProject {
  id: string;
  title: string;
  category: string;
  clientType: string;
  overview: string;
  features: string[];
  techStack: string[];
  desktopPreview: string;
  mobilePreview: string;
  demoUrl?: string;
  relatedServiceSlug: string;
}

export interface CampaignCaseStudy {
  id: string;
  title: string;
  artistName: string;
  genre: string;
  platforms: string[];
  duration: string;
  objective: string;
  strategy: string;
  verifiedResults: {
    label: string;
    value: string;
    subtext: string;
  }[];
  summary: string;
}

// =========================================================================
// 19 PRESERVED COVER ARTWORKS
// =========================================================================
export const artworkCatalog: ArtworkProject[] = [
  {
    id: 'art-01',
    title: 'Kiss of Life',
    artist: 'Elara Moore',
    style: 'R&B / Soul',
    image: 'kiss-of-life.png',
    concept: 'Warm, intimate portraiture blending vintage grain with rich copper and golden hour light, reflecting vulnerable lyricism.',
    deliverables: ['3000x3000px Digital Master', 'Vinyl Sleeve Template', 'Spotify Canvas Assets'],
  },
  {
    id: 'art-02',
    title: "Don't Wake the Devil",
    artist: 'Vellum Noir',
    style: 'Jazz / Blues',
    image: 'dont-wake-the-devil.png',
    concept: 'Nocturnal smoky blues aesthetic using high-contrast shadows, bespoke serif typography, and tactile charcoal textures.',
    deliverables: ['3000x3000px Digital Master', 'Digipak Packaging Layout', 'Social Promo Kit'],
  },
  {
    id: 'art-03',
    title: 'Hold My Soul',
    artist: 'Elias Rowe',
    style: 'Blues / Soul',
    image: 'hold-my-soul.png',
    concept: 'A soulful, raw composition evoking southern blues heritage, earth tones, and timeless analogue warmth.',
    deliverables: ['3000x3000px Digital Master', 'Single Release Countdown Assets'],
  },
  {
    id: 'art-04',
    title: 'Maddie in Heaven',
    artist: 'Luna Crest',
    style: 'Alternative / Romance',
    image: 'maddie-in-heaven.png',
    concept: 'Ethereal, dreamy pastel lighting coupled with celestial textures to convey bittersweet longing and nostalgic romance.',
    deliverables: ['3000x3000px Digital Master', 'Animated Artwork Loop', 'YouTube Visualizer'],
  },
  {
    id: 'art-05',
    title: 'Sad Trap',
    artist: 'Afterhours Audio',
    style: 'Emotional Rap',
    image: 'sad-trap.png',
    concept: 'Melancholic midnight gradients, distressed photocopier textures, and neon violet glows capturing melodic trap emotion.',
    deliverables: ['3000x3000px Digital Master', 'Spotify Canvas Cut', 'Instagram Story Kit'],
  },
  {
    id: 'art-06',
    title: "I'm the Type",
    artist: 'Big Swerve',
    style: 'Hip-Hop / Illustrated',
    image: 'im-the-type.png',
    concept: 'Bold, street-inspired character illustration with dynamic graffiti lettering and vibrant primary pop accents.',
    deliverables: ['3000x3000px Digital Master', 'Merchandise Vector Separations', 'Poster Layout'],
  },
  {
    id: 'art-07',
    title: 'Side Streets and Alley Ways',
    artist: 'Mocha',
    style: 'Hip-Hop / Illustrated',
    image: 'side-streets-and-alley-ways.png',
    concept: 'Gritty urban alleyway perspective rendered in hand-inked graphic novel style, depicting late-night city grit.',
    deliverables: ['3000x3000px Digital Master', 'Tour Poster Adaptations'],
  },
  {
    id: 'art-08',
    title: 'Hip-Hop Visual Artwork',
    artist: 'Creative Portfolio Series',
    style: '3D Character Artwork',
    image: 'hip-hop-visual-artwork.png',
    concept: 'Next-generation 3D CGI character design with reflective metallic streetwear, volumetric studio smoke, and dimensional depth.',
    deliverables: ['3000x3000px Digital Master', '3D Stage LED Visual Loop'],
  },
  {
    id: 'art-09',
    title: 'Most Valuable Steppa',
    artist: 'Yung D 24',
    style: 'Sports / Hip-Hop',
    image: 'most-valuable-steppa.png',
    concept: 'Championship athletic aesthetic with distressed halftone screen-printing, golden trophy, and bold street typography.',
    deliverables: ['3000x3000px Digital Master', 'Apparel Screen-Print Files', 'Single Release Cover'],
  },
  {
    id: 'art-10',
    title: 'Nothing Left to Say',
    artist: 'Kayden Ross',
    style: 'Minimal / Emotional',
    image: 'nothing-left-to-say.png',
    concept: 'Subtle negative space, restrained brutalist typography, and desaturated photography highlighting internal vulnerability.',
    deliverables: ['3000x3000px Digital Master', 'Pre-save Banners'],
  },
  {
    id: 'art-11',
    title: 'The Last December',
    artist: 'Darius Cole',
    style: 'Winter / Soul',
    image: 'the-last-december.png',
    concept: 'Frosted atmospheric landscapes and deep Prussian blues symbolizing the end of a seasonal emotional chapter.',
    deliverables: ['3000x3000px Digital Master', 'Vinyl Center Label Artwork'],
  },
  {
    id: 'art-12',
    title: 'Somebody in Sorrow',
    artist: 'Elias Riverton',
    style: 'Acoustic / Moody',
    image: 'somebody-in-sorrow.png',
    concept: 'Intimate sepia acoustics, textured raw paper grain, and poetic hand-lettered track titling.',
    deliverables: ['3000x3000px Digital Master', 'CD Booklet Insert'],
  },
  {
    id: 'art-13',
    title: 'Fragments of Blue',
    artist: 'Isla Taylor',
    style: 'Abstract / Contemporary',
    image: 'fragments-of-blue.png',
    concept: 'Modernist fluid acrylic marbling layered beneath crisp Swiss architectural typography for progressive contemporary pop.',
    deliverables: ['3000x3000px Digital Master', 'Full EP Packaging Suite'],
  },
  {
    id: 'art-14',
    title: 'A Beautiful Ruin',
    artist: 'Vera Monroe',
    style: 'Gothic / Cinematic',
    image: 'a-beautiful-ruin.png',
    concept: 'Cinematic neo-gothic romanticism featuring decaying classical architecture, chiaroscuro lighting, and ornate letterforms.',
    deliverables: ['3000x3000px Digital Master', 'Deluxe Gatefold Vinyl Artwork'],
  },
  {
    id: 'art-15',
    title: 'Where the Mountains Sleep',
    artist: 'Elias Brooks',
    style: 'Landscape / Atmospheric',
    image: 'where-the-mountains-sleep.png',
    concept: 'Expansive alpine vista bathed in misty Nordic twilight, designed for atmospheric indie folk and ambient releases.',
    deliverables: ['3000x3000px Digital Master', 'Cassette J-Card Template'],
  },
  {
    id: 'art-16',
    title: 'Midnight in Brooklyn',
    artist: 'Jordan Reeves',
    style: 'Urban / Nightlife',
    image: 'midnight-in-brooklyn.png',
    concept: 'Bokeh-soaked metropolitan nightlife photography with glowing amber streetlights and sleek metallic typography.',
    deliverables: ['3000x3000px Digital Master', 'Social Announcement Suite'],
  },
  {
    id: 'art-17',
    title: 'Flowers Never Apologize',
    artist: 'Nora Ellis',
    style: 'Floral / Editorial',
    image: 'flowers-never-apologize.png',
    concept: 'High-fashion editorial botanical arrangement captured with studio flash, balancing organic petals with avant-garde fashion.',
    deliverables: ['3000x3000px Digital Master', 'Merch Graphic Vector Kit'],
  },
  {
    id: 'art-18',
    title: 'The Man Behind the Moon',
    artist: 'Marcus Blake',
    style: 'Nocturnal / Reflective',
    image: 'the-man-behind-the-moon.png',
    concept: 'Minimalist lunar symbolism against deep velvet indigo, channeling nocturnal existential reflections.',
    deliverables: ['3000x3000px Digital Master', 'Animated Visualizer Loop'],
  },
  {
    id: 'art-19',
    title: 'Some Goodbyes Hurt More',
    artist: 'Tiana Brooks',
    style: 'Emotional / Cinematic',
    image: 'some-goodbyes-hurt-more.png',
    concept: 'Cinematic rain-streaked window reflections evoking quiet contemplation and heartfelt acoustic soul.',
    deliverables: ['3000x3000px Digital Master', 'Single Release Press Kit'],
  },
  {
    id: 'art-20',
    title: "Dreams Don't Have Doors",
    artist: 'Lenox Reed',
    style: 'Soul / Surreal',
    image: 'dreams-dont-have-doors.png',
    concept: 'Staircase into the clouds and golden sunset beyond an open portal over the ocean, representing limitless artistic vision.',
    deliverables: ['3000x3000px Digital Master', 'Northwave Records Single Art', 'Spotify Canvas Cut'],
  },
];

// =========================================================================
// PRESERVED ORIGINAL MUSIC VIDEOS (Supplied by Client)
// =========================================================================
export const videoCatalog: VideoProject[] = [
  {
    id: 'vid-blinding-love',
    title: 'Blinding Love — Cinematic Music Video',
    type: 'AI-Assisted Music Video',
    videoSrc: '/Blinding Love.mp4',
    poster: '/blinding-love-poster.jpg',
    description: 'Official client music video release for "Blinding Love". Features emotive visual storytelling, dynamic cinematography, synchronized beat edits, and bespoke atmosphere created by MainahtunesTeam.',
    duration: '01:49',
    aspectRatio: '16:9',
    relatedServiceSlug: 'ai-assisted-music-videos',
  },
  {
    id: 'vid-01',
    title: 'AI Music Video — Portfolio Reel 01',
    type: 'AI-Assisted Music Video',
    videoSrc: '/video1.mp4',
    description: 'Official client video supplied for the MainahtunesTeam creative portfolio. Features cinematic generative visual worlds, seamless scene morphing, and rhythmic editing synchronized to the track beat.',
    duration: '01:28',
    aspectRatio: '16:9',
    relatedServiceSlug: 'ai-assisted-music-videos',
  },
  {
    id: 'vid-02',
    title: 'LOVE KILLS — AI Music Video Reel 02',
    type: 'AI-Assisted Music Video',
    videoSrc: '/video2.mp4',
    description: 'Official client video supplied for the MainahtunesTeam creative portfolio. An evocative visual exploration of dark cinematic motifs, character transformations, and atmospheric lighting.',
    duration: '02:37',
    aspectRatio: '16:9',
    relatedServiceSlug: 'ai-assisted-music-videos',
  },
];

// =========================================================================
// 8 AUTHENTIC CLIENT AUDIO MASTER TRACKS
// =========================================================================
export const audioCatalog: AudioTrackProject[] = [
  {
    id: 'audio-01',
    title: 'Braincrackerz',
    artist: 'Az Alwayz',
    type: 'mastering',
    src: '/audio/az-alwayz-braincrackerz.mp3',
    format: 'Commercial Streaming Master (WAV / 320k MP3)',
    lufs: '-8.8 LUFS',
    description: 'High-impact hip-hop master engineered for heavy 808 sub-bass translation and crisp transient snare definition.',
    engineerNotes: 'Balanced the sub-bass rumble around 35Hz while carving space for the vocal body at 800Hz. True Peak ceiling set to -0.2dB.',
    beforeNotes: 'Raw stereo mix was soft, slightly muddy in the low-mid frequencies, and lacked commercial punch.',
    afterNotes: 'Full commercial volume with razor-sharp high-hats, tight kick-bass punch, and wider stereo image.',
  },
  {
    id: 'audio-02',
    title: 'BIBILON',
    artist: 'Mainahtunes Session',
    type: 'mastering',
    src: '/audio/bibilon.mp3',
    format: 'Release Master (WAV / 320k MP3)',
    lufs: '-9.4 LUFS',
    description: 'Atmospheric electronic master featuring lush synth reverbs, intricate percussive layers, and expansive stereo dimension.',
    engineerNotes: 'Controlled harsh high-frequency resonances with linear-phase dynamic EQ and applied subtle analog tape saturation.',
    beforeNotes: 'Stereo image felt narrow, with harsh sibilance on high synth arpeggios.',
    afterNotes: 'Smooth, polished top-end air, immersive stereo separation, and balanced dynamic headroom.',
  },
  {
    id: 'audio-03',
    title: 'Blinding Love',
    artist: 'Mainahtunes Session',
    type: 'mastering',
    src: '/audio/blinding-love.mp3',
    format: 'Radio & DSP Master (320k MP3)',
    lufs: '-9.0 LUFS',
    description: 'Modern commercial pop/R&B master focusing on vocal intimacy, warm low-end weight, and competitive loudness.',
    engineerNotes: 'Gentle multiband compression applied to glue bass and kick drum; mid/side processing used to widen backing vocal harmonies.',
    beforeNotes: 'Vocals were buried during the chorus and dynamic peaks were inconsistent.',
    afterNotes: 'Vocal sits proudly on top with glistening high-frequency sheen and controlled dynamic energy.',
  },
  {
    id: 'audio-04',
    title: 'Carousel of Emotion',
    artist: 'Mainahtunes Session',
    type: 'mastering',
    src: '/audio/carousel-of-emotion.mp3',
    format: '24-bit / 44.1kHz Master (WAV / 320k MP3)',
    lufs: '-9.2 LUFS',
    description: 'Textured dynamic master featuring rich harmonic saturation, wide acoustic soundstage, and warm vintage character.',
    engineerNotes: 'Processed through analogue-modeled mastering chain for acoustic glue and transparent loudness ceiling.',
    beforeNotes: 'Tracking felt flat with slightly thin low-end warmth and uneven dynamics.',
    afterNotes: 'Warm, punchy, release-ready master with full stereo depth and competitive loudness.',
  },
  {
    id: 'audio-05',
    title: "Let's Go Move Around",
    artist: 'Michelle Bond',
    type: 'mixing',
    src: '/audio/michelle-bond-lets-go-move-around.mp3',
    format: 'Multi-Track Studio Mix & Master',
    lufs: '-10.5 LUFS',
    description: 'Full multi-track production mix and master bringing live drum clarity, separated rhythm guitars, and commanding lead vocals.',
    engineerNotes: 'Mixed from 38 individual stems with discrete plate reverb on lead vocal, glued with punchy bus compression.',
    beforeNotes: 'Unbalanced raw stems with frequency masking between bass guitar, rhythm guitars, and keyboards.',
    afterNotes: 'Every instrument has its distinct frequency home; vocals cut through with warmth and energy.',
  },
  {
    id: 'audio-06',
    title: 'Oath of Light',
    artist: 'Mainahtunes Orchestral',
    type: 'mixing',
    src: '/audio/oath-of-light.mp3',
    format: 'Cinematic Orchestral Master',
    lufs: '-11.2 LUFS',
    description: 'Cinematic hybrid orchestral production combining live strings, brass fanfares, electronic sub-booms, and choir harmonies.',
    engineerNotes: 'Prioritized dynamic range preservation. Created three distinct orchestral depth planes using spatial convolution reverbs.',
    beforeNotes: 'Strings clashed with brass frequencies; low-end braams lacked impact.',
    afterNotes: 'Theatrical cinematic grandeur with immense dynamic impact and clear acoustic separation.',
  },
  {
    id: 'audio-07',
    title: 'SEX TRAP',
    artist: 'Mainahtunes Session',
    type: 'mastering',
    src: '/audio/sex-trap.mp3',
    format: 'Club & Trap Master (WAV / 320k MP3)',
    lufs: '-8.5 LUFS',
    description: 'Heavy bass-forward modern trap master engineered for massive 808 sub punch, crisp hi-hat rolls, and vocal bite.',
    engineerNotes: 'Clipped transients with soft-knee saturator before final true-peak limiting at -0.1dB.',
    beforeNotes: 'Sub-bass was overpowering mid frequencies; snare transient was lost in the mix.',
    afterNotes: 'Fierce, aggressive commercial trap loudness with clean low-end clarity and razor-sharp tops.',
  },
  {
    id: 'audio-08',
    title: 'The Moon, The Earth and The Sun',
    artist: 'Mainahtunes Session',
    type: 'mastering',
    src: '/audio/the-moon-the-earth-and-the-sun.mp3',
    format: 'Atmospheric Master (WAV / 320k MP3)',
    lufs: '-9.6 LUFS',
    description: 'Spacious cinematic release master with ethereal vocal reverbs, lush acoustic instrumentation, and immersive width.',
    engineerNotes: 'Mid/side stereo widening applied above 2.5kHz with precision linear-phase EQ to protect center mono punch.',
    beforeNotes: 'Acoustic instruments felt centered and narrow with masking in low mids.',
    afterNotes: 'Spacious, majestic soundscape with pristine high-end air and balanced low-end warmth.',
  },
];

// =========================================================================
// 8 WEBSITE DEVELOPMENT PORTFOLIO PROJECTS
// =========================================================================
export const webProjectsCatalog: WebProject[] = [
  {
    id: 'web-01',
    title: 'Nova Sound Artist Portal',
    category: 'Artist Website Development',
    clientType: 'Solo Recording Artist (Pop / R&B)',
    overview: 'An immersive, atmospheric artist platform engineered on Next.js. Features continuous audio playback across page navigation, tour dates synced via Bandsintown, high-resolution photo gallery lightbox, and VIP fan club signup.',
    features: [
      'Persistent Global Audio Player (plays continuously as users navigate)',
      'Automated Tour Calendar with direct ticket links',
      'High-Resolution Press Photo Lightbox & EPK download',
      'VIP Newsletter capture with Mailchimp automation',
    ],
    techStack: ['Next.js 14', 'React', 'Tailwind CSS', 'Framer Motion', 'SoundCloud API'],
    desktopPreview: '/projects/artist-portal-desktop.png',
    mobilePreview: '/projects/artist-portal-mobile.png',
    demoUrl: 'https://demo.mainahtunesteam.com/artist-portal',
    relatedServiceSlug: 'artist-website-development',
  },
  {
    id: 'web-02',
    title: 'Vellum Records Multi-Roster Hub',
    category: 'Record Label Website Development',
    clientType: 'Independent Record Label (Electronic & Hip-Hop)',
    overview: 'A sleek, authoritative multi-artist record label website with dynamic roster filtering, integrated discography catalogs, press releases, and a private, password-protected A&R demo submission portal.',
    features: [
      'Multi-Artist Roster Management with individual discographies',
      'Centralized Catalog Release Archive with DSP smart-links',
      'Private A&R Demo Submission Dropbox with audio upload',
      'Corporate Press Room and executive management directory',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Supabase', 'CSS Grid', 'Vercel Edge'],
    desktopPreview: '/projects/label-hub-desktop.png',
    mobilePreview: '/projects/label-hub-mobile.png',
    demoUrl: 'https://demo.mainahtunesteam.com/record-label',
    relatedServiceSlug: 'record-label-website-development',
  },
  {
    id: 'web-03',
    title: 'MerchVault Artist E-Commerce Store',
    category: 'E-commerce Website Development',
    clientType: 'Touring Hip-Hop Collective',
    overview: 'A high-converting direct-to-fan merchandise and physical vinyl storefront with 1-click mobile checkout, automated shipping calculation, vinyl pre-order countdowns, and size variant matrices.',
    features: [
      'Frictionless 1-Click Mobile Checkout (Apple Pay & Stripe)',
      'Limited-Edition Vinyl Pre-Order Campaign Engine',
      'Interactive Garment Sizing Chart & 3D apparel previews',
      'Automated Order Tracking and customer fulfillment emails',
    ],
    techStack: ['Next.js', 'Shopify Storefront API', 'Stripe', 'Tailwind CSS'],
    desktopPreview: '/projects/ecommerce-desktop.png',
    mobilePreview: '/projects/ecommerce-mobile.png',
    demoUrl: 'https://demo.mainahtunesteam.com/ecommerce-store',
    relatedServiceSlug: 'ecommerce-website-development',
  },
  {
    id: 'web-04',
    title: 'SoundLab Audio Engineer Portfolio',
    category: 'Music Portfolio Website Development',
    clientType: 'Multi-Platinum Mixing & Mastering Engineer',
    overview: 'An audio-centric engineer portfolio featuring interactive before/after A/B audio comparison sliders, categorized credit discography, studio hardware gear lists, and session rate inquiry workflows.',
    features: [
      'Interactive A/B Audio Comparison Player (Raw vs Mastered)',
      'Filterable Credit Discography (Spotify embed integration)',
      'Studio Hardware Outboard & Plug-in Specification List',
      'Multi-track Session File Upload & Booking Workflow',
    ],
    techStack: ['React', 'Web Audio API', 'Next.js', 'Styled Components'],
    desktopPreview: '/projects/audio-portfolio-desktop.png',
    mobilePreview: '/projects/audio-portfolio-mobile.png',
    demoUrl: 'https://demo.mainahtunesteam.com/audio-portfolio',
    relatedServiceSlug: 'music-portfolio-website-development',
  },
  {
    id: 'web-05',
    title: 'Apex Talent Management Corporate Platform',
    category: 'Business Website Development',
    clientType: 'Music Management & Publishing Agency',
    overview: 'An elite B2B corporate digital platform establishing instant authority with enterprise partners, brand sponsors, and global streaming executives. Features verified client case studies and consultation booking.',
    features: [
      'Sophisticated Editorial Typography & Corporate Brand Voice',
      'Interactive Corporate Client Case Studies with verified metrics',
      'B2B Consultation & Talent Booking Inquiry System',
      'Full WCAG AA Accessibility and GDPR compliance',
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Vercel Analytics'],
    desktopPreview: '/projects/business-desktop.png',
    mobilePreview: '/projects/business-mobile.png',
    demoUrl: 'https://demo.mainahtunesteam.com/business-agency',
    relatedServiceSlug: 'business-website-development',
  },
  {
    id: 'web-06',
    title: 'Single Release Pre-Save Landing Page',
    category: 'Landing Page Development',
    clientType: 'Independent Pop Artist Single Campaign',
    overview: 'An ultra-fast, single-page landing site engineered for maximum pre-save conversion rates. Includes live release countdown timer, 15-second teaser audio preview, and direct DSP pre-save authorization.',
    features: [
      'Sub-Second Page Load Speed (0.3s First Contentful Paint)',
      'Smart-Link DSP Pre-Save (Spotify, Apple Music, Tidal)',
      'Synchronized Release Day Countdown Clock',
      'Integrated Meta Pixel & TikTok Pixel conversion tracking',
    ],
    techStack: ['Next.js Edge', 'HTML5 Audio', 'Vanilla CSS', 'Meta CAPI'],
    desktopPreview: '/projects/landing-desktop.png',
    mobilePreview: '/projects/landing-mobile.png',
    demoUrl: 'https://demo.mainahtunesteam.com/landing-page',
    relatedServiceSlug: 'landing-page-development',
  },
  {
    id: 'web-07',
    title: 'Waveform Music Streaming UI/UX App',
    category: 'UI/UX Design',
    clientType: 'Music Tech Startup',
    overview: 'A comprehensive Figma design system and clickable interface prototype for a next-generation lossless music streaming mobile application, featuring custom equalizer controls and social listening rooms.',
    features: [
      'Complete Dark & Light Mode Design System in Figma',
      '120+ Responsive Screen Wireframes and Component Tokens',
      'Interactive Clickable Micro-interactions and Haptic Feedback Flows',
      'Comprehensive Developer Handoff Specs and Design Tokens',
    ],
    techStack: ['Figma', 'FigJam', 'Tokens Studio', 'Design Systems'],
    desktopPreview: '/projects/uiux-desktop.png',
    mobilePreview: '/projects/uiux-mobile.png',
    demoUrl: 'https://demo.mainahtunesteam.com/uiux-prototype',
    relatedServiceSlug: 'ui-ux-design',
  },
  {
    id: 'web-08',
    title: 'SyncTrack Music Licensing Web Application',
    category: 'Web Application Development',
    clientType: 'Music Publishing & Sync Agency',
    overview: 'A bespoke cloud software application allowing music supervisors to search catalog tracks by tempo (BPM), mood tags, vocal type, and key, generate one-stop licensing quotes, and download broadcast-ready stems.',
    features: [
      'Advanced Audio Search with BPM, Key, and Mood Filtering',
      'Instant One-Stop License Quote Generator and PDF contract output',
      'Secure Multi-Track WAV stem downloading for licensed buyers',
      'Role-based Access Control (Admin, Supervisor, Artist)',
    ],
    techStack: ['Next.js 14', 'PostgreSQL', 'Supabase Auth', 'AWS S3', 'Stripe'],
    desktopPreview: '/projects/webapp-desktop.png',
    mobilePreview: '/projects/webapp-mobile.png',
    demoUrl: 'https://demo.mainahtunesteam.com/web-app',
    relatedServiceSlug: 'web-application-development',
  },
];

// =========================================================================
// 4 MUSIC PROMOTION CASE STUDIES
// =========================================================================
export const promotionCaseStudies: CampaignCaseStudy[] = [
  {
    id: 'case-01',
    title: 'Organic Spotify Algorithmic Discovery Campaign',
    artistName: 'Elias Rowe (Indie Soul)',
    genre: 'R&B / Soul',
    platforms: ['Spotify', 'Spotify for Artists', 'Instagram Audio'],
    duration: '8 Weeks',
    objective: 'Trigger Spotify algorithmic discovery (Discover Weekly, Release Radar) without bot playlists or fake stream farms.',
    strategy: 'Focused on high-intent pre-saves, pitching to 65 verified independent tastemakers, and optimizing the Spotify for Artists profile to maximize completion rates and save-to-listener ratios.',
    verifiedResults: [
      { label: 'Save-to-Stream Ratio', value: '38.4%', subtext: 'Triggered algorithmic momentum' },
      { label: 'Discover Weekly Adds', value: '42,000+', subtext: 'Listeners acquired organically' },
      { label: 'Curator Additions', value: '28 Playlists', subtext: '100% verified independent tastemakers' },
      { label: 'Follower Growth', value: '+340%', subtext: 'Compounding permanent fan base' },
    ],
    summary: 'By maintaining an exceptional 38.4% save rate during release week, Spotify’s recommendation algorithms pushed the single into thousands of Discover Weekly feeds worldwide.',
  },
  {
    id: 'case-02',
    title: 'TikTok Viral Hook Seeding & UGC Campaign',
    artistName: 'Vellum Noir (Alternative Rap)',
    genre: 'Melodic Hip-Hop',
    platforms: ['TikTok', 'Instagram Reels', 'Spotify'],
    duration: '6 Weeks',
    objective: 'Drive user-generated content (UGC) around an infectious 15-second song hook and convert short-form video viewers into full DSP streams.',
    strategy: 'Isolated the most relatable emotional lyric transition, partnered with 25 targeted micro-creators in underground fashion and late-night aesthetic niches, and anchored the official TikTok sound.',
    verifiedResults: [
      { label: 'Total Sound Creations', value: '3,800+', subtext: 'User-generated videos created' },
      { label: 'Short-Form Impressions', value: '4.2M+', subtext: 'Combined views across TikTok & Reels' },
      { label: 'Spotify Monthly Spikes', value: '+85,000', subtext: 'Listeners arriving from sound links' },
      { label: 'Shazam Discoveries', value: '14,500', subtext: 'Track searches during campaign' },
    ],
    summary: 'The sound achieved organic community adoption in the aesthetic streetwear niche, creating a compounding wave of user creations that funneled over 85,000 monthly listeners to Spotify.',
  },
  {
    id: 'case-03',
    title: 'College Radio & Regional Syndication Outreach',
    artistName: 'Luna Crest (Indie Pop)',
    genre: 'Alternative Pop',
    platforms: ['College Radio', 'Community FM', 'BDS / Mediabase'],
    duration: '10 Weeks',
    objective: 'Secure genuine terrestrial and digital radio rotation across North American university and indie community stations.',
    strategy: 'Assembled a broadcast-ready radio package (Clean Radio Edit, broadcast WAV, digital radio one-sheet) and conducted targeted direct outreach to 120 college music directors.',
    verifiedResults: [
      { label: 'Station Additions', value: '44 Stations', subtext: 'Confirmed weekly rotations' },
      { label: 'Chart Position', value: '#18', subtext: 'NACC College Radio Top 20' },
      { label: 'Live On-Air Interviews', value: '7 Stations', subtext: 'Acoustic in-studio sessions' },
      { label: 'Commercial Spin Proof', value: 'Verified', subtext: 'Tracked via Mediabase airplay logs' },
    ],
    summary: 'The campaign established deep regional credibility, resulting in a Top 20 NACC chart position and multiple live in-studio acoustic broadcast performances.',
  },
  {
    id: 'case-04',
    title: 'Global Multi-Single Rollout & EP Launch Masterplan',
    artistName: 'Michelle Bond & Studio Roster',
    genre: 'Modern Pop / Dance',
    platforms: ['Spotify', 'Apple Music', 'YouTube', 'TikTok', 'Press'],
    duration: '16 Weeks',
    objective: 'Execute an interconnected 4-single waterfall release strategy leading up to an EP drop with synchronized visuals, audio, and web presence.',
    strategy: 'Synchronized audio mixing/mastering, 3000x3000px artwork, lyric video production, and a custom responsive artist landing page into an orchestrated chronological roadmap.',
    verifiedResults: [
      { label: 'Total Catalog Streams', value: '1.2M+', subtext: 'Combined streams across 4 singles' },
      { label: 'Apple Music Editorial', value: 'New Music Daily', subtext: 'Placement in 6 international territories' },
      { label: 'Merch Pre-Orders', value: '$18,400', subtext: 'Direct-to-fan sales via landing page' },
      { label: 'YouTube Video Views', value: '380,000+', subtext: 'Organic watch time on official visuals' },
    ],
    summary: 'A textbook agency execution proving that when sound, visuals, digital identity, and campaign planning move as one unified force, independent artists achieve major-label results.',
  },
];
