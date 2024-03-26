'use client';
import React, { useEffect, useState } from 'react';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function ViewHeader({ titleParam, descParam }: { titleParam?: string; descParam?: string }) {
  const [title, setTitle] = useState<string | undefined>(titleParam);
  const [desc, setDesc] = useState<string | undefined>(descParam);

  useEffect(() => {
    setTitle(titleParam);
    setDesc(descParam);
  }, [titleParam, descParam]);

  return (
    <CardHeader>
      {title ? (
        <CardTitle data-test='view-title' className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          {title}
        </CardTitle>
      ) : (
        <Skeleton className='h-9 w-full lg:h-12' />
      )}
      {desc != undefined ? (
        desc !== '' && (
          <>
            <br />
            <CardDescription data-test='view-desc' className='min-h-5'>
              {desc}
            </CardDescription>
          </>
        )
      ) : (
        <Skeleton className='h-5 w-full' />
      )}
    </CardHeader>
  );
}
