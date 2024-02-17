'use client';
import { HOST } from '@/lib/global-var';
import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect, useState } from 'react';
import { catalogContainerProps, catalogProps } from '../dashboard/catalogs-container';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useToast } from '../ui/use-toast';
import ViewItem from './view-item';
import ViewTag from './view-tag';

export interface contentProps extends HTMLAttributes<HTMLDivElement> {
  catalogs: catalogProps[];
  tag?: string[];
}

// TODO:put the data into DOM
export default function ViewContent({ catalogs, tag, className, ...props }: contentProps) {
  return (
    <>
      <Input className='w-full' placeholder='Find an insteresting product . . . ' />
      <Separator className='mt-10' />
      <div className={cn('w-full flex mt-2', className)} {...props}>
        <ViewTag id='1' tag='Tag 1' />
        <Separator className='h-auto' orientation='vertical' />
        <div className='w-full pl-4 grid grid-cols-3 gap-x-4 gap-y-6'>
          {catalogs.map((item) => (
            <ViewItem title={item.title} desc={item.desc} img={item.img} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}
