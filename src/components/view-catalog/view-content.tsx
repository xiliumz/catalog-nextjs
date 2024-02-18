'use client';
import { cn } from '@/lib/utils';
import { FormEvent, HTMLAttributes, useEffect, useState } from 'react';
import { catalogProps } from '../dashboard/catalogs-container';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import ViewItem from './view-item';
import ViewTag from './view-tag';

export interface contentProps extends HTMLAttributes<HTMLDivElement> {
  catalogs: catalogProps[];
  tag?: string[];
}

export default function ViewContent({ catalogs: item, tag, className, ...props }: contentProps) {
  const [search, setSearch] = useState('');
  const [catalogs, setCatalogs] = useState(item);

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

  return (
    <>
      <Input className='w-full' placeholder='Find an insteresting product . . . ' onInput={onInput} value={search} />
      <div className={cn('w-full flex mt-2', className)} {...props}>
        <ViewTag id='1' tag='Tag 1' />
        <Separator className='h-auto' orientation='vertical' />
        {/* TODO: create skeleton */}
        <div className='w-full pl-4 grid grid-cols-3 gap-x-4 gap-y-6'>
          {catalogs.map((item) => {
            return <ViewItem title={item.title} desc={item.desc} imagePath={item.imagePath} key={item.id} />;
          })}
        </div>
      </div>
    </>
  );
}
