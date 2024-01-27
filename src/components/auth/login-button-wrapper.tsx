'use client';
import { useAppSelector } from '@/hooks/store-hooks';
import React from 'react';
import { LoginDrawerDialog } from './login-dialog';
import DashboardButton from '../home/dashboard-button';

function LogginButtonWrapper() {
  const session = useAppSelector((s) => s.user.session);

  if (session) {
    return <DashboardButton />;
  }

  return <LoginDrawerDialog size='sm' variant='ghost' />;
}

export default LogginButtonWrapper;
