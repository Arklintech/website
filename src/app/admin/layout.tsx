import type { Metadata } from 'next';
import CommandShell from '@/components/admin/shell/CommandShell';

export const metadata: Metadata = {
  title: 'ARKLINTECH — TECHNOLOGY SYSTEMS | COMMAND',
  description: 'Internal operating platform',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <CommandShell>{children}</CommandShell>;
}
