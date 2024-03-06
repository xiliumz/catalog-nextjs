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
  onShare: () => void;
}

export default function CatalogMoreButton({ onDelete, onView, onShare }: catalogMoreButtonProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button data-test='catalog-more-card' className='ml-2' size={'icon'} variant={'outline'}>
          <MoreHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='top' align='end' alignOffset={-15} sideOffset={10}>
        <DropdownMenuItem data-test='catalog-share-card' onClick={onShare}>
          Share
        </DropdownMenuItem>
        <DropdownMenuItem data-test='catalog-view-card' onClick={onView}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem data-test='catalog-delete-card' onClick={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
