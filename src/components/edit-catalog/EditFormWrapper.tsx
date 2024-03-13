'use client';
import React, { useEffect, useState } from 'react';
import { catalogContainerProps, sessionProps } from '../dashboard/catalogs-container';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { HOST } from '@/lib/global-var';
import { useToast } from '../ui/use-toast';
import EditForm from './EditForm';

export default function EditFormWrapper({ catalogId }: { catalogId: string }) {
  const [catalog, setCatalog] = useState<catalogContainerProps>();
  const { toast } = useToast();

  useEffect(() => {
    const token = Cookies.get('session');
    if (!token) return;

    const user = jwtDecode<sessionProps>(token);
    const getData = async () => {
      try {
        const response = await fetch(`${HOST}/catalog/${user.id}/${catalogId}`, {
          method: 'GET',
          redirect: 'follow',
        });
        const result = (await response.json()).data;

        if (!response.ok)
          throw new Error(
            result.errors ? result.errors : 'An unexpected error occurred. Please contact the administrator.'
          );
        const data: catalogContainerProps = result;
        const catalogs = data.catalogs.map((_) => {
          if (_.tags && _.tags.length > 0) {
            return { ..._, tags: _.tags.map((val) => ({ id: val.id, text: val.name })) };
          }
          return { ..._ };
        });
        setCatalog({ ...data, catalogs });
        console.log({ ...data, catalogs });
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: 'Something went wrong',
            description: e.message,
            variant: 'destructive',
          });
        }
      }
    };
    getData();
  }, []);

  if (!catalog) return <EditForm key='1' catalog={catalog} />;

  return <EditForm key='2' catalog={catalog} />;
}
