import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12', className)}>
      {children}
    </div>
  );
}
