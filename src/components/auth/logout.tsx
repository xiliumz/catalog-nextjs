'use client';
import { HOST } from '@/lib/global-var';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useToast } from '../ui/use-toast';

function Logout() {
  const router = useRouter();
  const { toast } = useToast();

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
        router.refresh();
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
