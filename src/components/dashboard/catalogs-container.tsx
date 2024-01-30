'use client';
import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';

export default function CatalogContainer({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  if (children) {
    return (
      <div {...props} className={cn('w-full grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-x-10', className)}>
        {children}
      </div>
    );
  }
  return (
    <Card className='flex-grow flex flex-col'>
      <CardHeader></CardHeader>
      <CardContent className='flex-grow flex justify-center items-center'>You don't have any catalogs</CardContent>
    </Card>
  );
}
