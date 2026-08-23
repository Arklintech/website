'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, SYSTEM_STATUS } from '@/content/navigation';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onOpenProjectModal: () => void;
}

export default function Navbar({ onOpenProjectModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-z-black/90 backdrop-blur-lg border-b border-z-border/80 py-3 shadow-[0_10px_30px_rgba(2,4,7,0.8)]'
            : 'bg-transparent py-4 sm:py-6'
        )}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* =========================================
              LEFT: Brand Logo & Title
              ========================================= */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group focus:outline-none focus:ring-1 focus:ring-z-blue-400 rounded py-1 px-1"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-z-blue-400/60 bg-z-black flex items-center justify-center group-hover:border-z-blue-300 transition-colors shadow-glow-sm shrink-0">
              <Image
                src="/brand/logo.webp"
                alt="ZAQVORO Emblem"
                fill
                priority
                sizes="36px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display font-bold text-base sm:text-lg tracking-[0.2em] text-z-white group-hover:text-z-blue-300 transition-colors leading-none">
                ZAQVORO
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] text-z-dim uppercase mt-1 leading-none hidden sm:block">
                TECHNOLOGIES
              </span>
            </div>
          </Link>

          {/* =========================================
              CENTER: Single-Line Capsule Navigation
              ========================================= */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-4 xl:gap-7 bg-z-surface/80 border border-z-border/80 px-6 py-2.5 rounded-full backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="font-mono text-[11px] xl:text-xs uppercase tracking-[0.12em] text-z-muted hover:text-z-white whitespace-nowrap transition-colors duration-200 py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-z-blue-400 rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* =========================================
              RIGHT: System Status & CTA Button
              ========================================= */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-4 shrink-0">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-z-surface-2/80 border border-z-border font-mono text-[10px] text-z-muted whitespace-nowrap">
              <span className="status-indicator" aria-hidden="true" />
              <span className="text-z-dim">STATUS:</span>
              <span className="text-emerald-400 font-medium">{SYSTEM_STATUS.status}</span>
            </div>

            <button
              onClick={onOpenProjectModal}
              aria-label="Start a project with ZAQVORO"
              className="z-btn-primary group text-xs py-2.5 px-5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-blue-400"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </button>
          </div>

          {/* =========================================
              MOBILE: Quick CTA & Menu Toggle Button
              ========================================= */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenProjectModal}
              aria-label="Start a project with ZAQVORO"
              className="sm:hidden px-3 py-1.5 rounded bg-z-blue-500 text-z-white font-mono text-[10px] uppercase font-semibold flex items-center gap-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-blue-400"
            >
              <span>START</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="p-2 rounded border border-z-border bg-z-surface text-z-text hover:text-z-white shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-blue-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================
          MOBILE DRAWER MENU
          ========================================= */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-40 bg-z-black/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 lg:hidden animate-in fade-in duration-200"
        >
          <div className="flex flex-col space-y-5">
            <div className="font-mono text-[10px] uppercase tracking-widest text-z-dim pb-2 border-b border-z-border">
              NAVIGATION DIRECTORY
            </div>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-lg tracking-wider text-z-text hover:text-z-blue-400 py-1 transition-colors border-b border-z-border/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-z-blue-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-z-border">
            <div className="flex items-center justify-between text-xs font-mono text-z-muted bg-z-surface-2 p-3 rounded border border-z-border">
              <span className="flex items-center gap-2">
                <span className="status-indicator" aria-hidden="true" /> SYSTEM STATE
              </span>
              <span className="text-emerald-400 font-semibold">{SYSTEM_STATUS.status}</span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              aria-label="Start a project with ZAQVORO"
              className="w-full z-btn-primary justify-center py-3 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-blue-400"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
