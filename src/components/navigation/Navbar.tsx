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
  const [showNavbar, setShowNavbar] = useState(pathname !== '/');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(scrollY > 20);

      // On home page, keep navbar hidden while robot is at top; reveal when scrolled down
      if (pathname === '/') {
        setShowNavbar(scrollY > 80);
      } else {
        setShowNavbar(true);
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
        showNavbar
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      } ${
        scrolled
          ? `bg-[#F5F1E8]/95 backdrop-blur-md ${pathname === '/industries' ? '' : 'border-b border-[#D8D4C9]'} shadow-sm`
          : `bg-[#F5F1E8]/90 backdrop-blur-md ${pathname === '/industries' ? '' : 'border-b border-[#D8D4C9]/60'}`
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
            <KeystoneLogo size="sm" textColor="text-[#0B132B]" />
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
            className="lg:hidden p-2 rounded-lg bg-white border border-[#D8D4C9] text-[#111827] hover:text-[#1463FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#1463FF]" /> : <Menu className="w-5 h-5 text-[#111827]" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 px-3 border-t border-[#D8D4C9] bg-[#FBF9F3] space-y-1.5 rounded-b-2xl shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block p-3 rounded-xl font-mono text-xs font-bold uppercase transition-colors ${
                  pathname?.startsWith(link.href)
                    ? 'bg-[#EDF4FF] text-[#1463FF] border border-[#1463FF]/30'
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
