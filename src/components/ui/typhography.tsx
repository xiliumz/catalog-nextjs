import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

export function TypographySmall({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <small {...props} className={cn('text-sm font-medium leading-none', className)}>
      {children}
    </small>
  );
}
