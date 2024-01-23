import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React, { HTMLAttributes } from 'react';

const containerVariants = cva('px-4 md:px-8 w-full mx-auto w-full', {
  variants: {
    size: {
      xxl: 'xxl:w-[1536px]',
      xl: 'xl:w-[1280px]',
      lg: 'lg:w-[1024px]',
      md: 'md:w-[768px]',
      sm: 'sm:w-[640px]',
    },
  },
  defaultVariants: { size: 'xl' },
});

interface ContainerInterface extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

function Container({ children, className, size, ...props }: ContainerInterface) {
  return (
    <div className={cn(containerVariants({ size, className }))} {...props}>
      {children}
    </div>
  );
}

export default Container;
