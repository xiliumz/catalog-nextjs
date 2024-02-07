'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import React from 'react';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';

export interface catalogMoreButtonProps {
  onDelete: () => void;
  onView: () => void;
}

export default function CatalogMoreButton({ onDelete, onView }: catalogMoreButtonProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className='ml-2' size={'icon'} variant={'outline'}>
          <MoreHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='top' align='end' alignOffset={-15} sideOffset={10}>
        <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
