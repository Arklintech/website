'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function InvoiceEditRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  useEffect(() => {
    if (id) {
      router.replace(`/admin/billing/create?edit=${encodeURIComponent(id)}`);
    }
  }, [id, router]);

  return (
    <div className="p-12 text-center text-[#94A3B8] font-mono text-xs">
      <div className="w-5 h-5 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
      Loading invoice editor...
    </div>
  );
}
