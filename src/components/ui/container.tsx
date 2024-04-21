import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import React, { HTMLAttributes } from 'react';

const containerVariants = cva('md:px-8 w-full mx-auto w-full', {
  variants: {
    size: {
      xxl: 'xxl:w-[1536px]',
      xl: 'xl:w-[1265px]',
      lg: 'lg:w-[1012px]',
      md: 'md:w-[756px]',
      sm: 'sm:w-[628px]',
    },
  },
  defaultVariants: { size: 'xl' },
});

export interface containerVariantsProps extends VariantProps<typeof containerVariants> {}

interface ContainerInterface extends HTMLAttributes<HTMLDivElement>, containerVariantsProps {}

function Container({ children, className, size, ...props }: ContainerInterface) {
  return (
    <div className={cn(containerVariants({ size, className }))} {...props}>
      {children}
    </div>
  );
}

export default Container;
