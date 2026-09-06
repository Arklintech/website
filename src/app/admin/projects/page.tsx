'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase, Plus, Search, Filter, ArrowUpRight, Calendar,
  CheckCircle2, Clock, AlertCircle, TrendingUp, Layers
} from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';
import type { ProjectRecord } from '@/lib/admin-db';

export default function ProjectsDirectoryPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Project Form state
  const [newProject, setNewProject] = useState({
    name: '',
    clientName: '',
    description: '',
    industry: 'Food & Beverage',
    projectType: 'Website + Admin Panel',
    technologies: 'Next.js, Firebase, Google Sheets',
    projectValue: 250000,
    priority: 'HIGH' as const,
    startDate: new Date().toISOString().split('T')[0],
    targetDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
  });
  const [submitting, setSubmitting] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetchAdmin('/api/admin/projects');
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.clientName) return;

    try {
      setSubmitting(true);
      const res = await fetchAdmin('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setNewProject({
          name: '',
          clientName: '',
          description: '',
          industry: 'Food & Beverage',
          projectType: 'Website + Admin Panel',
          technologies: 'Next.js, Firebase, Google Sheets',
          projectValue: 250000,
          priority: 'HIGH',
          startDate: new Date().toISOString().split('T')[0],
          targetDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
        });
        await loadProjects();
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      (p.projectRef && p.projectRef.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 max-w-[1280px] mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-1">
            <span>COMMAND</span>
            <span>/</span>
            <span className="text-[#1463FF] font-bold">PROJECTS</span>
          </div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Client Projects
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Track system architecture, project delivery stages, progress, and commercial deliverables.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1463FF] hover:bg-[#004AD6] text-white text-xs font-mono font-bold transition-all shadow-md shadow-[#1463FF]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> NEW PROJECT
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name, client, reference..."
            className="w-full bg-[#FDFBF7] border border-[#E8E4DC] rounded-lg pl-9 pr-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
          />
        </div>
        <div className="flex items-center gap-2">
          {['ALL', 'ACTIVE', 'ON_HOLD', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#1463FF] text-white'
                  : 'bg-[#FDFBF7] text-[#64748B] hover:text-[#0B132B] border border-[#E8E4DC]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-12 text-center">
          <div className="w-8 h-8 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <span className="text-xs font-mono text-[#64748B]">Loading project records...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-12 text-center space-y-3">
          <Briefcase className="w-10 h-10 text-[#94A3B8] mx-auto" />
          <h3 className="font-bold text-sm text-[#0B132B]">No projects found</h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            {search ? 'Try adjusting your search query or status filter.' : 'Create your first system project to manage delivery stages, milestones, and billing.'}
          </p>
          {!search && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[#1463FF] text-white text-xs font-mono font-bold rounded-lg"
            >
              Create First Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((proj) => (
            <Link
              key={proj.id}
              href={`/admin/projects/${proj.id}`}
              className="bg-white rounded-xl border border-[#E8E4DC] hover:border-[#1463FF]/50 p-5 flex flex-col justify-between transition-all hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] font-bold text-[#1463FF] uppercase tracking-wider">
                      {proj.projectRef || 'PROJECT'}
                    </span>
                    <h2 className="font-bold text-base text-[#0B132B] group-hover:text-[#1463FF] transition-colors line-clamp-1">
                      {proj.name}
                    </h2>
                    <p className="text-xs text-[#64748B] font-medium">{proj.clientName}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                    proj.status === 'ACTIVE'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : proj.status === 'COMPLETED'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {proj.description || 'Custom technology system development and deployment.'}
                </p>

                {/* Stage & Progress Bar */}
                <div className="space-y-1.5 pt-2 border-t border-[#F8F5F0]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] font-medium">Stage: <strong className="text-[#0B132B]">{proj.currentStage || 'Planning'}</strong></span>
                    <span className="font-mono font-bold text-[#1463FF]">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#F1EDE4] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1463FF] rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(proj.progress, 4)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Card Meta */}
              <div className="pt-4 mt-3 border-t border-[#F1EDE4] flex items-center justify-between text-xs font-mono text-[#64748B]">
                <div>
                  <span className="block text-[10px] text-[#94A3B8]">PROJECT VALUE</span>
                  <span className="font-bold text-[#0B132B]">₹{proj.projectValue.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-[#94A3B8]">TARGET DATE</span>
                  <span className="font-medium text-[#0B132B]">{proj.targetDate || 'TBD'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* New Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D8D4C9] p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
              <h2 className="font-black text-lg text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                Create New Project
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#94A3B8] hover:text-[#0B132B] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="e.g. Café Digital System"
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                />
              </div>

              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Client / Company Name *</label>
                <input
                  type="text"
                  required
                  value={newProject.clientName}
                  onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                  placeholder="e.g. The Café"
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                />
              </div>

              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Project Description</label>
                <textarea
                  rows={2}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Summary of deliverables, scope, and technical requirements."
                  className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Commercial Value (INR)</label>
                  <input
                    type="number"
                    value={newProject.projectValue}
                    onChange={(e) => setNewProject({ ...newProject, projectValue: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Industry</label>
                  <input
                    type="text"
                    value={newProject.industry}
                    onChange={(e) => setNewProject({ ...newProject, industry: e.target.value })}
                    className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Target Date</label>
                  <input
                    type="date"
                    value={newProject.targetDate}
                    onChange={(e) => setNewProject({ ...newProject, targetDate: e.target.value })}
                    className="w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E4DC]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-mono font-bold text-[#64748B] hover:text-[#0B132B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-[#1463FF] hover:bg-[#004AD6] text-white font-mono font-bold text-xs rounded-xl transition-all disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'CREATE PROJECT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
