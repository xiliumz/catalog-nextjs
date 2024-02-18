'use client';
import { HOST } from '@/lib/global-var';
import { ascendingSort, cn, descendingSort } from '@/lib/utils';
import Cookies from 'js-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { HTMLAttributes, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useToast } from '../ui/use-toast';
import CatalogCard from './catalog-card';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';

export interface catalogProps {
  id: string;
  title: string;
  desc?: string;
  imagePath?: string;
}

export interface catalogContainerProps {
  id: string;
  title: string;
  desc?: string;
  catalogs: catalogProps[];
}

export interface sessionProps extends JwtPayload {
  id: string;
  email: string;
}

export default function CatalogContainer({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [catalog, setCatalog] = useState<Omit<catalogContainerProps, 'catalogs'>[] | undefined>();
  const { toast } = useToast();
  const router = useRouter();

  const onView = (id: string) => {
    const token = Cookies.get('session');
    if (!token) return;
    const username = jwtDecode<sessionProps>(token).id;
    router.push(`/u/${username}/${id}`);
  };

  const onEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const onDelete = async (id: string) => {
    const token = Cookies.get('session');
    const myHeaders = new Headers();
    if (token) myHeaders.append('Authorization', token);

    try {
      const response = await fetch(`${HOST}/catalog/delete/${id}`, {
        method: 'DELETE',
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

      setCatalog((val) => {
        const newCatalog = val?.flatMap((item) => (item.id == id ? [] : item));
        return newCatalog;
      });
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: e.message,
        });
      }
    }
  };

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
        const data: catalogContainerProps[] = result.data.Catalog;

        if (response.status >= 500) {
          throw new Error('Internal server error, please contact admin');
        }
        if (!response.ok) {
          throw new Error(result.errors ? result.errors : response.statusText);
        }

        data.sort((a, b) => {
          return parseInt(b.id.split('-')[5]) - parseInt(a.id.split('-')[5]);
        });

        setCatalog(data);
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

  if (!catalog) {
    return (
      <div {...props} className={cn('w-full grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-x-10', className)}>
        <Skeleton className='h-[100px]' />
        <Skeleton className='h-[100px]' />
        <Skeleton className='h-[100px]' />
        <Skeleton className='h-[100px]' />
      </div>
    );
  }

  if (catalog.length > 0) {
    return (
      <div {...props} className={cn('w-full grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-x-10', className)}>
        {catalog.map((val) => {
          return (
            <CatalogCard
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              id={val.id}
              title={val.title}
              desc={val.desc}
              key={val.id}
            />
          );
        })}
      </div>
    );
  }
  return (
    <Card className='flex-grow flex flex-col'>
      <CardHeader></CardHeader>
      <CardContent data-test='dashboard-empty' className='flex-grow flex justify-center items-center'>
        You don't have any catalogs
      </CardContent>
    </Card>
  );
}
