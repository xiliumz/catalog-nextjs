'use client';
import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import CatalogMoreButton from './catalog-more-button';
import { SetStateAction } from 'react';
import { catalogContainerProps } from './catalogs-container';
import { HOST } from '@/lib/global-var';
import Cookies from 'js-cookie';

interface catalogCardProps {
  id: string;
  title: string;
  desc?: string;
  onDelete: (id: string) => void;
}

function CatalogCard({ id, title, desc, onDelete }: catalogCardProps) {
  return (
    <Card className='flex items-center justify-between w-full'>
      <CardHeader className='flex-grow w-2/3'>
        <CardTitle className='truncate'>{title}</CardTitle>
        <CardDescription className='truncate'>{desc}</CardDescription>
      </CardHeader>
      <CardFooter className='py-0 px-0  sm:px-4'>
        <Button variant={'secondary'} size='icon'>
          <Pencil size={20} />
        </Button>
        <CatalogMoreButton onDelete={() => onDelete(id)} />
      </CardFooter>
    </Card>
  );
}

export default CatalogCard;
