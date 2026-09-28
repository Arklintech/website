'use client';

import React, { useEffect, useState } from 'react';
import { ImagePlus, Trash2, X } from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';
import { PROJECT_IMAGE_MAX_BYTES, PROJECT_IMAGE_TYPES } from '@/lib/project-image';
import ProjectThumbnail from '@/components/admin/shared/ProjectThumbnail';
import type { ProjectRecord } from '@/lib/admin-db';

interface ProjectEditModalProps {
  project: ProjectRecord;
  onClose: () => void;
  /** Called after a successful save; should refetch the authoritative project record. */
  onSaved: () => Promise<void>;
}

const inputClass =
  'w-full bg-[#FDFBF7] border border-[#D8D4C9] rounded-xl px-3 py-2 text-xs text-[#0B132B] focus:outline-none focus:border-[#1463FF]';
const labelClass = 'font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1';

export default function ProjectEditModal({ project, onClose, onSaved }: ProjectEditModalProps) {
  const [form, setForm] = useState({
    name: project.name,
    clientName: project.clientName,
    description: project.description || '',
    projectType: project.projectType || '',
    industry: project.industry || '',
    targetDate: project.targetDate || '',
    projectValue: project.projectValue,
  });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const pickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!PROJECT_IMAGE_TYPES.includes(file.type)) return setError('Image must be PNG, JPEG, WebP, GIF, or AVIF.');
    if (file.size > PROJECT_IMAGE_MAX_BYTES) return setError('Image must be 5 MB or smaller.');
    setError('');
    setRemoveImage(false);
    setNewImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (newImage) {
        const body = new FormData();
        body.append('file', newImage);
        const res = await fetchAdmin(`/api/admin/projects/${project.id}/image`, { method: 'POST', body });
        if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || 'Failed to save the image.');
      } else if (removeImage) {
        const res = await fetchAdmin(`/api/admin/projects/${project.id}/image`, { method: 'DELETE' });
        if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || 'Failed to remove the image.');
      }

      const res = await fetchAdmin(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => null))?.error || 'Failed to save the project.');

      await onSaved();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save the project.');
    } finally {
      setSaving(false);
    }
  };

  const field = (key: keyof typeof form) => ({
    value: form[key] as string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: key === 'projectValue' ? parseFloat(e.target.value) || 0 : e.target.value }),
  });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="edit-project-title" className="bg-white rounded-2xl border border-[#D8D4C9] p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
          <h2 id="edit-project-title" className="font-black text-lg text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Edit Project
          </h2>
          <button type="button" onClick={onClose} className="text-[#94A3B8] hover:text-[#0B132B]" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={save} className="space-y-4 text-xs">
          <div>
            <span className={labelClass}>Project Image</span>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl border border-[#E8E4DC] shrink-0 overflow-hidden">
                {preview ? (
                  <img src={preview} alt="New project image" className="w-full h-full object-cover" />
                ) : (
                  <ProjectThumbnail project={removeImage ? { ...project, thumbnailUrl: null } : project} className="w-full h-full" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1463FF] text-[#1463FF] hover:bg-[#1463FF]/10 font-mono font-bold cursor-pointer">
                  <ImagePlus className="w-3.5 h-3.5" /> {project.thumbnailUrl || newImage ? 'Replace image' : 'Add image'}
                  <input type="file" accept={PROJECT_IMAGE_TYPES.join(',')} onChange={pickImage} className="sr-only" />
                </label>
                {(project.thumbnailUrl || newImage) && !removeImage && (
                  <button
                    type="button"
                    onClick={() => { setNewImage(null); setPreview(null); setRemoveImage(Boolean(project.thumbnailUrl)); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8E4DC] text-[#64748B] hover:text-rose-600 font-mono font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> {newImage ? 'Discard new image' : 'Remove image'}
                  </button>
                )}
                {removeImage && <span className="text-[10px] text-rose-600 font-mono">Image will be removed on save</span>}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="edit-name" className={labelClass}>Project Name *</label>
            <input id="edit-name" type="text" required {...field('name')} className={inputClass} />
          </div>
          <div>
            <label htmlFor="edit-client" className={labelClass}>Client / Company Name *</label>
            <input id="edit-client" type="text" required {...field('clientName')} className={inputClass} />
          </div>
          <div>
            <label htmlFor="edit-description" className={labelClass}>Project Description</label>
            <textarea id="edit-description" rows={2} {...field('description')} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="edit-type" className={labelClass}>Project Type</label>
              <input id="edit-type" type="text" {...field('projectType')} className={inputClass} />
            </div>
            <div>
              <label htmlFor="edit-industry" className={labelClass}>Industry</label>
              <input id="edit-industry" type="text" {...field('industry')} className={inputClass} />
            </div>
            <div>
              <label htmlFor="edit-value" className={labelClass}>Commercial Value (INR)</label>
              <input id="edit-value" type="number" min={0} {...field('projectValue')} className={inputClass} />
            </div>
            <div>
              <label htmlFor="edit-target" className={labelClass}>Target Date</label>
              <input id="edit-target" type="date" {...field('targetDate')} className={inputClass} />
            </div>
          </div>

          {error && <p role="alert" className="text-rose-600 font-medium">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E4DC]">
            <button type="button" onClick={onClose} className="px-4 py-2 font-mono font-bold text-[#64748B] hover:text-[#0B132B]">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 bg-[#1463FF] hover:bg-[#004AD6] text-white font-mono font-bold rounded-xl transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'SAVE CHANGES'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
