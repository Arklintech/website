'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import SystemsBuiltSection from '@/components/work/SystemsBuiltSection';

interface WorkDetailPageProps {
  params: { slug: string };
}

export default function WorkDetailPage({ params }: WorkDetailPageProps) {
  const router = useRouter();
  const slug = params?.slug || '';

  useEffect(() => {
    let projId = slug;
    if (slug === 'neominds-enrollment') projId = 'neominds';
    if (slug === 'parivar-restaurant') projId = 'parivar';

    router.replace(`/work?project=${projId}`);
  }, [slug, router]);

  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <SystemsBuiltSection onOpenProjectModal={onOpenProjectModal} />
      )}
    </PageShell>
  );
}
