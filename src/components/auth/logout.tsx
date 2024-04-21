'use client';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { HOST } from '@/lib/global-var';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useToast } from '../ui/use-toast';

function Logout() {
  const router = useRouter();
  const { toast } = useToast();
  const setProgress = useContext(LoadingContext);

  useEffect(() => {
    router.prefetch('/');
  }, []);

  const onClick = () => {
    if (!setProgress) return;
    setProgress(20);
    const token = Cookies.get('session');
    const myHeaders = new Headers();
    if (token) myHeaders.append('Authorization', token);

    setProgress(80);
    fetch(`${HOST}/users/current`, {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((response) => {
        setProgress(90);
        Cookies.remove('session');
        router.push('/');
        window.location.reload();
        setProgress(90);
      })
      .catch((error) => {
        setProgress(100);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
      });
  };

  return (
    <>
      <DropdownMenuItem className='text-destructive font-semibold' onClick={onClick} data-test='logout'>
        Log out
      </DropdownMenuItem>
    </>
  );
}

export default Logout;
