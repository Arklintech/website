'use client';

import React from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { ArrowRight, ShieldCheck, Lock, Server, Key, FileCheck, RefreshCw } from 'lucide-react';

const TRUST_PILLARS = [
  {
    title: 'Zero-Trust Perimeters & Access Control',
    icon: Lock,
    description: 'Every request, query, and microservice call is authenticated and authorized using cryptographic tokens with minimal required privilege.',
    points: [
      'Role-based access control (RBAC) enforced at database and API levels',
      'Mutual TLS (mTLS) securing all internal service-to-service communication',
      'Short-lived signed JWT session tokens with automatic revocation',
    ],
  },
  {
    title: 'Data Privacy, Encryption & Residency',
    icon: Key,
    description: 'Customer and operational data is encrypted both at rest and in transit with absolute tenancy boundaries.',
    points: [
      'AES-256 encryption at rest on all relational and vector database stores',
      'TLS 1.3 encryption in transit across all public and internal gateways',
      'Strict logical and physical tenancy isolation preventing data bleeding',
    ],
  },
  {
    title: 'Reliability & Fault-Tolerant Operations',
    icon: Server,
    description: 'Architectures engineered for 99.99% operational uptime with multi-region database failover and local-first resilience.',
    points: [
      'Local-first terminal tolerance keeping operations running through internet drops',
      'Automated database snapshots, point-in-time recovery, and multi-AZ redundancy',
      'Graceful degradation circuits when external vendor services experience outages',
    ],
  },
  {
    title: 'Continuous Validation & Code Ownership',
    icon: FileCheck,
    description: 'Rigorous automated integration tests, zero regression deployments, and 100% IP ownership for our clients.',
    points: [
      'Automated CI/CD security linting, vulnerability scanning, and schema verification',
      'Complete client ownership of all written source code, schemas, and assets',
      'Comprehensive documentation and API contracts enabling internal team maintenance',
    ],
  },
];

export default function TrustSecurityPage() {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            {/* Page Header */}
            <div className="max-w-3xl mb-12 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-z-cyan-400 border border-z-border px-2 py-0.5 rounded bg-z-surface-2">
                  10
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-z-blue-400 font-semibold">
                  ENTERPRISE TRUST & GOVERNANCE
                </span>
              </div>
              <h1 className="text-display-l font-display font-bold text-z-white uppercase tracking-tight">
                TRUST & SECURITY
              </h1>
              <p className="text-base sm:text-lg text-z-muted font-body leading-relaxed">
                Security, reliability, and data privacy are foundational constraints built into every layer of our systems architecture. We construct systems that businesses can depend on for mission-critical operations.
              </p>
            </div>

            {/* Trust Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {TRUST_PILLARS.map((tp, idx) => {
                const Icon = tp.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-lg bg-z-surface border border-z-border space-y-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 pb-2 border-b border-z-border/70">
                        <div className="p-1.5 rounded bg-z-surface-2 border border-z-border text-z-cyan-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h2 className="font-display font-bold text-base text-z-white uppercase">
                          {tp.title}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-z-text font-body mt-2 leading-relaxed">
                        {tp.description}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-z-border/50">
                      {tp.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-z-muted font-body">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="p-6 rounded-lg bg-z-surface-2 border border-z-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-display font-semibold text-base text-z-white uppercase">
                  SECURITY & TRUST INQUIRIES
                </div>
                <div className="text-xs text-z-muted font-body mt-0.5">
                  Request detailed security boundary specifications for your compliance audit.
                </div>
              </div>

              <button
                onClick={onOpenProjectModal}
                className="z-btn-primary text-xs py-3 px-6 whitespace-nowrap"
              >
                <span>CONTACT ARCHITECTURE TEAM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
