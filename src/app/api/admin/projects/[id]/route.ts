import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';
import type { ProjectRecord } from '@/lib/admin-db';

const TEXT_FIELDS = ['name', 'clientName', 'description', 'industry', 'projectType', 'technologies', 'team', 'startDate', 'targetDate', 'projectRef', 'currentStage'] as const;
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];
const STATUSES = ['ACTIVE', 'ON_HOLD', 'COMPLETED', 'ARCHIVED'];

/** Whitelists the editable project fields; anything else in the body is ignored.
 *  The project image is changed through /api/admin/projects/[id]/image instead. */
function parseProjectUpdate(body: any): { updates: Partial<ProjectRecord> } | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid request body' };
  const updates: Partial<ProjectRecord> = {};
  for (const key of TEXT_FIELDS) {
    if (body[key] !== undefined) (updates as any)[key] = String(body[key] ?? '').trim().slice(0, 2000);
  }
  if (updates.name !== undefined && !updates.name) return { error: 'Project name is required' };
  if (updates.clientName !== undefined && !updates.clientName) return { error: 'Client name is required' };
  if (body.priority !== undefined) {
    if (!PRIORITIES.includes(body.priority)) return { error: 'Invalid priority' };
    updates.priority = body.priority;
  }
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) return { error: 'Invalid status' };
    updates.status = body.status;
  }
  if (body.projectValue !== undefined) {
    const value = Number(body.projectValue);
    if (!Number.isFinite(value) || value < 0) return { error: 'Invalid project value' };
    updates.projectValue = value;
  }
  if (body.progress !== undefined) {
    const progress = Number(body.progress);
    if (!Number.isFinite(progress) || progress < 0 || progress > 100) return { error: 'Invalid progress' };
    updates.progress = Math.round(progress);
  }
  return { updates };
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const project = await adminDb.projects.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const [milestones, updates, files, notes, invoices] = await Promise.all([
      adminDb.projectMilestones.findByProject(project.id),
      adminDb.projectUpdates.findByProject(project.id),
      adminDb.projectFiles.findByProject(project.id),
      adminDb.projectNotes.findByProject(project.id),
      adminDb.invoices.findByProject(project.id),
    ]);

    const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);
    const totalPaid = invoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + (inv.total || 0), 0);
    const outstanding = Math.max(0, project.projectValue - totalPaid);

    return NextResponse.json({
      data: {
        ...project,
        milestones,
        updates,
        files,
        notes,
        invoices,
        summary: {
          totalMilestones: milestones.length,
          completedMilestones: milestones.filter(m => m.status === 'COMPLETED').length,
          pendingMilestones: milestones.filter(m => m.status !== 'COMPLETED').length,
          totalUpdates: updates.length,
          totalFiles: files.length,
          totalInvoiced,
          totalPaid,
          outstanding,
        },
      },
    });
  } catch (err: any) {
    console.error(`Error fetching project ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const parsed = parseProjectUpdate(await req.json());
    if ('error' in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const updated = await adminDb.projects.update(params.id, parsed.updates);
    if (!updated) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updated });
  } catch (err: any) {
    console.error(`Error updating project ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const deleted = await adminDb.projects.delete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(`Error deleting project ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
