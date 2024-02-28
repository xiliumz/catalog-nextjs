'use client';
import { cn } from '@/lib/utils';
import { FormEvent, HTMLAttributes, useEffect, useState } from 'react';
import { catalogProps } from '../dashboard/catalogs-container';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import ViewItem from './view-item';
import ViewTag from './view-tag';
import { Skeleton } from '../ui/skeleton';
import { AspectRatio } from '../ui/aspect-ratio';

export interface contentProps extends HTMLAttributes<HTMLDivElement> {
  catalogs: catalogProps[];
  tag?: string[];
}

export default function ViewContent({ catalogs: item, tag, className, ...props }: contentProps) {
  const [search, setSearch] = useState('');
  const [catalogs, setCatalogs] = useState<catalogProps[] | undefined>();

  useEffect(() => {
    setCatalogs(item);
  }, [item]);

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const searched = e.currentTarget.value;
    setSearch(searched);
    setCatalogs(() => {
      const filteredCatalogs = item.flatMap((catalog) =>
        catalog.title.toLowerCase().search(searched) !== -1 ? catalog : []
      );
      return filteredCatalogs;
    });
  };

  if (!catalogs) {
    return (
      <>
        <Input
          data-test='view-search'
          className='w-full'
          placeholder='Find an insteresting product . . . '
          onInput={onInput}
          value={search}
        />
        <div className={cn('w-full sm:flex mt-2', className)} {...props}>
          <ViewTag id='1' tag='Tag 1' />
          <Separator className='h-auto hidden sm:block' orientation='vertical' />
          <div className='w-full sm:pl-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6'>
            <div className='shadow-md rounded-sm px-3 py-4'>
              <AspectRatio>
                <Skeleton className='bg-muted rounded-sm w-full transition-all hover:scale-105 h-full ' />
              </AspectRatio>
              <Skeleton className='h-[28px] mt-5' />
              <Skeleton className='h-[20px] mt-2' />
            </div>
            <div className='shadow-md rounded-sm px-3 py-4'>
              <AspectRatio>
                <Skeleton className='bg-muted rounded-sm w-full transition-all hover:scale-105 h-full ' />
              </AspectRatio>
              <Skeleton className='h-[28px] mt-5' />
              <Skeleton className='h-[20px] mt-2' />
            </div>
            <div className='shadow-md rounded-sm px-3 py-4'>
              <AspectRatio>
                <Skeleton className='bg-muted rounded-sm w-full transition-all hover:scale-105 h-full' />
              </AspectRatio>
              <Skeleton className='h-[28px] mt-5' />
              <Skeleton className='h-[20px] mt-2' />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (catalogs.length <= 0) {
    return (
      <>
        <Input
          className='w-full'
          data-test='view-search'
          placeholder='Find an insteresting product . . . '
          onInput={onInput}
          value={search}
        />
        <div className={cn('w-full sm:flex mt-2', className)} {...props}>
          <ViewTag id='1' tag='Tag 1' />
          <Separator className='h-auto hidden sm:block' orientation='vertical' />
          <NoContent />
        </div>
      </>
    );
  }

  return (
    <>
      <Input
        className='w-full'
        data-test='view-search'
        placeholder='Find an insteresting product . . . '
        onInput={onInput}
        value={search}
      />
      <div className={cn('w-full sm:flex mt-2', className)} {...props}>
        <ViewTag id='1' tag='Tag 1' />
        <Separator className='h-auto hidden sm:block' orientation='vertical' />
        <div className='w-full sm:pl-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6'>
          {catalogs.map((item) => (
            <ViewItem title={item.title} desc={item.desc} imagePath={item.imagePath} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}

function NoContent() {
  return (
    <div className='w-full py-28'>
      <p className='leading-7 [&:not(:first-child)]:mt-6 w-full text-center text-muted-foreground'>No Item</p>
    </div>
  );
}
