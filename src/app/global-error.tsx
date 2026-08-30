'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('ARKLINTECH Global Fatal Error:', error);
  }, [error]);

  return (
    <html lang="en" className="dark" style={{ backgroundColor: '#030507', color: '#F4F7FA' }}>
      <body
        style={{
          backgroundColor: '#030507',
          color: '#F4F7FA',
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            width: '90%',
            backgroundColor: '#0B1621',
            border: '1px solid rgba(148,163,184,0.2)',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>
            CRITICAL INTERFACE FAULT
          </h2>
          <p style={{ fontSize: '13px', color: '#8FA1B5', marginBottom: '24px', lineHeight: '1.6' }}>
            The root rendering subsystem encountered an unexpected exception.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#1677FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            REINITIALIZE SYSTEM
          </button>
        </div>
      </body>
    </html>
  );
}
