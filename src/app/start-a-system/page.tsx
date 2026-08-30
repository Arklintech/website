'use client';

import React, { useState } from 'react';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { ArrowRight, CheckCircle2, ShieldCheck, Send, Sparkles } from 'lucide-react';

export default function StartASystemPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Commerce',
    service: 'AI & Intelligence',
    requirement: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  return (
    <PageShell>
      {() => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            <div className="max-w-3xl mb-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-z-cyan-400 border border-z-border px-2 py-0.5 rounded bg-z-surface-2">
                  13
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-z-blue-400 font-semibold">
                  SYSTEM INITIATION
                </span>
              </div>
              <h1 className="text-display-l font-display font-bold text-z-white uppercase tracking-tight">
                START A SYSTEM
              </h1>
              <p className="text-base sm:text-lg text-z-muted font-body leading-relaxed">
                Provide your requirements below. Our principal systems architects will review your parameters and initiate contact within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 3-Step Protocol & Expectations (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-lg bg-z-surface border border-z-border space-y-4">
                  <div className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-widest pb-2 border-b border-z-border">
                    INTAKE & REVIEW PROTOCOL
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-z-cyan-400 bg-z-surface-2 px-2 py-0.5 rounded border border-z-border">
                        01
                      </span>
                      <div>
                        <div className="font-mono text-xs font-bold text-z-white uppercase">
                          REVIEW
                        </div>
                        <p className="text-xs text-z-muted mt-0.5">
                          Our team reviews your system architecture requirement.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-z-blue-400 bg-z-surface-2 px-2 py-0.5 rounded border border-z-border">
                        02
                      </span>
                      <div>
                        <div className="font-mono text-xs font-bold text-z-white uppercase">
                          CONTACT
                        </div>
                        <p className="text-xs text-z-muted mt-0.5">
                          We reach out within 24 hours with architectural feedback.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-z-cyan-300 bg-z-surface-2 px-2 py-0.5 rounded border border-z-border">
                        03
                      </span>
                      <div>
                        <div className="font-mono text-xs font-bold text-z-white uppercase">
                          DISCOVERY
                        </div>
                        <p className="text-xs text-z-muted mt-0.5">
                          We discuss constraints and determine the appropriate direction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-z-surface-2/60 border border-z-border space-y-2 font-mono text-xs">
                  <div className="text-z-white font-bold uppercase">CONFIDENTIALITY GUARANTEE</div>
                  <p className="text-[11px] text-z-muted leading-relaxed font-body">
                    All specifications, diagrams, and project parameters submitted are protected under strict professional confidentiality. Zero spam, zero unqualified sales calls.
                  </p>
                </div>
              </div>

              {/* Right Column: Public Intake Form (7 cols) */}
              <div className="lg:col-span-7 bg-z-surface border border-z-border rounded-lg p-6 sm:p-8 relative">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-z-border/70">
                      <span className="font-mono text-xs text-z-cyan-300 font-semibold tracking-widest uppercase flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        SYSTEM ARCHITECTURE INQUIRY
                      </span>
                      <span className="font-mono text-[9px] text-z-dim uppercase">STAGE 01 INTAKE</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                          FULL NAME <span className="text-z-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Alex Mercer"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-xs sm:text-sm text-z-white focus:outline-none focus:border-z-cyan-400 font-body"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                          COMPANY NAME <span className="text-z-cyan-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Apex Systems Inc."
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-xs sm:text-sm text-z-white focus:outline-none focus:border-z-cyan-400 font-body"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                          WORK EMAIL <span className="text-z-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@enterprise.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-xs sm:text-sm text-z-white focus:outline-none focus:border-z-cyan-400 font-body"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                          PHONE / WHATSAPP
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-xs sm:text-sm text-z-white focus:outline-none focus:border-z-cyan-400 font-body"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                          INDUSTRY
                        </label>
                        <select
                          value={formState.industry}
                          onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-xs text-z-white focus:outline-none focus:border-z-cyan-400 font-mono"
                        >
                          <option value="Commerce">Commerce & Retail</option>
                          <option value="Education">Education & Institutions</option>
                          <option value="Hospitality">Hospitality & POS</option>
                          <option value="Healthcare">Healthcare & Bio</option>
                          <option value="Finance">Financial Services</option>
                          <option value="Other">Other Enterprise</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                          SERVICE / AREA OF INTEREST
                        </label>
                        <select
                          value={formState.service}
                          onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-xs text-z-white focus:outline-none focus:border-z-cyan-400 font-mono"
                        >
                          <option value="AI & Intelligence">AI & Intelligence</option>
                          <option value="Software & Platforms">Software & Platforms</option>
                          <option value="Automation & Orchestration">Automation & Orchestration</option>
                          <option value="Business Systems">Business Systems</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                        BRIEF REQUIREMENT / PROBLEM <span className="text-z-cyan-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Describe the system, platform, or operational workflow you need to build, connect, automate, or modernize..."
                        value={formState.requirement}
                        onChange={(e) => setFormState({ ...formState, requirement: e.target.value })}
                        className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-xs sm:text-sm text-z-white focus:outline-none focus:border-z-cyan-400 font-body resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-z-dim">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>256-BIT ENCRYPTED INTAKE</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="z-btn-primary text-xs py-2.5 px-6 self-start sm:self-auto disabled:opacity-50"
                      >
                        <span>{isSubmitting ? 'TRANSMITTING...' : 'DISPATCH INQUIRY'}</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Branded Confirmation State */
                  <div className="p-6 sm:p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 rounded-full bg-z-blue-900/60 border border-z-cyan-400 mx-auto flex items-center justify-center text-z-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.4)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <span className="font-mono text-xs text-z-cyan-300 font-bold tracking-widest uppercase">
                        ENQUIRY RECEIVED
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-z-white uppercase mt-1">
                        WE&apos;VE RECEIVED YOUR REQUIREMENT.
                      </h2>
                      <p className="text-xs sm:text-sm text-z-blue-200 font-mono mt-1">
                        OUR TEAM WILL CONTACT YOU WITHIN 24 HOURS.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2 max-w-lg mx-auto">
                      <div className="p-3.5 rounded bg-z-surface-2 border border-z-border">
                        <span className="font-mono text-[10px] font-bold text-z-cyan-400 block mb-0.5">
                          01 — REVIEW
                        </span>
                        <p className="text-xs text-z-muted">Our team reviews your requirement.</p>
                      </div>
                      <div className="p-3.5 rounded bg-z-surface-2 border border-z-border">
                        <span className="font-mono text-[10px] font-bold text-z-blue-400 block mb-0.5">
                          02 — CONTACT
                        </span>
                        <p className="text-xs text-z-muted">We contact you within 24 hours.</p>
                      </div>
                      <div className="p-3.5 rounded bg-z-surface-2 border border-z-border">
                        <span className="font-mono text-[10px] font-bold text-z-cyan-300 block mb-0.5">
                          03 — DISCOVERY
                        </span>
                        <p className="text-xs text-z-muted">We determine the appropriate direction.</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="z-btn-secondary text-xs"
                      >
                        SUBMIT ANOTHER REQUIREMENT
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
