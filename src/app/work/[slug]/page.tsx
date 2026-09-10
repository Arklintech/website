'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-8">
      <div className="font-mono text-xs text-[#1463FF] animate-pulse">
        LOADING WORK FEATURE...
      </div>
    </div>
  );
}
