'use client';
import React, { useEffect, useState } from 'react';
import { TypographySmall } from '../ui/typhography';
import RegisterDrawerDialog from '../auth/register';
import { LoginDrawerDialog } from '../auth/login';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function FooterHome() {
  const router = useRouter();
  const [session, setSession] = useState<string | undefined>();

  useEffect(() => {
    const token = Cookies.get('session');
    setSession(token);
  }, []);

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
