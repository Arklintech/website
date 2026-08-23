'use client';

import React, { useState } from 'react';
import Section from '@/components/layout/Section';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import ProcessDiagram from './ProcessDiagram';
import { PROCESS_STEPS } from '@/content/process';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = PROCESS_STEPS[activeStep];

  return (
    <Section id="process" number="03">
      <PageContainer>
        <SectionHeader
          number="03"
          title="HOW WE BUILD"
          subtitle="A disciplined systems engineering methodology that transforms operational complexity into scalable architectures."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Workflow Process Visual Diagram & Active Stage Detail (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <ProcessDiagram activeStep={activeStep} onStepSelect={setActiveStep} />

            {/* Active Stage Detailed Breakdown Panel */}
            <div className="p-6 rounded-lg bg-z-surface border border-z-border shadow-xl">
              <div className="flex items-center justify-between border-b border-z-border/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-z-blue-400 border border-z-blue-500/40 px-2 py-0.5 rounded bg-z-blue-950/40">
                    STAGE {currentStep.number}
                  </span>
                  <h4 className="font-mono text-sm font-semibold text-z-white uppercase tracking-wider">
                    {currentStep.title}
                  </h4>
                </div>
                <span className="font-mono text-[10px] text-z-dim uppercase">
                  METHODOLOGY
                </span>
              </div>

              <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed mb-4">
                {currentStep.details}
              </p>

              <div className="p-3 rounded bg-z-surface-2/60 border border-z-border/60 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-z-blue-400 font-semibold block mb-1">
                  SYSTEMIC ROLE:
                </span>
                <p className="text-xs text-z-muted font-body leading-snug">
                  {currentStep.systemRole}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-z-dim block mb-1.5 font-semibold">
                    INPUT ARTIFACTS:
                  </span>
                  <div className="space-y-1">
                    {currentStep.inputs.map((inp) => (
                      <div key={inp} className="flex items-center gap-1.5 font-mono text-[10px] text-z-muted">
                        <span className="w-1 h-1 rounded-full bg-z-blue-400" />
                        <span>{inp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-z-blue-400 block mb-1.5 font-semibold">
                    OUTPUT DELIVERABLES:
                  </span>
                  <div className="space-y-1">
                    {currentStep.outputs.map((out) => (
                      <div key={out} className="flex items-center gap-1.5 font-mono text-[10px] text-z-white font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6-Stage Process Hierarchy Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <div className="mb-6">
              <span className="font-mono text-xs text-z-blue-400 font-semibold tracking-widest uppercase block mb-1">
                SYSTEMS ENGINEERING LIFECYCLE
              </span>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-z-white uppercase">
                ENGINEERED FOR PREDICTABLE OUTCOMES.
              </h3>
              <p className="mt-2 text-sm text-z-muted font-body max-w-xl leading-relaxed">
                A 6-phase lifecycle that turns operational friction into resilient software and autonomous systems.
              </p>
            </div>

            {/* 6 Steps Grid (2 Columns x 3 Rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
              {PROCESS_STEPS.map((step, index) => {
                const isActive = index === activeStep;

                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      'p-4 rounded border transition-all duration-200 cursor-pointer text-left group',
                      isActive
                        ? 'bg-z-surface-2 border-z-blue-400 shadow-[0_0_15px_rgba(20,155,255,0.25)]'
                        : 'bg-z-surface/60 border-z-border/80 hover:border-z-border-bright hover:bg-z-surface'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={cn(
                          'font-mono text-xs font-bold tracking-wider',
                          isActive ? 'text-z-blue-400' : 'text-z-dim group-hover:text-z-muted'
                        )}
                      >
                        {step.number} {step.title}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-z-blue-400 animate-pulse" />
                      )}
                    </div>

                    <div className="font-mono text-[10px] text-z-blue-300/90 mb-1 font-medium">
                      {step.tagline}
                    </div>

                    <p className="text-xs text-z-muted font-body leading-relaxed line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
