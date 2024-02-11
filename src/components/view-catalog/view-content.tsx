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
  catalogId: string;
  user: string;
}

// TODO:put the data into DOM
export default function ViewContent({ catalogId, user, className, ...props }: contentProps) {
  const [catalogContainer, setCatalogContainer] = useState<catalogContainerProps[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${HOST}/catalog/${user}/${catalogId}`, {
          method: 'GET',
          redirect: 'follow',
        });
        const result = (await response.json()).data;

        console.log(result);
        if (!response.ok)
          throw new Error(
            result.errors ? result.errors : 'An unexpected error occurred. Please contact the administrator.'
          );
        const data: catalogContainerProps = result.data;
        setCatalogContainer([data]);
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: 'Something wrong',
            description: e.message,
          });
        }
      }
    };
    getData();
  }, []);

  return (
    <>
      <Input className='w-full' placeholder='Find an insteresting product . . . ' />
      <Separator className='mt-10' />
      <div className={cn('w-full flex mt-2', className)} {...props}>
        <ViewTag id='1' tag='Tag 1' />
        <Separator className='h-auto' orientation='vertical' />
        <div className='w-full pl-4 grid grid-cols-3 gap-x-4 gap-y-6'>
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
          <ViewItem />
        </div>
      </div>
    </>
  );
}
