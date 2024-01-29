import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import CatalogMoreButton from './catalog-more-button';

interface catalogCardProps {
  title: string;
  desc?: string;
}

function CatalogCard({ title, desc }: catalogCardProps) {
  return (
    <Card className='flex items-center justify-between w-full'>
      <CardHeader className='w-2/3'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className='truncate'>{desc}</CardDescription>
      </CardHeader>
      <CardFooter className='py-0'>
        <Button variant={'secondary'} size='icon'>
          <Pencil size={20} />
        </Button>
        <CatalogMoreButton />
      </CardFooter>
    </Card>
  );
}

export default CatalogCard;
