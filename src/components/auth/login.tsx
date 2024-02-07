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
import { useMediaQuery } from '@/hooks/use-media-query';
import { HOST } from '@/lib/global-var';
import { addCustomListener, emitEvent, removeCustomListener } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import Google from '../ui/google';
import { useToast } from '../ui/use-toast';
import { RegisterForm } from './register';

interface LoginProps extends ButtonProps {}
export const LOGIN_EVENT = 'login';

export function LoginDrawerDialog({ className, variant, ...props }: LoginProps) {
  const [open, setOpenLogin] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [session, setSession] = React.useState<string | undefined>('');
  const { toast } = useToast();

  React.useEffect(() => {
    const token = Cookies.get('session');
    setSession(token);
    if (token) {
      var myHeaders = new Headers();
      myHeaders.append('Authorization', token);

      const getUser = async () => {
        try {
          const response = await fetch(`${HOST}/users/current`, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
          });
          const result = await response.json();
          const data = result.data;

          if (response.status >= 400) {
            throw new Error(result.errors ? result.errors : response.statusText);
          }
        } catch (error) {
          if (error instanceof Error) {
            Cookies.remove('session');
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: error.message,
            });
          }
        }
      };

      // Call the getUser function anywhere in your code
      getUser();
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
          <Button
            {...props}
            onClick={() => {
              emitEvent(LOGIN_EVENT);
            }}
            className={className}
            variant={variant ? variant : 'outline'}
            data-test='login-button'
          >
            Log in
          </Button>
        </DialogTrigger>
        <DialogContent data-test='login-dialog' className='sm:max-w-[425px]'>
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
        <Button
          {...props}
          className={className}
          onClick={() => {
            emitEvent(LOGIN_EVENT);
          }}
          variant={variant ? variant : 'outline'}
        >
          Log in
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

    const login = async () => {
      try {
        const response = await fetch(`${HOST}/users/login`, {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        });
        const result = await response.json();

        if (response.status >= 500) {
          throw new Error('Internal server error, please contact admin');
        }
        if (response.status >= 400) {
          throw new Error(result.errors ? result.errors : response.statusText);
        }

        const token = result.data.token;
        const decoded = jwtDecode(token);
        const exp = Math.ceil(((decoded.exp as number) - (decoded.iat as number)) / (3600 * 24));

        Cookies.set('session', token, {
          expires: exp ? exp : 7,
          sameSite: 'Strict',
          secure: true,
        });
        router.push('/dashboard');
      } catch (error) {
        if (error instanceof Error) {
          Cookies.remove('session');
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: error.message,
          });
        }
      }
    };
    login();
  }

  return (
    <>
      <Button className='h-fit w-full items-center gap-2 py-3 font-semibold' variant='outline'>
        <Google /> Continue with Google
      </Button>
      <DialogDescription className='text-center mt-6 mb-2'>Or</DialogDescription>
      <Form {...form}>
        <form data-test='login-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className='text-base py-6'
                    placeholder='Enter your email'
                    type='email'
                    data-test='email-input'
                    {...field}
                  />
                </FormControl>
                <FormMessage data-test='form-message' />
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
                  <Input
                    className='text-base py-6'
                    placeholder='Enter your password'
                    type='password'
                    data-test='password-input'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type='submit' data-test='submit-login'>
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
          data-test='register-button-login'
        >
          Create one
        </Button>
      </DialogDescription>
    </>
  );
}
