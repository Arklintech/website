'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Network,
  Terminal,
  Activity,
  Server,
  Lock,
} from 'lucide-react';
import { ProjectDossier } from '@/content/projects';

interface EngineeringDossierProps {
  project: ProjectDossier;
  onOpenProjectModal?: () => void;
}

type DossierViewMode = 'all' | 'business' | 'system' | 'engineering';

export default function EngineeringDossier({
  project,
  onOpenProjectModal,
}: EngineeringDossierProps) {
  const [activeTab, setActiveTab] = useState<DossierViewMode>('all');
  const d = project.dossier;

  // Guard: this component requires full dossier data
  if (!d) return null;

  return (
    <div className="w-full space-y-8">
      {/* Dossier Header & Overview */}
      <div className="bg-z-surface border border-z-border rounded-lg p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-z-border/70">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-z-cyan-400 bg-z-blue-900/60 px-2 py-0.5 rounded border border-z-blue-500/40 uppercase tracking-wider">
                VERIFIED ENGINEERING DOSSIER
              </span>
              <span className="font-mono text-xs text-z-dim uppercase">
                {project.systemType}
              </span>
            </div>
            <h1 className="text-display-m sm:text-display-l font-display font-bold text-z-white uppercase tracking-tight">
              {project.name}
            </h1>
            <p className="text-sm sm:text-base text-z-blue-200 font-body max-w-3xl mt-1">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenProjectModal}
              className="z-btn-primary text-xs py-2.5 px-5"
            >
              <span>ARCHITECT SIMILAR SYSTEM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Verified Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6">
          {(project.metrics ?? []).map((m: { label: string; value: string }, i: number) => (
            <div key={i} className="p-3.5 rounded bg-z-surface-2/80 border border-z-border">
              <div className="font-display font-bold text-lg sm:text-xl text-z-white">
                {m.value}
              </div>
              <div className="font-mono text-xs text-z-muted uppercase tracking-wider mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progressive Disclosure Filter Tabs */}
      <div className="flex items-center justify-between p-2 rounded bg-z-surface-2/70 border border-z-border font-mono text-xs">
        <span className="text-z-dim uppercase text-xs hidden sm:inline-block">
          PROGRESSIVE TECHNICAL DISCLOSURE:
        </span>
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
          {(['all', 'business', 'system', 'engineering'] as DossierViewMode[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded uppercase font-semibold text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] ${
                activeTab === tab
                  ? 'bg-z-blue-900/80 text-z-cyan-300 border border-z-blue-500/60 shadow-[0_0_12px_rgba(22,119,255,0.25)]'
                  : 'text-z-muted hover:text-z-white'
              }`}
            >
              {tab === 'all' ? 'FULL 10-STAGE DOSSIER' : `${tab} VIEW`}
            </button>
          ))}
        </div>
      </div>

      {/* 10-Point Engineering Dossier Grid */}
      <div className="space-y-6">
        {/* =========================================================
            STAGE 01 & 02: CONTEXT & CHALLENGE
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'business') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 01 CONTEXT */}
            <div className="p-6 rounded-lg bg-z-surface border border-z-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
                <span className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-wider">
                  {d.context.title}
                </span>
                <span className="font-mono text-xs text-z-dim uppercase">ENVIRONMENT</span>
              </div>
              <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                {d.context.content}
              </p>
              <div className="pt-2 font-mono text-xs text-z-dim space-y-1">
                <div>
                  <span className="text-z-muted">DOMAIN:</span> {d.context.environment}
                </div>
                <div>
                  <span className="text-z-muted">OPERATIONAL SCALE:</span> {d.context.scale}
                </div>
              </div>
            </div>

            {/* 02 CHALLENGE */}
            <div className="p-6 rounded-lg bg-z-surface border border-z-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
                <span className="font-mono text-xs font-bold text-z-blue-400 uppercase tracking-wider">
                  {d.challenge.title}
                </span>
                <span className="font-mono text-xs text-z-dim uppercase">FRICTION POINTS</span>
              </div>
              <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                {d.challenge.content}
              </p>
              <div className="space-y-1.5 pt-1">
                {d.challenge.frictionPoints.map((fp: string, i: number) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-z-muted font-body">
                    <span className="text-z-blue-400 font-mono">✕</span>
                    <span>{fp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            STAGE 03 & 04: OBJECTIVE & SYSTEM DESIGN
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'business' || activeTab === 'system') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 03 OBJECTIVE */}
            <div className="p-6 rounded-lg bg-z-surface border border-z-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
                <span className="font-mono text-xs font-bold text-z-cyan-300 uppercase tracking-wider">
                  {d.objective.title}
                </span>
                <span className="font-mono text-xs text-z-dim uppercase">TARGET STATE</span>
              </div>
              <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                {d.objective.content}
              </p>
              <div className="space-y-1.5 pt-1">
                {d.objective.keyGoals.map((kg: string, i: number) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-z-text font-body">
                    <CheckCircle2 className="w-3.5 h-3.5 text-z-cyan-400 shrink-0 mt-0.5" />
                    <span>{kg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 04 SYSTEM */}
            <div className="p-6 rounded-lg bg-z-surface border border-z-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
                <span className="font-mono text-xs font-bold text-z-blue-400 uppercase tracking-wider">
                  {d.system.title}
                </span>
                <span className="font-mono text-xs text-z-dim uppercase">ENGINEERED SOLUTION</span>
              </div>
              <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                {d.system.content}
              </p>
              <div className="space-y-1.5 pt-1">
                {d.system.coreComponents.map((cc: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-z-cyan-300 bg-z-surface-2 p-1.5 rounded border border-z-border">
                    <Layers className="w-3.5 h-3.5 text-z-blue-400" />
                    <span>{cc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            STAGE 05: ARCHITECTURE & DATA FLOW
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'system' || activeTab === 'engineering') && (
          <div className="p-6 sm:p-8 rounded-lg bg-z-surface border border-z-border space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
              <span className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Network className="w-4 h-4" />
                {d.architecture.title} — TECHNICAL DATAFLOW & TOPOLOGY
              </span>
              <span className="font-mono text-xs text-z-dim uppercase">SYSTEM TOPOLOGY</span>
            </div>

            <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
              {d.architecture.content}
            </p>

            {/* Architecture Node Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {d.architecture.diagramNodes.map((node: { name: string; type: string; role: string }, i: number) => (
                <div key={i} className="p-3.5 rounded bg-z-surface-2 border border-z-border space-y-1 relative">
                  <div className="font-mono text-xs text-z-cyan-400 uppercase font-bold">
                    {node.type}
                  </div>
                  <div className="font-semibold text-z-white text-xs font-mono">
                    {node.name}
                  </div>
                  <div className="text-xs text-z-muted font-body leading-tight">
                    {node.role}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded bg-z-surface-2/90 border border-z-border font-mono text-xs text-z-cyan-300 flex items-center justify-between">
              <span className="text-z-dim text-xs uppercase">FLOW SEQUENCE:</span>
              <span className="text-xs font-bold">{d.architecture.flowDescription}</span>
            </div>
          </div>
        )}

        {/* =========================================================
            STAGE 06: PRODUCT EXPERIENCE & INTERFACE
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'business' || activeTab === 'system') && (
          <div className="p-6 sm:p-8 rounded-lg bg-z-surface border border-z-border space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
              <span className="font-mono text-xs font-bold text-z-blue-400 uppercase tracking-wider">
                {d.experience.title} — USER INTERFACE & PRODUCT PRESENTATION
              </span>
              <span className="font-mono text-xs text-z-dim uppercase">OPERATIONAL UI</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-3">
                <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                  {d.experience.content}
                </p>
                <div className="space-y-2 pt-2">
                  {d.experience.interfaceHighlights.map((ih: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-z-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-z-cyan-400" />
                      <span>{ih}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Visual */}
              <div className="lg:col-span-6 relative h-56 sm:h-64 rounded bg-z-deep overflow-hidden border border-z-border">
                <Image
                  src={project.visual}
                  alt={project.name}
                  fill
                  sizes="50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            STAGE 07 & 08: INTELLIGENCE & SOFTWARE ENGINEERING
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'system' || activeTab === 'engineering') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 07 INTELLIGENCE */}
            <div className="p-6 rounded-lg bg-z-surface border border-z-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
                <span className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  {d.intelligence.title}
                </span>
                <span className="font-mono text-xs text-z-dim uppercase">AUTOMATED RULES</span>
              </div>
              <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                {d.intelligence.content}
              </p>
              <div className="space-y-1.5 pt-1">
                {d.intelligence.automationRules.map((ar: string, i: number) => (
                  <div key={i} className="p-2 rounded bg-z-surface-2 border border-z-border font-mono text-xs text-z-text">
                    <span className="text-z-cyan-400 mr-1.5">▸</span>
                    <span>{ar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 08 ENGINEERING */}
            <div className="p-6 rounded-lg bg-z-surface border border-z-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
                <span className="font-mono text-xs font-bold text-z-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  {d.engineering.title}
                </span>
                <span className="font-mono text-xs text-z-dim uppercase">ENGINEERING STANDARDS</span>
              </div>
              <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                {d.engineering.content}
              </p>
              <div className="space-y-1.5 pt-1">
                {d.engineering.technicalStandards.map((ts: string, i: number) => (
                  <div key={i} className="p-2 rounded bg-z-surface-2 border border-z-border font-mono text-xs text-z-text">
                    <CheckCircle2 className="w-3.5 h-3.5 text-z-blue-400 inline mr-1.5" />
                    <span>{ts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            STAGE 09 & 10: OUTCOME & TECHNOLOGY STACK
            ========================================================= */}
        {(activeTab === 'all' || activeTab === 'business' || activeTab === 'engineering') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 09 OUTCOME */}
            <div className="p-6 rounded-lg bg-emerald-950/20 border border-emerald-500/40 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  {d.outcome.title} — VERIFIED IMPACT
                </span>
                <span className="font-mono text-xs text-emerald-300 uppercase">MEASURED RESULT</span>
              </div>
              <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed font-medium">
                {d.outcome.content}
              </p>
              <div className="space-y-1.5 pt-1">
                {d.outcome.verifiedImpact.map((vi: string, i: number) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-z-text font-body">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{vi}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 10 TECHNOLOGY */}
            <div className="p-6 rounded-lg bg-z-surface border border-z-border space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
                <span className="font-mono text-xs font-bold text-z-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  {d.technology.title} — STACK & INFRASTRUCTURE
                </span>
                <span className="font-mono text-xs text-z-dim uppercase">COMPONENTS</span>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-z-dim block mb-1">
                  CORE SOFTWARE STACK
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {d.technology.stack.map((st: string) => (
                    <span key={st} className="px-2 py-0.5 rounded bg-z-surface-2 border border-z-border text-z-blue-300 font-semibold">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-z-dim block mb-1">
                  ENTERPRISE INTEGRATIONS
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {d.technology.integrations.map((it: string) => (
                    <span key={it} className="px-2 py-0.5 rounded bg-z-surface-2 border border-z-border text-z-text">
                      {it}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-z-dim block mb-1">
                  DEPLOYMENT INFRASTRUCTURE
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {d.technology.infrastructure.map((inf: string) => (
                    <span key={inf} className="px-2 py-0.5 rounded bg-z-surface-2 border border-z-border text-z-muted">
                      {inf}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final Action Bar */}
      <div className="p-6 rounded-lg bg-z-surface-2 border border-z-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-display font-semibold text-base text-z-white uppercase">
            READY TO ARCHITECT A SYSTEM FOR YOUR ORGANIZATION?
          </div>
          <div className="text-xs text-z-muted font-body mt-0.5">
            Discuss your requirements with our systems architecture team.
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenProjectModal}
          className="z-btn-primary text-xs py-3 px-6 whitespace-nowrap"
        >
          <span>BUILD SOMETHING SIMILAR</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
