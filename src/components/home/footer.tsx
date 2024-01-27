'use client';
import React, { useState } from 'react';
import { TypographySmall } from '../ui/typhography';
import RegisterDrawerDialog from '../auth/register-dialog';
import { LoginDrawerDialog } from '../auth/login-dialog';
import { useAppSelector } from '@/hooks/store-hooks';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function FooterHome() {
  const router = useRouter();
  const session = useAppSelector((s) => s.user.session);
  if (session) {
    return (
      <TypographySmall className='text-center text-muted-foreground -translate-y-16 -z-10'>
        Prefer to create catalogs instead? Click here to go to{' '}
        <Button
          className='p-0'
          variant='link'
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          dashboard
        </Button>
      </TypographySmall>
    );
  }
  return (
    <TypographySmall className='text-center text-muted-foreground -translate-y-16 -z-10'>
      Prefer to create catalogs instead? Click here to{' '}
      <RegisterDrawerDialog className='p-0 text-primary/60' variant='link' /> or{' '}
      <LoginDrawerDialog className='p-0 text-primary/60' variant='link' />.
    </TypographySmall>
  );
}

export default FooterHome;
