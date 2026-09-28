'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, MoreHorizontal, Trash2 } from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';

const STATUSES = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'ON_HOLD', label: 'On Hold' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'ARCHIVED', label: 'Archived' },
];

interface ProjectActionsMenuProps {
  project: { id: string; name: string; status: string };
  /** 'button' = labelled "More" button (project page); 'icon' = compact ⋯ button (list cards). */
  variant?: 'button' | 'icon';
  /** Called after a status change has been saved. */
  onStatusChanged: () => void | Promise<void>;
  /** Called after the project has been deleted. */
  onDeleted: () => void | Promise<void>;
}

export default function ProjectActionsMenu({ project, variant = 'button', onStatusChanged, onDeleted }: ProjectActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const setStatus = async (status: string) => {
    setOpen(false);
    if (status === project.status) return;
    setBusy(true);
    try {
      const res = await fetchAdmin(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) await onStatusChanged();
    } finally {
      setBusy(false);
    }
  };

  const deleteProject = async () => {
    setBusy(true);
    setError('');
    try {
      const res = await fetchAdmin(`/api/admin/projects/${project.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || 'Failed to delete the project.');
      setConfirmDelete(false);
      await onDeleted();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete the project.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      {variant === 'button' ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          disabled={busy}
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E8E4DC] text-[#64748B] hover:text-[#0B132B] text-xs font-mono font-bold disabled:opacity-50"
        >
          More <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          disabled={busy}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={`Actions for ${project.name}`}
          className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0B132B] hover:bg-[#F5F1E8] disabled:opacity-50"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      )}

      {open && (
        <div role="menu" className="absolute right-0 top-full mt-1.5 z-30 w-48 bg-white rounded-xl border border-[#E8E4DC] shadow-xl py-1.5 text-xs">
          <div className="px-3 pt-1 pb-1.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Set status</div>
          {STATUSES.map((s) => (
            <button
              key={s.value}
              type="button"
              role="menuitemradio"
              aria-checked={project.status === s.value}
              onClick={() => setStatus(s.value)}
              className="w-full flex items-center justify-between px-3 py-2 text-left text-[#0B132B] hover:bg-[#F5F1E8]"
            >
              {s.label}
              {project.status === s.value && <Check className="w-3.5 h-3.5 text-[#1463FF]" />}
            </button>
          ))}
          <div className="my-1.5 border-t border-[#F1EDE4]" />
          <button
            type="button"
            role="menuitem"
            onClick={() => { setOpen(false); setError(''); setConfirmDelete(true); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-left font-semibold text-rose-600 hover:bg-rose-50"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete project
          </button>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div role="alertdialog" aria-modal="true" aria-labelledby="delete-project-title" aria-describedby="delete-project-desc" className="bg-white rounded-2xl border border-[#D8D4C9] p-6 w-full max-w-md shadow-2xl space-y-4 text-left">
            <h2 id="delete-project-title" className="font-bold text-base text-[#0B132B]">Delete “{project.name}”?</h2>
            <p id="delete-project-desc" className="text-xs text-[#64748B] leading-relaxed">
              The project is removed from Google Sheets and disappears from COMMAND. Its milestones, updates, files,
              notes, and invoices are kept. This cannot be undone from the admin panel.
            </p>
            {error && <p role="alert" className="text-xs text-rose-600 font-medium">{error}</p>}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button type="button" onClick={() => setConfirmDelete(false)} disabled={busy} className="px-4 py-2 text-xs font-mono font-bold text-[#64748B] hover:text-[#0B132B]">
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteProject}
                disabled={busy}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-mono font-bold disabled:opacity-50"
              >
                {busy ? 'Deleting...' : 'DELETE PROJECT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
