'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button, ButtonProps } from './ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { addCustomListener, emitEvent, removeCustomListener } from '@/lib/utils';
import { LoginForm } from './login-dialog';

interface RegisterProps extends ButtonProps {}

const REGISTER_EVENT = 'register';

function RegisterDrawerDialog({ children, className, variant, ...props }: RegisterProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    addCustomListener(REGISTER_EVENT, () => {
      setIsLogin(false);
    });
    return () => removeCustomListener(REGISTER_EVENT, () => {});
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              emitEvent(REGISTER_EVENT);
            }}
            className={className}
            variant={variant ? variant : 'outline'}
          >
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <div className='px-3 py-6'>
            <DialogHeader className='mb-10 text-muted-foreground'>
              <DialogTitle className='text-center'>Welcome to Cataog App</DialogTitle>
            </DialogHeader>
            {!isLogin ? <RegisterForm setIsLogin={setIsLogin} /> : <LoginForm setIsLogin={setIsLogin} />}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          {...props}
          onClick={() => {
            emitEvent(REGISTER_EVENT);
          }}
          className={className}
          variant={variant ? variant : 'outline'}
        >
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='px-4 py-5'>
          <DialogHeader className='mb-10 text-muted-foreground'>
            <DialogTitle className='text-center'>Welcome to Cataog App</DialogTitle>
          </DialogHeader>
          {!isLogin ? <RegisterForm setIsLogin={setIsLogin} /> : <LoginForm setIsLogin={setIsLogin} />}{' '}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default RegisterDrawerDialog;

const registerSchema = z.object({
  username: z.string().min(6, { message: 'Username must contain at least 6 characters' }),
  email: z.string().email().max(100),
  password: z.string().min(6, { message: 'Password must contain at least 6 characters' }),
});

export function RegisterForm({ setIsLogin }: { setIsLogin: React.Dispatch<React.SetStateAction<boolean>> }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className='text-base py-6' placeholder='Enter your username' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            Create account
          </Button>
        </form>
      </Form>
      <DialogDescription className='text-center mt-6'>
        Already have an account?{' '}
        <Button
          className='p-0 text-primary/60'
          variant='link'
          onClick={() => {
            setIsLogin(true);
          }}
        >
          Log in
        </Button>
      </DialogDescription>
    </>
  );
}
