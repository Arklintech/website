'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Briefcase, CheckCircle2, Clock, Calendar, ArrowRight, ArrowUpRight,
  TrendingUp, Layers, Check, Edit3, MoreHorizontal, Upload, FileText,
  FileCode, ExternalLink, Plus, Trash2, Receipt, Shield, DollarSign,
  Search, Bell, ChevronDown, Sparkles
} from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';
import type { ProjectRecord, ProjectMilestoneRecord, ProjectUpdateRecord, ProjectFileRecord, ProjectNoteRecord, InvoiceRecord } from '@/lib/admin-db';

const TABS = [
  { id: 'overview', label: 'Overview', icon: <Layers className="w-4 h-4" /> },
  { id: 'milestones', label: 'Milestones', icon: <CheckCircle2 className="w-4 h-4" /> },
  { id: 'updates', label: 'Updates', icon: <Clock className="w-4 h-4" /> },
  { id: 'files', label: 'Files', icon: <FileText className="w-4 h-4" /> },
  { id: 'billing', label: 'Billing', icon: <Receipt className="w-4 h-4" /> },
  { id: 'notes', label: 'Notes', icon: <Bell className="w-4 h-4" /> },
];

export default function ProjectWorkspacePage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'updates' | 'files' | 'billing' | 'notes'>('overview');

  // Progress Control state
  const [progressSlider, setProgressSlider] = useState<number>(65);
  const [selectedStage, setSelectedStage] = useState<string>('Admin Panel');
  const [updateNotes, setUpdateNotes] = useState<string>('Website completed. Currently developing Admin Panel.');
  const [updatingProgress, setUpdatingProgress] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Status state
  const [projectStatus, setProjectStatus] = useState<string>('ACTIVE');

  // Modal states
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ title: '', description: '', dueDate: '', status: 'PENDING' });
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // File upload state
  const [uploadingFile, setUploadingFile] = useState(false);

  const loadProject = async () => {
    try {
      setLoading(true);
      const res = await fetchAdmin(`/api/admin/projects/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        const p = data.data;
        setProject(p);
        setProgressSlider(p.progress || 0);
        setSelectedStage(p.currentStage || 'Planning');
        setProjectStatus(p.status || 'ACTIVE');
      }
    } catch (err) {
      console.error('Failed to load project details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [params.id]);

  const handleUpdateProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUpdatingProgress(true);
      const res = await fetchAdmin(`/api/admin/projects/${params.id}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          progress: progressSlider,
          stage: selectedStage,
          notes: updateNotes,
          author: 'Anas (Lead)',
        }),
      });

      if (res.ok) {
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 2500);
        await loadProject();
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    } finally {
      setUpdatingProgress(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setProjectStatus(newStatus);
    try {
      await fetchAdmin(`/api/admin/projects/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      await loadProject();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestone.title) return;
    try {
      const res = await fetchAdmin(`/api/admin/projects/${params.id}/milestones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMilestone),
      });
      if (res.ok) {
        setShowMilestoneModal(false);
        setNewMilestone({ title: '', description: '', dueDate: '', status: 'PENDING' });
        await loadProject();
      }
    } catch (err) {
      console.error('Failed to create milestone:', err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.content) return;
    try {
      const res = await fetchAdmin(`/api/admin/projects/${params.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      });
      if (res.ok) {
        setShowNoteModal(false);
        setNewNote({ title: '', content: '' });
        await loadProject();
      }
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadingFile(true);
      const res = await fetchAdmin(`/api/admin/projects/${params.id}/files`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        await loadProject();
      }
    } catch (err) {
      console.error('Failed to upload file:', err);
    } finally {
      setUploadingFile(false);
      e.target.value = '';
    }
  };

  if (!project) {
    if (loading) {
      return (
        <div className="p-6 max-w-[1280px] mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-[#E8E4DC] rounded" />
            <div className="h-40 bg-white rounded-xl border border-[#E8E4DC]" />
          </div>
        </div>
      );
    }
    return (
      <div className="p-12 max-w-[1280px] mx-auto text-center space-y-4">
        <h2 className="text-base font-bold text-[#0B132B]">Project Not Found</h2>
        <Link href="/admin/projects" className="text-xs font-mono font-bold text-[#1463FF]">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const stages = project.stages || [
    { id: 'stg_1', name: 'Planning', description: 'Requirements and initial discussion', order: 1, status: 'COMPLETED' },
    { id: 'stg_2', name: 'Design', description: 'UI/UX design and prototyping', order: 2, status: 'COMPLETED' },
    { id: 'stg_3', name: 'Website', description: 'Website development', order: 3, status: 'COMPLETED' },
    { id: 'stg_4', name: 'Admin Panel', description: 'Dashboard and management system', order: 4, status: 'ACTIVE' },
    { id: 'stg_5', name: 'POS Integration', description: 'POS system integration', order: 5, status: 'PENDING' },
    { id: 'stg_6', name: 'Testing', description: 'Testing and quality assurance', order: 6, status: 'PENDING' },
    { id: 'stg_7', name: 'Deployment', description: 'Live deployment and handover', order: 7, status: 'PENDING' },
  ];

  return (
    <div className="p-6 max-w-[1280px] mx-auto space-y-6">
      {/* Top Header Breadcrumb & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
          <Link href="/admin/projects" className="hover:text-[#1463FF] transition-colors">Projects</Link>
          <span>/</span>
          <span className="font-bold text-[#0B132B]">{project.name}</span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, clients..."
              className="bg-white border border-[#E8E4DC] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0B132B] w-56 focus:outline-none focus:border-[#1463FF]"
            />
          </div>
          <button className="p-2 rounded-xl bg-white border border-[#E8E4DC] text-[#64748B] hover:text-[#0B132B]">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0B132B] text-white flex items-center justify-center font-bold text-xs">
            AA
          </div>
        </div>
      </div>

      {/* Project Identity Header Card (Matching Reference 1) */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Thumbnail & Project Meta */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#0B132B] border border-[#E8E4DC] shrink-0 relative flex items-center justify-center shadow-inner">
              <img
                src="/visuals/work/cafe-digital.png"
                alt="Project Thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to Keystone Logo
                  (e.target as HTMLImageElement).src = '/brand/Arklintech_Keystone_logo.svg';
                }}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {project.status || 'Active'}
                </span>
              </div>
              <h1 className="font-black text-2xl text-[#0B132B] tracking-tight">
                {project.name}
              </h1>
              <p className="text-xs text-[#64748B] font-medium">
                {project.projectType ? `${project.projectType} & Automations` : 'Website, Admin Panel, POS Integration & Automations'}
              </p>

              {/* Meta tags row */}
              <div className="flex items-center gap-4 flex-wrap pt-2 text-xs font-mono text-[#64748B]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#94A3B8]">Client:</span>
                  <strong className="text-[#0B132B]">{project.clientName}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#94A3B8]">Start Date:</span>
                  <strong className="text-[#0B132B]">{project.startDate || '01 Aug 2026'}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#94A3B8]">Target Date:</span>
                  <strong className="text-[#0B132B]">{project.targetDate || '30 Nov 2026'}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#94A3B8]">Project Ref:</span>
                  <strong className="text-[#0B132B]">{project.projectRef || 'CAFE-2026-01'}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#94A3B8]">Project Value:</span>
                  <strong className="text-[#0B132B]">₹{project.projectValue.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions & Progress Summary */}
          <div className="flex flex-col items-start lg:items-end gap-3 self-stretch lg:self-auto min-w-[240px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#1463FF] text-[#1463FF] hover:bg-[#1463FF]/10 text-xs font-mono font-bold transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Project
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E8E4DC] text-[#64748B] hover:text-[#0B132B] text-xs font-mono font-bold">
                More <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-full space-y-1.5 text-right">
              <div className="flex items-center justify-between lg:justify-end gap-2 text-xs font-mono">
                <span className="text-[#64748B]">Overall Progress</span>
                <strong className="text-base text-[#0B132B]">{project.progress}%</strong>
              </div>
              <div className="w-full h-2.5 bg-[#F1EDE4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1463FF] rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(project.progress, 4)}%` }}
                />
              </div>
              <p className="text-[11px] text-[#64748B] italic">
                Currently developing {project.currentStage || 'Admin Panel'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Overview, Milestones, Updates, Files, Billing, Notes) */}
      <div className="flex border-b border-[#E8E4DC] gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-bold border-b-2 transition-all shrink-0 ${
              activeTab === tab.id
                ? 'border-[#1463FF] text-[#1463FF] bg-[#EDF4FF]/40 rounded-t-lg'
                : 'border-transparent text-[#64748B] hover:text-[#0B132B]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview Tab (Exact Reference 1 Layout) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 3-column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Project Details */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#F1EDE4] pb-3">
                <div className="w-7 h-7 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <h2 className="font-bold text-sm text-[#0B132B]">Project Details</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#94A3B8] font-medium block">Project Name</span>
                  <span className="font-bold text-[#0B132B]">{project.name}</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] font-medium block">Client / Company</span>
                  <span className="font-bold text-[#0B132B]">{project.clientName}</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] font-medium block">Project Description</span>
                  <p className="text-[#64748B] leading-relaxed mt-0.5">
                    {project.description || 'Complete digital system for The Café including a premium website, admin panel, POS integration, online ordering and automation tools.'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="text-[#94A3B8] font-medium block">Start Date</span>
                    <span className="font-mono text-[#0B132B]">{project.startDate || '01 Aug 2026'}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8] font-medium block">Target Date</span>
                    <span className="font-mono text-[#0B132B]">{project.targetDate || '30 Nov 2026'}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-[#94A3B8] font-medium block mb-1">Status</span>
                  <select
                    value={projectStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E8E4DC] rounded-xl px-3 py-2 text-xs font-mono font-bold text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Card 2: Project Stage (Customizable Stages) */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#F1EDE4] pb-3">
                <div className="w-7 h-7 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h2 className="font-bold text-sm text-[#0B132B]">Project Stage</h2>
              </div>

              <div className="space-y-3">
                {stages.map((stg: any, index: number) => {
                  const isCurrent = project.currentStage === stg.name;
                  const isCompleted = stg.status === 'COMPLETED' || (!isCurrent && index < 3);

                  return (
                    <div key={stg.id || index} className="flex items-start gap-3">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-6 h-6 rounded-full bg-[#1463FF] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm shadow-[#1463FF]/30">
                          {index + 1}
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#F1EDE4] text-[#94A3B8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                      )}

                      <div className="space-y-0.5">
                        <span className={`font-bold text-xs block ${isCurrent ? 'text-[#1463FF]' : 'text-[#0B132B]'}`}>
                          {stg.name}
                        </span>
                        <p className="text-[11px] text-[#64748B] leading-tight">
                          {stg.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 3: Progress Control (Interactive) */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#F1EDE4] pb-3">
                <div className="w-7 h-7 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <h2 className="font-bold text-sm text-[#0B132B]">Progress Control</h2>
              </div>

              <form onSubmit={handleUpdateProgress} className="space-y-4 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[#64748B] font-medium">Current Progress</span>
                    <div className="flex items-center gap-1 font-mono font-bold text-[#0B132B]">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={progressSlider}
                        onChange={(e) => setProgressSlider(Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                        className="w-12 text-center bg-[#FDFBF7] border border-[#E8E4DC] rounded-lg py-1 font-bold text-xs"
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressSlider}
                    onChange={(e) => setProgressSlider(parseInt(e.target.value, 10))}
                    className="w-full accent-[#1463FF] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[#64748B] font-medium block mb-1">Current Stage</label>
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E8E4DC] rounded-xl px-3 py-2 text-xs font-semibold text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  >
                    {stages.map((stg: any) => (
                      <option key={stg.name} value={stg.name}>
                        {stg.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#64748B] font-medium block mb-1">Update / Notes</label>
                  <textarea
                    rows={3}
                    maxLength={500}
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                    placeholder="Enter journal update notes..."
                    className="w-full bg-[#FDFBF7] border border-[#E8E4DC] rounded-xl p-3 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  />
                  <span className="text-[10px] text-[#94A3B8] font-mono block text-right">
                    {updateNotes.length}/500
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={updatingProgress}
                  className="w-full py-2.5 bg-[#1463FF] hover:bg-[#004AD6] text-white text-xs font-mono font-bold rounded-xl transition-all shadow-md shadow-[#1463FF]/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {updateSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>PROGRESS UPDATED</span>
                    </>
                  ) : updatingProgress ? (
                    <span>Saving Update...</span>
                  ) : (
                    <span>Update Progress</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom 2-column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 4: Key Information */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#F1EDE4] pb-3">
                <div className="w-7 h-7 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <h2 className="font-bold text-sm text-[#0B132B]">Key Information</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Industry</span>
                  <strong className="text-[#0B132B]">{project.industry || 'Food & Beverage'}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Project Type</span>
                  <strong className="text-[#0B132B]">{project.projectType || 'Website + Admin + POS'}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Technologies</span>
                  <strong className="text-[#0B132B]">{project.technologies || 'Next.js, Firebase, Google Sheets, POS API'}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Team (Internal)</span>
                  <strong className="text-[#0B132B]">{project.team || 'Anas (Lead), Dev Team'}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Priority</span>
                  <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-amber-100 text-amber-800">
                    {project.priority || 'High'}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 5: Project Summary */}
            <div className="bg-white rounded-2xl border border-[#E8E4DC] p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#F1EDE4] pb-3">
                <div className="w-7 h-7 rounded-lg bg-[#EDF4FF] text-[#1463FF] flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <h2 className="font-bold text-sm text-[#0B132B]">Project Summary</h2>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Total Milestones</span>
                  <strong className="text-[#0B132B]">{project.summary?.totalMilestones || project.milestones?.length || 6}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Completed Milestones</span>
                  <strong className="text-emerald-600">{project.summary?.completedMilestones || 3}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Pending Milestones</span>
                  <strong className="text-amber-600">{project.summary?.pendingMilestones || 3}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Total Updates</span>
                  <strong className="text-[#0B132B]">{project.summary?.totalUpdates || project.updates?.length || 12}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Total Files</span>
                  <strong className="text-[#0B132B]">{project.summary?.totalFiles || project.files?.length || 18}</strong>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#F1EDE4]">
                  <span className="text-[#64748B]">Total Invoiced</span>
                  <strong className="text-[#1463FF] text-sm">₹{(project.summary?.totalInvoiced || 130000).toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Outstanding</span>
                  <strong className="text-amber-600 text-sm">₹{(project.summary?.outstanding || 120000).toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Branding Footer Bar */}
          <div className="pt-6 border-t border-[#E8E4DC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
            <div className="flex items-center gap-4">
              <span>www.arklintech.com</span>
              <span>•</span>
              <span>work@arklintech.com</span>
            </div>
            <div className="font-bold text-[#0B132B]">
              BUILT FOR WHAT&apos;S NEXT.
            </div>
            <div className="text-right text-[10px]">
              AI | SOFTWARE | AUTOMATION<br />
              BUSINESS SYSTEMS | DIGITAL INFRASTRUCTURE
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Milestones Tab */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#0B132B]">Project Milestones ({project.milestones?.length || 0})</h2>
            <button
              onClick={() => setShowMilestoneModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1463FF] text-white text-xs font-mono font-bold hover:bg-[#004AD6]"
            >
              <Plus className="w-3.5 h-3.5" /> Add Milestone
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Title</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Description</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Due Date</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {(!project.milestones || project.milestones.length === 0) ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[#94A3B8]">
                      No milestones recorded yet. Click &quot;Add Milestone&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  project.milestones.map((ms: ProjectMilestoneRecord) => (
                    <tr key={ms.id} className="hover:bg-[#FDFBF7]">
                      <td className="px-4 py-3 font-bold text-[#0B132B]">{ms.title}</td>
                      <td className="px-4 py-3 text-[#64748B]">{ms.description || '—'}</td>
                      <td className="px-4 py-3 font-mono">{ms.dueDate || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                          ms.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {ms.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Chronological Updates Tab */}
      {activeTab === 'updates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#0B132B]">Project Journal & Chronological Updates</h2>
          </div>

          <div className="space-y-3">
            {(!project.updates || project.updates.length === 0) ? (
              <div className="bg-white rounded-xl border border-[#E8E4DC] p-8 text-center text-[#94A3B8] text-xs">
                No updates logged yet. Use the Progress Control on the Overview tab to submit updates.
              </div>
            ) : (
              project.updates.map((upd: ProjectUpdateRecord) => (
                <div key={upd.id} className="bg-white rounded-xl border border-[#E8E4DC] p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0B132B]">{upd.author}</span>
                      <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#EDF4FF] text-[#1463FF]">
                        {upd.stage} ({upd.progress}%)
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#94A3B8]">
                      {new Date(upd.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {upd.notes}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Files Tab (Google Drive Connected) */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#0B132B]">Project Files & Google Drive Documents</h2>
            <label className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1463FF] text-white text-xs font-mono font-bold hover:bg-[#004AD6] cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadingFile ? 'Uploading to Drive...' : 'Upload File to Drive'}</span>
              <input type="file" onChange={handleFileUpload} disabled={uploadingFile} className="hidden" />
            </label>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">File Name</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Size</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Upload Date</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {(!project.files || project.files.length === 0) ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[#94A3B8]">
                      No files uploaded yet. Click &quot;Upload File to Drive&quot; to attach project specifications and assets.
                    </td>
                  </tr>
                ) : (
                  project.files.map((file: ProjectFileRecord) => (
                    <tr key={file.id} className="hover:bg-[#FDFBF7]">
                      <td className="px-4 py-3 font-medium text-[#0B132B] flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#1463FF]" />
                        <span>{file.name}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[#64748B]">
                        {(file.sizeBytes / 1024).toFixed(1)} KB
                      </td>
                      <td className="px-4 py-3 font-mono text-[#64748B]">
                        {new Date(file.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={file.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#1463FF] hover:underline"
                        >
                          Open Drive <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#0B132B]">Project Invoices & Commercial Financials</h2>
            <Link
              href={`/admin/billing/create?projectId=${project.id}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1463FF] text-white text-xs font-mono font-bold hover:bg-[#004AD6]"
            >
              <Plus className="w-3.5 h-3.5" /> Create Invoice
            </Link>
          </div>

          {/* Financial summary metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-[#E8E4DC] p-4">
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Project Value</span>
              <div className="font-black text-xl text-[#0B132B] mt-1 font-mono">₹{project.projectValue.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E4DC] p-4">
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Total Invoiced</span>
              <div className="font-black text-xl text-[#1463FF] mt-1 font-mono">₹{(project.summary?.totalInvoiced || 130000).toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E4DC] p-4">
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Total Paid</span>
              <div className="font-black text-xl text-emerald-600 mt-1 font-mono">₹{(project.summary?.totalPaid || 0).toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E4DC] p-4">
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Outstanding</span>
              <div className="font-black text-xl text-amber-600 mt-1 font-mono">₹{(project.summary?.outstanding || 120000).toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Invoices List */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Invoice #</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Date</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Status</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Total (INR)</th>
                  <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {(!project.invoices || project.invoices.length === 0) ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#94A3B8]">
                      No invoices created yet for this project. Click &quot;Create Invoice&quot; to bill services.
                    </td>
                  </tr>
                ) : (
                  project.invoices.map((inv: InvoiceRecord) => (
                    <tr key={inv.id} className="hover:bg-[#FDFBF7]">
                      <td className="px-4 py-3 font-mono font-bold text-[#1463FF]">{inv.invoiceNumber}</td>
                      <td className="px-4 py-3 font-mono text-[#64748B]">{inv.invoiceDate}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-[#DBEAFE] text-[#1D4ED8]">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-[#0B132B]">₹{inv.total.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <a
                          href={`/api/admin/invoices/${inv.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono font-bold text-[#1463FF] hover:underline"
                        >
                          Download PDF
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-[#0B132B]">Private ARKLINTECH Project Notes</h2>
            <button
              onClick={() => setShowNoteModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1463FF] text-white text-xs font-mono font-bold hover:bg-[#004AD6]"
            >
              <Plus className="w-3.5 h-3.5" /> Add Note
            </button>
          </div>

          <div className="space-y-3">
            {(!project.notes || project.notes.length === 0) ? (
              <div className="bg-white rounded-xl border border-[#E8E4DC] p-8 text-center text-[#94A3B8] text-xs">
                No private notes recorded.
              </div>
            ) : (
              project.notes.map((note: ProjectNoteRecord) => (
                <div key={note.id} className="bg-white rounded-xl border border-[#E8E4DC] p-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-[#0B132B]">{note.title || 'Internal Note'}</strong>
                    <span className="text-[10px] font-mono text-[#94A3B8]">{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-[#64748B] whitespace-pre-wrap">{note.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {showMilestoneModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D8D4C9] p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[#0B132B]">Add Milestone</h3>
            <form onSubmit={handleAddMilestone} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Due Date</label>
                <input
                  type="date"
                  value={newMilestone.dueDate}
                  onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowMilestoneModal(false)} className="px-3 py-1.5 text-xs">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#1463FF] text-white text-xs font-mono font-bold rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D8D4C9] p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-[#0B132B]">Add Private Note</h3>
            <form onSubmit={handleAddNote} className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Note Content</label>
                <textarea
                  rows={4}
                  required
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowNoteModal(false)} className="px-3 py-1.5 text-xs">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-[#1463FF] text-white text-xs font-mono font-bold rounded-lg">Save Note</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
