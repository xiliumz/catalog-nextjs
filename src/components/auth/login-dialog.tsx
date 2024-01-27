'use client';
import * as React from 'react';

import { Button, ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { setSession, setUser } from '@/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { useMediaQuery } from '@/hooks/use-media-query';
import { HOST } from '@/lib/global-var';
import { addCustomListener, emitEvent, removeCustomListener } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Google from '../ui/google';
import { useToast } from '../ui/use-toast';
import { RegisterForm } from './register-dialog';

interface LoginProps extends ButtonProps {}
export const LOGIN_EVENT = 'login';

export function LoginDrawerDialog({ className, variant, ...props }: LoginProps) {
  const [open, setOpenLogin] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const session = useAppSelector((s) => s.user.session);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  React.useEffect(() => {
    const token = Cookies.get('session');
    if (token) {
      dispatch(setSession(token));
      var myHeaders = new Headers();
      myHeaders.append('Authorization', token);

      fetch(`${HOST}/users/current`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      })
        .then((response) => response.json())
        .then((result) => {
          const data = result.data;
          dispatch(setUser(data));
        })
        .catch((error) => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: error.message,
          });
        });
    }

    addCustomListener(LOGIN_EVENT, () => {
      setIsLogin(true);
    });
    return () => {
      removeCustomListener(LOGIN_EVENT, () => {});
    };
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(e) => setOpenLogin(e)}>
        <DialogTrigger asChild>
          {/* TODO: Fix on click */}
          <Button
            {...props}
            onClick={() => {
              if (!session) {
                emitEvent(LOGIN_EVENT);
                return;
              }
            }}
            className={className}
            variant={variant ? variant : 'outline'}
          >
            {!session ? `Log in` : `Dashboard`}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <div className='px-3 py-6'>
            <DialogHeader className='mb-10 text-muted-foreground'>
              <DialogTitle className='text-center'>Welcome to Cataog App</DialogTitle>
            </DialogHeader>
            {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpenLogin}>
      <DrawerTrigger asChild>
        {/* TODO: Fix on click */}
        <Button
          {...props}
          className={className}
          onClick={() => {
            if (!session) {
              emitEvent(LOGIN_EVENT);
              return;
            }
          }}
          variant={variant ? variant : 'outline'}
        >
          {!session ? `Log in` : `Dashboard`}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='px-4 py-5'>
          <DialogHeader className='mb-10 text-muted-foreground'>
            <DialogTitle className='text-center'>Welcome to Cataog App</DialogTitle>
          </DialogHeader>
          {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

const loginSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6, { message: 'Password must contain at least 6 characters' }),
});

export function LoginForm({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    fetch(`${HOST}/users/login`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    })
      .then((response) => {
        if (response.status >= 500) throw new Error('Internal server error, please contact admin');
        return response.json();
      })
      .then((result: any) => {
        const token = result.data.token;
        Cookies.set('session', token);
        dispatch(setSession(token));
        router.push('/dashboard');
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: error.message,
          });
        }
      });
  }

  return (
    <>
      <Button className='h-fit w-full items-center gap-2 py-3 font-semibold' variant='outline'>
        <Google /> Continue with Google
      </Button>
      <DialogDescription className='text-center mt-6 mb-2'>Or</DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className='text-base py-6' placeholder='Enter your email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input className='text-base py-6' placeholder='Enter your password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type='submit'>
            Log in
          </Button>
        </form>
      </Form>
      <DialogDescription className='text-center mt-6'>
        No account?{' '}
        <Button
          className='p-0 text-primary/60'
          onClick={() => {
            setIsLogin(false);
          }}
          variant='link'
        >
          Create one
        </Button>
      </DialogDescription>
    </>
  );
}
