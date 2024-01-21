'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMediaQuery } from '@/hooks/use-media-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import Google from './ui/google';

interface AutheticationProps extends ButtonProps {
  authenticationMode?: 'login' | 'register';
}

export function AuthenticationDrawerDialog({
  children,
  className,
  variant,
  authenticationMode,
  ...props
}: AutheticationProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={className} variant={variant ? variant : 'outline'}>
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <div className='px-3 py-6'>
            <DialogHeader className='mb-10 text-muted-foreground'>
              <DialogTitle className='text-center'>Welcome to Cataog App</DialogTitle>
            </DialogHeader>
            <Button className='h-fit w-full items-center gap-2 py-3 font-semibold' variant='outline'>
              <Google /> Continue with Google
            </Button>
            <DialogDescription className='text-center mt-6 mb-2'>Or</DialogDescription>
            {authenticationMode !== 'register' ? <LoginForm /> : <RegisterForm />}
            <DialogDescription className='text-center mt-6'>
              No account?{' '}
              <Button className='p-0 text-primary/60' variant='link'>
                Create one
              </Button>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className={className} variant={variant ? variant : 'outline'}>
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here. Click save when you're done.</DrawerDescription>
        </DrawerHeader>
        <div className='px-4'>
          {authenticationMode !== 'register' ? <LoginForm /> : <RegisterForm className='px-4' />}
        </div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// TODO: Create form
const formSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().min(6, { message: 'Password must contain at least 6 character(s)' }),
});

export function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
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
  );
}

// function LoginForm({ className }: React.ComponentProps<'form'>) {
//   return (
//     <form className={cn('grid items-start gap-4', className)}>
//       <div className='grid gap-2'>
//         <Label htmlFor='email'>Email</Label>
//         <Input type='email' id='email' defaultValue='shadcn@example.com' />
//       </div>
//       <div className='grid gap-2'>
//         <Label htmlFor='username'>Username</Label>
//         <Input id='username' defaultValue='@shadcn' />
//       </div>
//       <Button type='submit'>Save changes</Button>
//     </form>
//   );
// }

function RegisterForm({ className }: React.ComponentProps<'form'>) {
  return (
    <form className={cn('grid items-start gap-4', className)}>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Email</Label>
        <Input type='email' id='email' defaultValue='shadcn@example.com' />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' defaultValue='@shadcn' />
      </div>
      <Button type='submit'>Save changes</Button>
    </form>
  );
}
