'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import KeystoneLogo from '@/components/brand/KeystoneLogo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenProjectModal?: () => void;
}

export default function Navbar({ onOpenProjectModal }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkHero, setIsDarkHero] = useState(pathname === '/');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(scrollY > 20);

      // On home page, top hero is dark black until user scrolls past robot section
      if (pathname === '/') {
        setIsDarkHero(scrollY < 500);
      } else {
        setIsDarkHero(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { href: '/what-we-do', label: 'WHAT WE DO' },
    { href: '/how-we-help', label: 'HOW WE HELP' },
    { href: '/industries', label: 'INDUSTRIES' },
    { href: '/work', label: 'WORK' },
    { href: '/about', label: 'ABOUT' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkHero
          ? 'bg-black/70 backdrop-blur-md border-b border-white/10 text-white shadow-sm'
          : scrolled
            ? 'bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#D8D4C9] text-[#111827] shadow-sm'
            : 'bg-[#F5F1E8]/90 backdrop-blur-md border-b border-[#D8D4C9]/60 text-[#111827]'
      }`}
      role="banner"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Wordmark & Keystone Mark */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF] rounded-lg"
            aria-label="ARKLINTECH — Home"
          >
            <KeystoneLogo size="sm" textColor={isDarkHero ? 'text-white' : 'text-[#0B132B]'} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-mono tracking-wider font-semibold" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1463FF] rounded ${
                  pathname?.startsWith(link.href)
                    ? 'text-[#1463FF]'
                    : isDarkHero
                      ? 'text-white/85 hover:text-[#1463FF]'
                      : 'text-[#111827] hover:text-[#1463FF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {onOpenProjectModal && (
              <button
                type="button"
                onClick={onOpenProjectModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#1463FF] hover:bg-[#004AD6] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-[#1463FF]/25"
              >
                <span>START A SYSTEM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF] ${
              isDarkHero
                ? 'bg-white/10 border-white/20 text-white hover:text-[#1463FF]'
                : 'bg-white border-[#D8D4C9] text-[#111827] hover:text-[#1463FF]'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#1463FF]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden py-4 px-3 border-t space-y-1.5 rounded-b-2xl shadow-xl ${
            isDarkHero
              ? 'bg-[#0B132B] border-white/15 text-white'
              : 'bg-[#FBF9F3] border-[#D8D4C9] text-[#111827]'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block p-3 rounded-xl font-mono text-xs font-bold uppercase transition-colors ${
                  pathname?.startsWith(link.href)
                    ? 'bg-[#1463FF]/15 text-[#1463FF] border border-[#1463FF]/30'
                    : isDarkHero
                      ? 'text-white/90 hover:bg-white/10 hover:text-[#1463FF]'
                      : 'text-[#111827] hover:bg-[#EDF4FF] hover:text-[#1463FF]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {onOpenProjectModal && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProjectModal();
                  }}
                  className="w-full py-3 rounded-xl bg-[#1463FF] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md text-center flex items-center justify-center gap-2"
                >
                  <span>START A SYSTEM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
