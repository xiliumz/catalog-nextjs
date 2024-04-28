'use client';
import React, { useEffect, useState } from 'react';
import ViewHeader from './view-header';
import ViewContent from './view-content';
import { CardContent } from '../ui/card';
import { catalogContainerProps } from '../dashboard/catalogs-container';
import { HOST } from '@/lib/global-var';
import { toast } from '../ui/use-toast';

export default function ViewWrapper({ catalogId, user }: { catalogId: string; user: string }) {
  const [catalogContainer, setCatalogContainer] = useState<catalogContainerProps>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${HOST}/catalog/${user}/${catalogId}`, {
          method: 'GET',
          redirect: 'follow',
        });
        const result = (await response.json()).data;

        if (!response.ok)
          throw new Error(
            result.errors ? result.errors : 'An unexpected error occurred. Please contact the administrator.'
          );
        const data: catalogContainerProps = result;
        const catalogs = data.catalogs.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setCatalogContainer({ ...data, catalogs });
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: 'Something wrong',
            description: e.message,
            variant: 'destructive',
          });
        }
      }
    };
    getData();
  }, []);

  if (catalogContainer) {
    return (
      <>
        <ViewHeader titleParam={catalogContainer?.title} descParam={catalogContainer?.desc || ''} />
        <CardContent className='p-1 sm:p-6 sm:py-1'>
          <ViewContent catalogs={catalogContainer?.catalogs} />
        </CardContent>
      </>
    );
  }

  return (
    <>
      <ViewHeader />
      <CardContent>
        <ViewContent catalogs={[]} />
      </CardContent>
    </>
  );
}
