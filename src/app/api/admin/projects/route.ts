import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const projects = await adminDb.projects.findRecent(100);
    return NextResponse.json({ data: projects, count: projects.length });
  } catch (err: any) {
    console.error('Error fetching projects:', err);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const body = await req.json();
    if (!body.name || !body.clientName) {
      return NextResponse.json({ error: 'Project name and client name are required' }, { status: 400 });
    }

    const projectRef = body.projectRef || `PRJ-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`;

    const project = await adminDb.projects.create({
      name: body.name,
      clientName: body.clientName,
      companyId: body.companyId || null,
      description: body.description || '',
      industry: body.industry || 'Technology',
      projectType: body.projectType || 'Custom System',
      technologies: body.technologies || 'Next.js, Firebase, Google Cloud',
      team: body.team || 'Anas (Lead), Dev Team',
      priority: body.priority || 'HIGH',
      status: body.status || 'ACTIVE',
      startDate: body.startDate || new Date().toISOString().split('T')[0],
      targetDate: body.targetDate || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      projectRef,
      projectValue: parseFloat(body.projectValue || '0') || 0,
      progress: parseInt(body.progress || '0', 10) || 0,
      currentStage: body.currentStage || 'Planning',
      stages: body.stages || [
        { id: 'stg_1', name: 'Planning', description: 'Requirements and initial discussion', order: 1, status: 'ACTIVE' },
        { id: 'stg_2', name: 'Design', description: 'UI/UX design and prototyping', order: 2, status: 'PENDING' },
        { id: 'stg_3', name: 'Website', description: 'Website development', order: 3, status: 'PENDING' },
        { id: 'stg_4', name: 'Admin Panel', description: 'Dashboard and management system', order: 4, status: 'PENDING' },
        { id: 'stg_5', name: 'POS Integration', description: 'POS system integration', order: 5, status: 'PENDING' },
        { id: 'stg_6', name: 'Testing', description: 'Testing and quality assurance', order: 6, status: 'PENDING' },
        { id: 'stg_7', name: 'Deployment', description: 'Live deployment and handover', order: 7, status: 'PENDING' },
      ],
      thumbnailUrl: body.thumbnailUrl || null,
    });

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating project:', err);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
