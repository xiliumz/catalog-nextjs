'use client';
import React, { useEffect } from 'react';
import { CardContent } from './ui/card';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { HOST } from '@/lib/global-var';
import { useToast } from './ui/use-toast';

const formSchema = z.object({
  name: z.string().max(100).optional(),
  password: z.string().min(8).max(100).optional(),
});

export default function ProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');
    const token = Cookies.get('session');
    if (token) myHeader.append('Authorization', token);
    const raw: { name?: string; password?: string } = {};
    if (values.name) raw.name = values.name;
    if (values.password) raw.password = values.password;

    const submitProfile = async () => {
      try {
        const response = await fetch(`${HOST}/users/current`, {
          method: 'PATCH',
          headers: myHeader,
          body: JSON.stringify(raw),
          redirect: 'follow',
        });
        const result = await response.json();

        if (response.status >= 500) {
          throw new Error('Internal server error, please contact admin');
        }
        if (!response.ok) {
          throw new Error(result.errors ? result.errors : response.statusText);
        }
        // ✅ If success
        toast({
          title: 'Success',
          description: 'Success edit profile',
          duration: 800,
        });
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } catch (error) {
        // ❌ If error
        if (error instanceof Error) {
          toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
          });
        }
      }
    };
    submitProfile();
  }

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormDescription>This is your public display name.</FormDescription>
                <FormControl>
                  <Input placeholder='Enter your name' {...field} />
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
                <FormDescription>Change your password.</FormDescription>
                <FormControl>
                  <Input data-test='profile-password-input' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-full text-right'>
            <Button className='ml-auto' type='submit' data-test='profile-submit'>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
}
