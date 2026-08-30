'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client error safely
    console.error('ARKLINTECH Interface Runtime Error:', error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-[#F5F1E8] text-[#111827] relative"
      style={{ backgroundColor: '#030507', color: '#F4F7FA' }}
    >
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
      <div className="max-w-md w-full bg-white border border-[rgba(148,163,184,0.15)] rounded-xl p-8 text-center relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="w-14 h-14 rounded-full bg-[#EDF4FF] border border-[rgba(22,119,255,0.4)] mx-auto flex items-center justify-center text-[#1463FF] mb-5 shadow-[0_0_20px_rgba(22,119,255,0.2)]">
          <AlertTriangle className="w-7 h-7 text-[#1463FF]" />
        </div>

        <div className="font-mono text-xs text-[#1463FF] uppercase tracking-wider mb-2">
          SYSTEM FAULT INTERCEPTED
        </div>

        <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#111827] mb-3">
          INTERFACE ANOMALY
        </h2>

        <p className="text-xs text-[#536070] font-body leading-relaxed mb-6">
          A temporary rendering anomaly was intercepted. The system has preserved session state and can reload the interface cleanly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto z-btn-primary text-xs py-2.5 px-5 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RECOVER INTERFACE</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto z-btn-secondary text-xs py-2.5 px-5 flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
