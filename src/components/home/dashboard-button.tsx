'use client';
import React, { useEffect } from 'react';
import { Button, ButtonProps } from '../ui/button';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function DashboardButton({ className, variant, ...props }: ButtonProps) {
  const router = useRouter();

  useEffect(() => {
    const session = Cookies.get('session');
    if (session) router.prefetch('/dashboard');
  }, []);

  return (
    <Button
      {...props}
      onClick={() => {
        router.push('/dashboard');
      }}
      variant='ghost'
      data-test='dashboard-button'
    >
      Dashboard
    </Button>
  );
}

export default DashboardButton;
