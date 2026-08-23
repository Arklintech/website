'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from './PageContainer';

export default function Footer() {
  return (
    <footer className="w-full bg-z-black border-t border-z-border/80 pt-16 pb-12 text-z-muted">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-z-border/60">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-z-blue-400/60 bg-z-black flex items-center justify-center shadow-glow-sm shrink-0 group-hover:border-z-blue-300 transition-colors">
                <Image
                  src="/brand/logo.webp"
                  alt="ZAQVORO Logo"
                  fill
                  sizes="32px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-display font-semibold text-lg tracking-[0.18em] text-z-white group-hover:text-z-blue-300 transition-colors">
                ZAQVORO
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-z-dim font-body leading-relaxed max-w-sm">
              We architect intelligent systems, automate complex operations, and build software that drives real outcomes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded border border-z-border flex items-center justify-center font-mono text-xs text-z-muted hover:text-z-white hover:border-z-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded border border-z-border flex items-center justify-center font-mono text-xs text-z-muted hover:text-z-white hover:border-z-blue-400 transition-colors"
                aria-label="X Twitter"
              >
                𝕏
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded border border-z-border flex items-center justify-center font-mono text-xs text-z-muted hover:text-z-white hover:border-z-blue-400 transition-colors"
                aria-label="GitHub"
              >
                git
              </a>
            </div>
          </div>

          {/* Capabilities Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-z-white font-semibold">
              CAPABILITIES
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#capabilities" className="hover:text-z-white transition-colors">AI & Intelligence</a></li>
              <li><a href="#capabilities" className="hover:text-z-white transition-colors">Software & Platforms</a></li>
              <li><a href="#capabilities" className="hover:text-z-white transition-colors">Automation</a></li>
              <li><a href="#capabilities" className="hover:text-z-white transition-colors">Business Systems</a></li>
            </ul>
          </div>

          {/* Systems Column */}
          <div className="md:col-span-2 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-z-white font-semibold">
              SYSTEMS
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#systems" className="hover:text-z-white transition-colors">Data & Analytics</a></li>
              <li><a href="#systems" className="hover:text-z-white transition-colors">Infrastructure</a></li>
              <li><a href="#systems" className="hover:text-z-white transition-colors">Security</a></li>
              <li><a href="#systems" className="hover:text-z-white transition-colors">Integration</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-z-white font-semibold">
              COMPANY
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#about" className="hover:text-z-white transition-colors">About Us</a></li>
              <li><a href="#work" className="hover:text-z-white transition-colors">Selected Work</a></li>
              <li><a href="#future" className="hover:text-z-white transition-colors">Innovation Lab</a></li>
              <li><a href="#process" className="hover:text-z-white transition-colors">How We Build</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-z-dim">
          <div>
            © 2026 ZAQVORO Technologies. All rights reserved.
          </div>

          <div className="text-z-muted tracking-widest text-[10px] uppercase hidden sm:block">
            ONE MACHINE. ONE JOURNEY. ONE PURPOSE.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
