'use client';

import React from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { ArrowRight, Server, Database, ShieldCheck, Cpu, Network, Activity, Lock, Terminal } from 'lucide-react';

const ARCHITECTURE_PILLARS = [
  {
    title: 'Application & Presentation Architecture',
    tag: 'TIER 01',
    description: 'Edge-rendered interfaces, optimistic UI mutations, and state machines built for sub-50ms user interaction latency.',
    specs: [
      'Next.js / React edge-rendered presentation layer with zero hydration lag',
      'Client-side optimistic state updates with rollback integrity guarantees',
      'High-density UI layouts built with accessible dark-mode engineering design systems',
      'Local-first client support via embedded SQLite and IndexedDB caching stores',
    ],
    icon: Terminal,
  },
  {
    title: 'Distributed Service & API Fabric',
    tag: 'TIER 02',
    description: 'Contract-tested microservices communicating over high-speed gRPC meshes and typed REST/GraphQL endpoints.',
    specs: [
      'Strict JSON Schema validation on all inbound and outbound API contracts',
      'Bilateral WebSocket event buses for zero-latency operational broadcast',
      'Idempotent webhook delivery handlers with dead-letter retry queues',
      'Zero-downtime rolling canary deployments with automated health telemetry',
    ],
    icon: Network,
  },
  {
    title: 'Data Topologies & Transactional Ledgers',
    tag: 'TIER 03',
    description: 'ACID-compliant relational databases, timeseries telemetry stores, and high-throughput vector context vaults.',
    specs: [
      'PostgreSQL multi-AZ clusters with automated failover and read replicas',
      'pgvector & localized embeddings for sub-100ms semantic similarity queries',
      'ClickHouse / TimescaleDB pipelines for real-time analytical event aggregation',
      'Double-entry transactional ledgers guaranteeing 0.00% financial divergence',
    ],
    icon: Database,
  },
  {
    title: 'Zero-Trust Security & Integrity Perimeter',
    tag: 'TIER 04',
    description: 'Cryptographic identity verification, strict role-based access control (RBAC), and continuous automated auditing.',
    specs: [
      'End-to-end AES-256 encryption at rest and TLS 1.3 in transit',
      'Mutual TLS (mTLS) and scoped JWT tokens for inter-service authentication',
      'Strict data tenancy isolation preventing cross-organization leakage',
      'Continuous automated security scanning in CI/CD build pipelines',
    ],
    icon: Lock,
  },
];

export default function TechnologyArchitecturePage() {
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
                  09
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-z-blue-400 font-semibold">
                  DEEP TECHNICAL BLUEPRINTS
                </span>
              </div>
              <h1 className="text-display-l font-display font-bold text-z-white uppercase tracking-tight">
                TECHNOLOGY & ARCHITECTURE
              </h1>
              <p className="text-base sm:text-lg text-z-muted font-body leading-relaxed">
                An exhaustive engineering overview of the architectural standards, protocols, data topologies, and security boundaries that underpin all <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span> systems.
              </p>
            </div>

            {/* 4 Architecture Pillars */}
            <div className="space-y-8 mb-12">
              {ARCHITECTURE_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-lg bg-z-surface border border-z-border space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-z-border/70">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-z-surface-2 border border-z-border">
                          <Icon className="w-4 h-4 text-z-cyan-400" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-z-cyan-400 font-bold uppercase tracking-widest">
                            {pillar.tag} • ARCHITECTURAL SPECIFICATION
                          </span>
                          <h2 className="text-lg sm:text-xl font-display font-bold text-z-white uppercase">
                            {pillar.title}
                          </h2>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-z-dim uppercase hidden sm:inline-block">
                        PRODUCTION GRADE
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                      {pillar.specs.map((sp, i) => (
                        <div key={i} className="p-3 rounded bg-z-surface-2 border border-z-border text-z-muted leading-relaxed">
                          <span className="text-z-cyan-400 mr-2">▸</span>
                          <span className="text-z-text">{sp}</span>
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
                  DISCUSS YOUR ARCHITECTURAL CONSTRAINTS
                </div>
                <div className="text-xs text-z-muted font-body mt-0.5">
                  Schedule a technical discovery session with our systems engineers.
                </div>
              </div>

              <button
                onClick={onOpenProjectModal}
                className="z-btn-primary text-xs py-3 px-6 whitespace-nowrap"
              >
                <span>START A SYSTEM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
