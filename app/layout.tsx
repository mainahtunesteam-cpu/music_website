import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import BackToTopButton from '@/components/BackToTopButton';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://mainahtunesteam.com'),
  title: {
    default: 'MainahtunesTeam | Music, Branding & Digital Solutions Agency',
    template: '%s | MainahtunesTeam',
  },
  description:
    'An international creative agency for independent artists, record labels, and music businesses. Comprehensive music distribution, mixing & mastering, AI video production, cover artwork, and modern website development.',
  keywords: [
    'MainahtunesTeam',
    'music distribution',
    'mixing and mastering',
    'artist branding',
    'cover artwork design',
    'AI music videos',
    'artist website development',
    'music marketing agency',
    'Spotify playlist pitching',
    'independent artist development',
  ],
  authors: [{ name: 'MainahtunesTeam' }],
  creator: 'MainahtunesTeam',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mainahtunesteam.com',
    siteName: 'MainahtunesTeam',
    title: 'MainahtunesTeam | Creative Agency for Music, Branding & Digital Solutions',
    description:
      'We bring sound, visuals, and digital identity together. 53 connected services for independent recording artists, producers, and music labels.',
    images: [
      {
        url: '/mainahtunesteam-logo.png',
        width: 1200,
        height: 630,
        alt: 'MainahtunesTeam — Creative Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MainahtunesTeam | Music, Branding & Digital Solutions Agency',
    description:
      'Turn creative ambition into international execution. 53 professional services for music creators and labels.',
    images: ['/mainahtunesteam-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'MainahtunesTeam',
    image: 'https://mainahtunesteam.com/mainahtunesteam-logo.png',
    '@id': 'https://mainahtunesteam.com',
    url: 'https://mainahtunesteam.com',
    email: 'contact.mainahtunesteam@gmail.com',
    description:
      'Premium international creative agency providing music distribution, mixing and mastering, video production, artist branding, and custom website development.',
    serviceType: [
      'Music Distribution & Promotion',
      'Music Production & Audio Engineering',
      'Music Videos & Visual Production',
      'Artist Branding & Graphic Design',
      'Artist Development & Digital Presence',
      'Website Development & Digital Technology',
    ],
    priceRange: '$$',
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <WhatsAppFloatingButton />
          <BackToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
