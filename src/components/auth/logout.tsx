'use client';
import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import Cookies from 'js-cookie';
import { redirect, useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { HOST } from '@/lib/global-var';
import { useAppDispatch } from '@/hooks/store-hooks';
import { delSession } from '@/features/userSlice';
import { DropdownMenuItem } from '../ui/dropdown-menu';

function Logout() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    router.prefetch('/');
  }, []);

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
        Cookies.remove('session');
        dispatch(delSession());
        router.push('/');
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
    <DropdownMenuItem className='text-destructive font-semibold' onClick={onClick} data-test='logout'>
      Log out
    </DropdownMenuItem>
  );
}

export default Logout;
