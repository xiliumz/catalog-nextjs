'use client';
import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { useRouter } from 'next/navigation';

function DashboardButton({ className, variant, ...props }: ButtonProps) {
  const router = useRouter();

  return (
    <Button
      {...props}
      onClick={() => {
        router.push('/dashboard');
      }}
      variant='ghost'
    >
      Dashboard
    </Button>
  );
}

export default DashboardButton;
