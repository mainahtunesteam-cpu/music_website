'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { siteConfig } from '@/data/siteConfig';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/visuals', label: 'Review My Works' },
  { href: '/artist-growth', label: 'Artist Growth' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Our Team' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="topline">
        <span className="topline-left">
          <Sparkles size={11} className="inline-sparkle" /> INDEPENDENT VISION. GLOBAL SOUND.
        </span>
        <span className="topline-center">MUSIC · BRANDING · DIGITAL SOLUTIONS</span>
        <span className="topline-right">
          <a href="mailto:contact.mainahtunesteam@gmail.com">
            contact.mainahtunesteam@gmail.com
          </a>
        </span>
      </div>

      <header className="site-header">
        <Link href="/" className="brand">
          <Image
            src="/mainahtunesteam-logo.png"
            alt="MainahtunesTeam logo"
            width={48}
            height={48}
            priority
          />
          <span>
            <b>MAINAHTUNESTEAM</b>
            <small>MUSIC · BRANDING · DIGITAL SOLUTIONS</small>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={isActive ? 'nav-link active' : 'nav-link'}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <Link className="button button-orange nav-cta" href="/contact">
            Start a project <span>↗</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
          <div
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="drawer-header">
              <span className="drawer-brand">
                <b>MAINAHTUNESTEAM</b>
                <small>CREATIVE AGENCY</small>
              </span>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-links">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={pathname === l.href ? 'drawer-link active' : 'drawer-link'}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{l.label}</span>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            </div>

            <div className="drawer-footer">
              <button
                type="button"
                className="drawer-theme-btn"
                onClick={toggleTheme}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={18} /> <span>Switch to Light Theme</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} /> <span>Switch to Dark Theme</span>
                  </>
                )}
              </button>

              <Link
                href="/contact"
                className="button button-orange drawer-cta"
                onClick={() => setMobileOpen(false)}
              >
                Start Your Project <span>↗</span>
              </Link>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-outline"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderColor: 'rgba(37, 211, 102, 0.4)',
                  color: '#25D366',
                  marginTop: '10px',
                  width: '100%',
                }}
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle size={16} /> Chat on WhatsApp ↗
              </a>

              <div className="drawer-contact-info">
                <small>DIRECT EMAIL</small>
                <a href="mailto:contact.mainahtunesteam@gmail.com">
                  contact.mainahtunesteam@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
