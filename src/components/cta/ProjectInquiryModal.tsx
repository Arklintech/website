import KeystoneLogo from '@/components/brand/KeystoneLogo';
import ArklintechWordmark from '@/components/brand/ArklintechWordmark';
'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectInquiryModal({ isOpen, onClose }: ProjectInquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Commerce',
    service: 'AI & Intelligence',
    requirement: '',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setErrorMessage('');
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsSubmitting(false);
        setSubmitted(true);
      } else {
        setIsSubmitting(false);
        setErrorMessage(json.errors?.join(' ') || json.error || 'Failed to submit inquiry. Please verify your entries.');
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage('Network connection error. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#0D131F] border border-[#1E2838] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto text-white">
        <button
          onClick={onClose}
          aria-label="Close project inquiry dialog"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/70 hover:text-white transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF]"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1463FF] animate-pulse" />
              <span className="font-mono text-xs text-[#1463FF] font-semibold tracking-widest uppercase">
                SYSTEM ARCHITECTURE INTAKE
              </span>
            </div>

            <h2 id="inquiry-modal-title" className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white" style={{ fontFamily: "'Syncopate', sans-serif" }}>
              START A SYSTEM WITH <span className="text-[#1463FF]">ARKLINTECH</span>
            </h2>

            <p className="text-xs text-white/60 font-mono mt-1 mb-6">
              Production Architecture. Rapid Deployment. Direct Engineering Partnership.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1 font-bold">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1 font-bold">
                    ORGANIZATION / COMPANY
                  </label>
                  <input
                    type="text"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    placeholder="e.g. Apex Health Systems"
                    className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1 font-bold">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="elena@apexhealth.com"
                    className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1 font-bold">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1 font-bold">
                    INDUSTRY DOMAIN
                  </label>
                  <select
                    value={formState.industry}
                    onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
                    className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  >
                    <option value="Commerce & Retail">Commerce & Retail</option>
                    <option value="Education & Institutions">Education & Institutions</option>
                    <option value="Hospitality & Foodservice">Hospitality & Foodservice</option>
                    <option value="Healthcare & Clinical Systems">Healthcare & Clinical Systems</option>
                    <option value="Non-Profit & Civic Organizations">Non-Profit & Civic Organizations</option>
                    <option value="Enterprise Software">Enterprise Software</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1 font-bold">
                    PRIMARY SERVICE CAPABILITY
                  </label>
                  <select
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-colors"
                  >
                    <option value="AI & Intelligence Systems">AI & Intelligence Systems</option>
                    <option value="Full-Stack Custom Platforms">Full-Stack Custom Platforms</option>
                    <option value="Operations & Workflow Automation">Operations & Workflow Automation</option>
                    <option value="Lead Management & CRM Engines">Lead Management & CRM Engines</option>
                    <option value="High-Performance 3D & Web Experiences">High-Performance 3D & Web Experiences</option>
                    <option value="Search & Discovery Infrastructure">Search & Discovery Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1 font-bold">
                  PROJECT SPECIFICATION & OPERATIONAL REQUIREMENTS *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.requirement}
                  onChange={(e) => setFormState({ ...formState, requirement: e.target.value })}
                  placeholder="Describe your current bottlenecks, target workflow requirements, data integration needs, or architectural goals..."
                  className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-xl p-3 text-xs text-white placeholder-white/20 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-BIT ENCRYPTED INTAKE</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#1463FF] hover:bg-[#004AD6] text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#1463FF]/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'DISPATCHING TO ARCHITECTS...' : 'DISPATCH SYSTEM BRIEF'}</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Locked 3-Step Confirmation Screen */
          <div className="p-8 text-center space-y-6 my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-[#1463FF]/20 border border-[#1463FF] mx-auto flex items-center justify-center text-[#1463FF] shadow-[0_0_25px_rgba(20,99,255,0.4)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <span className="font-mono text-xs text-[#1463FF] font-bold tracking-widest uppercase">
                ENQUIRY LOGGED TO DATABASE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase mt-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                WE&apos;VE RECEIVED YOUR REQUIREMENT.
              </h2>
              <p className="text-xs sm:text-sm text-white/60 font-mono mt-1">
                AN ARKLINTECH SYSTEMS ARCHITECT WILL CONTACT YOU WITHIN 24 HOURS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2 max-w-lg mx-auto">
              <div className="p-3.5 rounded-xl bg-[#070B12] border border-[#1E2838]">
                <span className="font-mono text-[10px] font-bold text-[#1463FF] block mb-0.5">
                  01 — ARCHITECT REVIEW
                </span>
                <p className="text-xs text-white/60">Our senior team analyzes system complexity and integration points.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#070B12] border border-[#1E2838]">
                <span className="font-mono text-[10px] font-bold text-sky-400 block mb-0.5">
                  02 — DIRECT CONTACT
                </span>
                <p className="text-xs text-white/60">We reach out via email or phone to align on constraints.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#070B12] border border-[#1E2838]">
                <span className="font-mono text-[10px] font-bold text-emerald-400 block mb-0.5">
                  03 — SYSTEM BLUEPRINT
                </span>
                <p className="text-xs text-white/60">We formulate the technical execution strategy and deployment roadmap.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl border border-[#1E2838] bg-[#070B12] hover:bg-white/5 font-mono text-xs font-bold text-white transition-all"
              >
                RETURN TO SYSTEM
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
