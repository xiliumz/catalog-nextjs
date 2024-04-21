'use client';
import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import CatalogMoreButton from './catalog-more-button';
import Link from 'next/link';
import { useContext } from 'react';
import { LoadingContext } from '@/contexts/LoadingProvider';

interface catalogCardProps {
  id: string;
  title: string;
  desc?: string;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onShare: (id: string) => void;
}

function CatalogCard({ id, title, desc, onDelete, onView, onShare }: catalogCardProps) {
  const setProgress = useContext(LoadingContext);

  return (
    <Card data-test='catalog-card' className='flex items-center justify-between w-full'>
      <CardHeader className='flex-grow w-2/3'>
        <CardTitle data-test='catalog-title-card' className='truncate'>
          {title}
        </CardTitle>
        <CardDescription className='truncate'>{desc}</CardDescription>
      </CardHeader>
      <CardFooter className='py-0 px-0  sm:px-4'>
        <Button
          variant={'secondary'}
          size='icon'
          data-test='edit-button'
          asChild
          onClick={() => {
            if (setProgress) setProgress(70);
          }}
        >
          <Link href={`/edit/${id}`}>
            <Pencil size={20} />
          </Link>
        </Button>
        <CatalogMoreButton
          onView={() => {
            onView(id);
          }}
          onDelete={() => onDelete(id)}
          onShare={() => onShare(id)}
        />
      </CardFooter>
    </Card>
  );
}

export default CatalogCard;
