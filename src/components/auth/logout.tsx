'use client';
import React from 'react';
import { Button } from '../ui/button';
import Cookies from 'js-cookie';
import { redirect, useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { HOST } from '@/lib/global-var';

function Logout() {
  const router = useRouter();
  const { toast } = useToast();

  const onClick = () => {
    const token = Cookies.get('session');
    const myHeaders = new Headers();
    if (token) myHeaders.append('Authorization', token);

    fetch(`${HOST}/users/current`, {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((response) => {
        router.push('/');
        Cookies.remove('session');
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
      });
  };

  return (
    <Button variant='ghost' size='sm' onClick={onClick}>
      Log out
    </Button>
  );
}

export default Logout;
