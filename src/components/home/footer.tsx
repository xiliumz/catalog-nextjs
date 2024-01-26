'use client';
import React, { useState } from 'react';
import { TypographySmall } from '../ui/typhography';
import RegisterDrawerDialog from '../auth/register-dialog';
import { LoginDrawerDialog } from '../auth/login-dialog';

function FooterHome() {
  return (
    <TypographySmall className='text-center text-muted-foreground -translate-y-16 -z-10'>
      Prefer to create catalogs instead? Click here to{' '}
      <RegisterDrawerDialog className='p-0 text-primary/60' variant='link'>
        register
      </RegisterDrawerDialog>{' '}
      or{' '}
      <LoginDrawerDialog className='p-0 text-primary/60' variant='link'>
        log in
      </LoginDrawerDialog>
      .
    </TypographySmall>
  );
}

export default FooterHome;
