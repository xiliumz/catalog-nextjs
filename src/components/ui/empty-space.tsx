import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React, { HTMLAttributes } from 'react';

const emptyVariants = cva('w-full', {
  variants: {
    size: {
      small: 'h-[5vh]',
      medium: 'h-[10vh]',
      big: 'h-[15vh]',
    },
  },
  defaultVariants: {
    size: 'big',
  },
});

export interface EmptySpaceProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof emptyVariants> {}

function EmptySpace({ className, size, ...props }: EmptySpaceProps) {
  return <div className={cn(emptyVariants({ size, className }))} {...props}></div>;
}

export default EmptySpace;
