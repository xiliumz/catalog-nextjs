'use client';
import React, { useEffect, useState } from 'react';
import { LoginDrawerDialog } from './login';
import DashboardButton from '../home/dashboard-button';
import Cookies from 'js-cookie';

function LogginButtonWrapper() {
  const [session, setSession] = useState<string | undefined>();

  useEffect(() => {
    const token = Cookies.get('session');
    setSession(token);
  }, []);

  if (session) {
    return <DashboardButton />;
  }

  return <LoginDrawerDialog size='sm' variant='ghost' />;
}

export default LogginButtonWrapper;
