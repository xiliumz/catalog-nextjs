'use client';
import { cn } from '@/lib/utils';
import { CheckedState } from '@radix-ui/react-checkbox';
import { FormEvent, HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { catalogProps } from '../dashboard/catalogs-container';
import { AspectRatio } from '../ui/aspect-ratio';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import ItemsSection from './item-section';
import TagsSection from './tag-section';

export interface contentProps extends HTMLAttributes<HTMLDivElement> {
  catalogs: catalogProps[];
}

export default function ViewContent({ catalogs: item, className, ...props }: contentProps) {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const [catalogs, setCatalogs] = useState<catalogProps[] | undefined>();
  const tags = useMemo(
    () =>
      catalogs
        ?.flatMap((val) => val.tags)
        .filter((obj, index, self) => index === self.findIndex((o) => o.id === obj.id)),
    [catalogs]
  );

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

  const handleCheckboxChange = (e: CheckedState, id: string) => {
    const isChecked = e;
    let newChecked: string[];

    if (isChecked) {
      newChecked = [...checked, id];
    } else {
      newChecked = checked.filter((checkedId) => checkedId !== id);
    }
    setChecked(newChecked);

    setCatalogs(() => {
      // Filter catalogs based on whether the checkbox is checked or not
      const filteredCatalogs =
        newChecked.length > 0
          ? item.filter((catalog) => newChecked.every((tag) => catalog.tags?.some((_tag) => _tag.id === tag)))
          : item;
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
          <NoContent />
        </div>
      </>
    );
  }

  return (
    <>
      <Input
        className='w-full py-2 mb-6'
        data-test='view-search'
        placeholder='Find an interesting product...'
        onInput={onInput}
        value={search}
      />
      <div className={cn('w-full sm:flex mt-2', className)} {...props}>
        {tags && tags.length > 0 && (
          <>
            <TagsSection
              tags={
                tags as {
                  id: string;
                  name: string;
                }[]
              }
              handleCheckboxChange={handleCheckboxChange}
            />
            <Separator className='h-auto hidden sm:block' orientation='vertical' />
          </>
        )}
        <ItemsSection catalogs={catalogs} />
      </div>
    </>
  );
}

function NoContent() {
  return (
    <div className='w-full py-28'>
      <p data-test='no-item' className='leading-7 [&:not(:first-child)]:mt-6 w-full text-center text-muted-foreground'>
        No Item
      </p>
    </div>
  );
}
