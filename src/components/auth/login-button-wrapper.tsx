'use client';
import React, { useEffect, useState } from 'react';
import { LoginDrawerDialog } from './login';
import Cookies from 'js-cookie';
import ProfileDropdown from '../profile-dropdown';

function LogginButtonWrapper() {
  const [session, setSession] = useState<string | undefined>();

  useEffect(() => {
    const token = Cookies.get('session');
    setSession(token);
  }, []);

  if (session) {
    return <ProfileDropdown />;
  }

  return <LoginDrawerDialog size='sm' variant='ghost' />;
}

export default LogginButtonWrapper;
