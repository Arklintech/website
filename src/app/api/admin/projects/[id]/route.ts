import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

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
    const body = await req.json();
    const updated = await adminDb.projects.update(params.id, body);
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
