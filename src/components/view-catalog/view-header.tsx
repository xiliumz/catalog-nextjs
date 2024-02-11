'use client';
import React, { useEffect, useState } from 'react';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function ViewHeader() {
  const [title, setTitle] = useState<string | undefined>();
  const [desc, setDesc] = useState<string | undefined>();
  useEffect(() => {
    setTimeout(() => {
      setTitle('Test');
      setDesc('Test');
    }, 1000);
  }, []);

  return (
    <CardHeader>
      {title ? (
        <CardTitle className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>{title}</CardTitle>
      ) : (
        <Skeleton className='h-9 w-full lg:h-12' />
      )}
      <br />
      {desc ? <CardDescription>{desc}</CardDescription> : <Skeleton className='h-5 w-full' />}
    </CardHeader>
  );
}
