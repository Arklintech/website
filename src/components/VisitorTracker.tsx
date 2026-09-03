'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Exclude admin pages from visitor tracking
    if (pathname.startsWith('/admin')) return;

    let sessionId = localStorage.getItem('ark_session_id');
    if (!sessionId) {
      sessionId = `sess_${Math.random().toString(36).substring(2, 9)}${Date.now().toString(36)}`;
      localStorage.setItem('ark_session_id', sessionId);
    }

    fetch('/api/visitor-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        pathname,
        source: document.referrer ? new URL(document.referrer).hostname : 'Direct',
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
