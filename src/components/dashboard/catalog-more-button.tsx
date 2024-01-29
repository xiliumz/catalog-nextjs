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

export default function CatalogMoreButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <MoreHorizontal size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='top' align='start' alignOffset={-3} sideOffset={-2}>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
