'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectInquiryModal({ isOpen, onClose }: ProjectInquiryModalProps) {
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });

  if (!isOpen) return null;

  const toggleCapability = (cap: string) => {
    if (selectedCapabilities.includes(cap)) {
      setSelectedCapabilities(selectedCapabilities.filter((c) => c !== cap));
    } else {
      setSelectedCapabilities([...selectedCapabilities, cap]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-z-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-z-surface border border-z-border rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-z-surface-2 text-z-muted hover:text-z-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-z-blue-400 animate-pulse" />
              <span className="font-mono text-xs text-z-blue-400 font-semibold tracking-widest uppercase">
                SYSTEM ARCHITECTURE INQUIRY
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-semibold text-z-white">
              START A PROJECT WITH ZAQVORO
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-z-muted font-body">
              Provide your project requirements. Our engineering team will review your system specs and respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                {/* Capability selector */}
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-2 font-semibold">
                    SELECT REQUIRED CAPABILITIES
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      'AI & Intelligence',
                      'Software & Platforms',
                      'Automation',
                      'Business Systems',
                    ].map((cap) => {
                      const isSelected = selectedCapabilities.includes(cap);
                      return (
                        <button
                          type="button"
                          key={cap}
                          onClick={() => toggleCapability(cap)}
                          className={`p-2 rounded border text-[11px] font-mono transition-colors text-center ${
                            isSelected
                              ? 'bg-z-blue-900/80 border-z-blue-400 text-z-white font-semibold'
                              : 'bg-z-surface-2 border-z-border text-z-dim hover:text-z-text'
                          }`}
                        >
                          {cap}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-sm text-z-white focus:outline-none focus:border-z-blue-400 font-body"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                      WORK EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@enterprise.com"
                      className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-sm text-z-white focus:outline-none focus:border-z-blue-400 font-body"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                    COMPANY / ORGANIZATION
                  </label>
                  <input
                    type="text"
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    placeholder="Apex Technologies Inc."
                    className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-sm text-z-white focus:outline-none focus:border-z-blue-400 font-body"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-z-dim mb-1 font-semibold">
                    PROJECT SPECIFICATIONS & OBJECTIVES
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formState.details}
                    onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                    placeholder="Briefly describe the software, intelligence layer, or business system you want to engineer..."
                    className="w-full px-3 py-2 rounded bg-z-surface-2 border border-z-border text-sm text-z-white focus:outline-none focus:border-z-blue-400 font-body resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-z-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-z-dim">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-BIT ENCRYPTED INTAKE</span>
                </div>

                <button type="submit" className="z-btn-primary text-xs">
                  <span>DISPATCH SYSTEM BRIEF</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/50 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-semibold text-z-white">
              SYSTEM INTAKE CONFIRMED
            </h3>
            <p className="text-sm text-z-muted font-body max-w-md mx-auto">
              Thank you, <span className="text-z-white">{formState.name}</span>. Your project parameters have been routed to our principal systems architects. We will initiate contact shortly.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="z-btn-secondary text-xs"
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
