'use client';
import { catalogContainerProps } from '@/features/catalogsSlice';
import { HOST } from '@/lib/global-var';
import { cn } from '@/lib/utils';
import Cookies from 'js-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { HTMLAttributes, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useToast } from '../ui/use-toast';
import CatalogCard from './catalog-card';

export interface sessionProps extends JwtPayload {
  id: string;
}

export default function CatalogContainer({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [catalog, setCatalog] = useState<Omit<catalogContainerProps, 'catalogs'>[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const token = Cookies.get('session');
    const username = jwtDecode<sessionProps>(token as string);
    const myHeaders = new Headers();
    if (token) myHeaders.append('Authorization', token);

    async function fetchCatalogData() {
      try {
        const response = await fetch(`${HOST}/catalog/${username.id}`, {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        });
        const result = await response.json();

        if (response.status >= 500) {
          throw new Error('Internal server error, please contact admin');
        }
        if (!response.ok) {
          throw new Error(result.errors ? result.errors : response.statusText);
        }

        setCatalog(result.data.Catalog);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: error.message,
          });
        }
      }
    }

    // Example usage:
    fetchCatalogData();
  }, []);

  console.log(catalog);
  if (catalog.length > 0) {
    return (
      <div {...props} className={cn('w-full grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-x-10', className)}>
        {catalog.map((val) => {
          return <CatalogCard id={val.id} title={val.title} desc={val.desc} key={val.id} />;
        })}
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
