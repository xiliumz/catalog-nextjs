'use client';
import { HOST } from '@/lib/global-var';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useToast } from '../ui/use-toast';

export default function ValidateToken() {
  const { toast } = useToast();
  useEffect(() => {
    const token = Cookies.get('session');
    if (!token) return;

    const getUser = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', token);
      try {
        const response = await fetch(`${HOST}/users/current`, {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.errors ? result.errors : 'Please login again');
      } catch (e) {
        if (e instanceof Error) {
          toast({
            title: 'Unauthorized',
            description: 'Please login again',
            variant: 'destructive',
          });
          Cookies.remove('session');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    };
    getUser();
  }, []);
  return <></>;
}
