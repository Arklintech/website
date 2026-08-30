import ArklintechWordmark from '@/components/brand/ArklintechWordmark';
'use client';

import React from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { ArrowRight, CheckCircle2, Shield, Layers, Clock, FileText } from 'lucide-react';

const OPERATING_PHASES = [
  {
    step: '01',
    title: 'Discovery & Systems Audit',
    description: 'We inspect current software assets, data topologies, operational bottlenecks, and user workflows to define precise technical requirements.',
    duration: '1–2 Weeks',
    deliverables: ['System Architecture Specification', 'Technical Scope Matrix', 'Risk & Dependency Map'],
  },
  {
    step: '02',
    title: 'Architecture & Protocol Design',
    description: 'We design the state machines, database schemas, API contracts, and high-fidelity interactive user interface prototypes.',
    duration: '2–3 Weeks',
    deliverables: ['Interactive Prototypes', 'Database Schemas & ERDs', 'API Contract Definitions'],
  },
  {
    step: '03',
    title: 'Precision Software Engineering',
    description: 'We construct production-grade software, backend microservices, and automated workflows using modern engineering practices.',
    duration: '4–12 Weeks',
    deliverables: ['Production Codebase', 'CI/CD Automated Pipelines', 'Staging Deployments'],
  },
  {
    step: '04',
    title: 'Integration & Live Validation',
    description: 'We connect existing third-party tools, migrate historical data, run stress tests, and train operational staff on the new platform.',
    duration: '1–3 Weeks',
    deliverables: ['Verified Data Migration', 'Benchmark Performance Reports', 'Operational Runbooks'],
  },
  {
    step: '05',
    title: 'Continuous Support & Evolution',
    description: 'We monitor live telemetry, optimize throughput, and provide ongoing architectural guidance as the organization scales.',
    duration: 'Ongoing',
    deliverables: ['99.99% SLA Monitoring', 'Real-Time Telemetry Dashboards', 'Quarterly System Evolution'],
  },
];

export default function WorkWithArklintechPage() {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            {/* Page Header */}
            <div className="max-w-3xl mb-12 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#0094F2] border border-white/[0.08] px-2 py-0.5 rounded bg-[#0D1527]">
                  12
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0066FF] font-semibold">
                  OPERATING MODEL & COLLABORATION
                </span>
              </div>
              <h1 className="text-display-l font-display font-bold text-white uppercase tracking-tight">
                WORK WITH <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: "0.1em" }} className="font-extrabold text-[#1463FF]"><span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span></span>
              </h1>
              <p className="text-base sm:text-lg text-[#94A3B8] font-body leading-relaxed">
                How we partner with founders, executive decision-makers, and technical teams. Predictable delivery phases, transparent communication, and 100% IP ownership.
              </p>
            </div>

            {/* Operating Model Phases */}
            <div className="space-y-6 mb-12">
              <div className="font-mono text-xs font-bold text-white uppercase tracking-widest pb-3 border-b border-white/[0.08]">
                THE ENGAGEMENT LIFECYCLE
              </div>

              <div className="space-y-4">
                {OPERATING_PHASES.map((phase) => (
                  <div
                    key={phase.step}
                    className="p-6 rounded-xl bg-[#0A0F1D] border border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#0094F2] bg-[#0D1527] px-2 py-0.5 rounded border border-white/[0.08]">
                          {phase.step}
                        </span>
                        <h2 className="font-display font-bold text-base sm:text-lg text-white uppercase">
                          {phase.title}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-[#F8FAFC] font-body leading-relaxed">
                        {phase.description}
                      </p>
                    </div>

                    <div className="lg:w-72 bg-[#0D1527] p-4 rounded-lg border border-white/[0.06] space-y-2 shrink-0 font-mono text-[10px]">
                      <div className="flex items-center justify-between text-[#64748B] border-b border-white/[0.06] pb-1">
                        <span>TIMEFRAME:</span>
                        <span className="text-[#1463FF] font-bold">{phase.duration}</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] uppercase block mb-1">DELIVERABLES:</span>
                        {phase.deliverables.map((del, i) => (
                          <div key={i} className="text-[#94A3B8] flex items-center gap-1 leading-tight mb-1">
                            <span className="text-[#0094F2]">▸</span>
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Expectations */}
            <div className="bg-[#0A0F1D] border border-white/[0.08] rounded-xl p-6 sm:p-8 space-y-6 mb-12">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="font-mono text-xs font-bold text-[#0094F2] uppercase tracking-widest">
                  WHAT YOU CAN EXPECT FROM <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: "0.1em" }} className="font-extrabold text-[#1463FF]"><span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span></span>
                </span>
                <span className="font-mono text-[9px] text-[#64748B] uppercase">GUARANTEES</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                <div className="p-4 rounded-lg bg-[#0D1527] border border-white/[0.06] space-y-1.5">
                  <div className="font-bold text-white text-sm">100% IP Ownership</div>
                  <p className="text-[11px] text-[#94A3B8] font-body leading-relaxed">
                    All source code, schemas, documentation, and database assets belong entirely to your company.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#0D1527] border border-white/[0.06] space-y-1.5">
                  <div className="font-bold text-white text-sm">Zero Fluff</div>
                  <p className="text-[11px] text-[#94A3B8] font-body leading-relaxed">
                    Heavy vocabulary paired with clear business meaning. Direct communication with senior architects.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#0D1527] border border-white/[0.06] space-y-1.5">
                  <div className="font-bold text-white text-sm">Deterministic Sprints</div>
                  <p className="text-[11px] text-[#94A3B8] font-body leading-relaxed">
                    Clear milestones, continuous automated tests, and live staging previews at every sprint conclusion.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#0D1527] border border-white/[0.06] space-y-1.5">
                  <div className="font-bold text-white text-sm">Dedicated Team</div>
                  <p className="text-[11px] text-[#94A3B8] font-body leading-relaxed">
                    Full-time dedicated senior software engineers and solution architects committed to your platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA Card */}
            <div className="p-8 sm:p-10 rounded-xl bg-gradient-to-r from-[#08162E] to-[#0A0F1D] border border-[#0066FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1 max-w-xl">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase">
                  Ready to architect your system?
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] font-body">
                  Submit your brief or connect directly with our engineering leadership to scope your engagement.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/start-a-system"
                  className="z-btn-primary text-xs py-3 px-6 shrink-0"
                >
                  <span>START A SYSTEM</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
