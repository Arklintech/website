'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { ShieldCheck, CheckCircle2, Send, Sparkles } from 'lucide-react';

interface HomeStartSectionProps {
  onOpenProjectModal?: () => void;
}

export default function HomeStartSection({ onOpenProjectModal }: HomeStartSectionProps) {
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
    <section id="start-a-system" className="py-16 sm:py-20 md:py-24 border-b border-[#D8D4C9] bg-[#F5F1E8] relative">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & 3-Step Protocol */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#1463FF] border border-[#D8D4C9] px-2 py-0.5 rounded bg-[#EDF4FF]">
                03
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1463FF] font-bold">
                SYSTEM INTAKE
              </span>
            </div>

            <h2 className="text-display-m font-display font-bold text-[#111827] uppercase tracking-tight">
              TELL US WHAT THE SYSTEM NEEDS TO DO.
            </h2>

            <p className="text-sm text-[#536070] font-body leading-relaxed">
              Describe the operation, product, workflow or technical constraint you are trying to address. We begin with the problem before discussing implementation.
            </p>

            {/* 3-Step Execution Protocol */}
            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-lg bg-white border border-[#D8D4C9] flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-[#1463FF] bg-[#EDF4FF] px-2 py-0.5 rounded border border-[#D8D4C9]">
                  01
                </span>
                <div>
                  <div className="font-mono text-xs font-bold text-[#111827] uppercase">
                    REVIEW
                  </div>
                  <div className="text-xs text-[#768494] mt-0.5">
                    Our team reviews your system architecture requirement.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D8D4C9] flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-[#1463FF] bg-[#EDF4FF] px-2 py-0.5 rounded border border-[#D8D4C9]">
                  02
                </span>
                <div>
                  <div className="font-mono text-xs font-bold text-[#111827] uppercase">
                    CONTACT
                  </div>
                  <div className="text-xs text-[#768494] mt-0.5">
                    We reach out within 24 hours with architectural feedback.
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D8D4C9] flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-[#1463FF] bg-[#EDF4FF] px-2 py-0.5 rounded border border-[#D8D4C9]">
                  03
                </span>
                <div>
                  <div className="font-mono text-xs font-bold text-[#111827] uppercase">
                    DISCOVERY
                  </div>
                  <div className="text-xs text-[#768494] mt-0.5">
                    We discuss technical boundaries and determine the appropriate direction.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Short Public Intake Form or Confirmation */}
          <div className="lg:col-span-7 bg-white border border-[#D8D4C9] rounded-xl p-6 sm:p-8 relative">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D8D4C9]">
                  <span className="font-mono text-xs text-[#1463FF] font-semibold tracking-wider uppercase flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    PUBLIC SYSTEM BRIEF INTAKE
                  </span>
                  <span className="font-mono text-xs text-[#768494] uppercase">24H RESPONSE SLA</span>
                </div>

                {/* Form Controls - Issue 27 Fix: Accessible htmlFor, id, space-y-2, legible labels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="intake-full-name"
                      className="block font-mono text-xs uppercase tracking-wider text-[#536070] font-semibold"
                    >
                      FULL NAME <span className="text-[#1463FF]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="intake-full-name"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9] text-xs sm:text-sm text-[#111827] placeholder:text-[#768494] focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] font-body transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="intake-company"
                      className="block font-mono text-xs uppercase tracking-wider text-[#536070] font-semibold"
                    >
                      COMPANY NAME <span className="text-[#1463FF]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="intake-company"
                      name="company"
                      type="text"
                      required
                      placeholder="Apex Systems Inc."
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9] text-xs sm:text-sm text-[#111827] placeholder:text-[#768494] focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] font-body transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="intake-email"
                      className="block font-mono text-xs uppercase tracking-wider text-[#536070] font-semibold"
                    >
                      WORK EMAIL <span className="text-[#1463FF]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="intake-email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@enterprise.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9] text-xs sm:text-sm text-[#111827] placeholder:text-[#768494] focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] font-body transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="intake-phone"
                      className="block font-mono text-xs uppercase tracking-wider text-[#536070] font-semibold"
                    >
                      PHONE / WHATSAPP
                    </label>
                    <input
                      id="intake-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9] text-xs sm:text-sm text-[#111827] placeholder:text-[#768494] focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] font-body transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="intake-industry"
                      className="block font-mono text-xs uppercase tracking-wider text-[#536070] font-semibold"
                    >
                      INDUSTRY
                    </label>
                    <select
                      id="intake-industry"
                      name="industry"
                      value={formState.industry}
                      onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9] text-xs text-[#111827] focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] font-mono transition-colors"
                    >
                      <option value="Commerce">Commerce & Retail</option>
                      <option value="Education">Education & Institutions</option>
                      <option value="Hospitality">Hospitality & POS</option>
                      <option value="Healthcare">Healthcare & Bio</option>
                      <option value="Finance">Financial Services</option>
                      <option value="Other">Other Enterprise</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="intake-service"
                      className="block font-mono text-xs uppercase tracking-wider text-[#536070] font-semibold"
                    >
                      SERVICE / AREA OF INTEREST
                    </label>
                    <select
                      id="intake-service"
                      name="service"
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9] text-xs text-[#111827] focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] font-mono transition-colors"
                    >
                      <option value="AI & Intelligence">AI & Intelligence</option>
                      <option value="Software & Platforms">Software & Platforms</option>
                      <option value="Automation & Orchestration">Automation & Orchestration</option>
                      <option value="Business Systems">Business Systems</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="intake-requirement"
                    className="block font-mono text-xs uppercase tracking-wider text-[#536070] font-semibold"
                  >
                    BRIEF REQUIREMENT / PROBLEM <span className="text-[#1463FF]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="intake-requirement"
                    name="requirement"
                    rows={3}
                    required
                    placeholder="Describe what you are looking to build, connect, automate or modernize..."
                    value={formState.requirement}
                    onChange={(e) => setFormState({ ...formState, requirement: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9] text-xs sm:text-sm text-[#111827] placeholder:text-[#768494] focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] font-body resize-none transition-colors"
                  />
                </div>

                {/* Issue 19 Fix: Closely grouped confidentiality & submit CTA */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#536070]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>STRICT CONFIDENTIALITY & ZERO SPAM</span>
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
              /* Confirmation Screen */
              <div className="p-4 sm:p-6 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-[#EDF4FF] border border-[#1677FF] mx-auto flex items-center justify-center text-[#1463FF] shadow-[0_0_25px_rgba(22,119,255,0.4)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <span className="font-mono text-xs text-[#1463FF] font-bold tracking-wider uppercase">
                    ENQUIRY RECEIVED
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#111827] uppercase mt-1">
                    WE&apos;VE RECEIVED YOUR REQUIREMENT.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#536070] font-mono mt-1">
                    OUR TEAM WILL CONTACT YOU WITHIN 24 HOURS.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left pt-2 max-w-lg mx-auto">
                  <div className="p-3 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60">
                    <span className="font-mono text-xs font-bold text-[#1463FF] block mb-0.5">
                      01 — REVIEW
                    </span>
                    <p className="text-xs text-[#536070]">Our team reviews your requirement.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60">
                    <span className="font-mono text-xs font-bold text-[#1463FF] block mb-0.5">
                      02 — CONTACT
                    </span>
                    <p className="text-xs text-[#536070]">We contact you within 24 hours.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60">
                    <span className="font-mono text-xs font-bold text-[#1463FF] block mb-0.5">
                      03 — DISCOVERY
                    </span>
                    <p className="text-xs text-[#536070]">We determine the appropriate direction.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="z-btn-secondary text-xs"
                  >
                    SEND ANOTHER REQUIREMENT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
