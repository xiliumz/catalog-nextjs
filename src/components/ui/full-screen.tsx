import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

export default function FullScreen({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col min-h-screen', className)} {...props}>
      {children}
    </div>
  );
}
