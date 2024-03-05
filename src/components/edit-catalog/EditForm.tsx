'use client';
import { HOST } from '@/lib/global-var';
import React, { useEffect, useState } from 'react';
import { catalogContainerProps, sessionProps } from '../dashboard/catalogs-container';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AddItem, CatalogFormData, CatalogItem } from '../create-catalog/catalog-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { getFileExt } from '@/lib/utils';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { HelpCircle } from 'lucide-react';
import useToken from '@/hooks/use-token';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().optional(),
  customToken: z
    .string()
    .max(50)
    .regex(/^[a-zA-Z0-9]*$/g, { message: 'Please only input leter and number' }),
  items: z
    .object({
      title: z.string().max(100),
      desc: z.string(),
    })
    .array(),
});

export default function EditForm({ catalog }: { catalog?: catalogContainerProps }) {
  // 1. Define your form.
  const { toast } = useToast();
  const router = useRouter();
  const user = useToken('id');

  const form = useForm<CatalogFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: catalog?.title,
      description: catalog?.desc || '',
      items: catalog?.catalogs,
      customToken: catalog?.custom_code ? catalog.custom_code.split('/')[1] : '',
    },
  });

  const items = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'items', // unique name for your Field Array
  });

  // 2. Define a submit handler.
  async function onSubmit(values: CatalogFormData) {
    const customCode = values.customToken;
    if (customCode) {
      if (customCode.indexOf(' ') >= 0) {
        toast({
          variant: 'destructive',
          title: 'Custom Code Error',
          description: 'Please do not put whitespace in custom code',
        });
        return;
      }
    }
    const formData = new FormData();
    const isItemsExists = values.items.length > 0;
    const token = Cookies.get('session');

    const myHeader = new Headers();
    if (token) myHeader.append('Authorization', token);
    formData.append('title', values.title);
    if (values.description) formData.append('desc', values.description);
    if (values.customToken) formData.append('customToken', `${user}/${values.customToken}`);
    if (isItemsExists) {
      formData.append(
        'items',
        JSON.stringify(
          values.items.map((item) => {
            const image = item.img?.item(0);
            if (image) {
              const ext = getFileExt(image.name);
              formData.append('images', image, `${item.id}.${ext}`);
            }
            return { id: item.id.toString(), title: item.title, desc: item.desc };
          })
        )
      );
    }

    try {
      const response = await fetch(`${HOST}/catalog/update/${catalog?.id}`, {
        method: 'PUT',
        headers: myHeader,
        body: formData,
        redirect: 'follow',
      });
      const result = await response.json();

      if (response.status >= 500) {
        throw new Error('Internal server error, please contact admin');
      }
      if (!response.ok) {
        throw new Error(result.errors ? result.errors : response.statusText);
      }
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.message,
        });
      }
    }
  }

  async function onCheckCode() {
    const value = form.getValues('customToken');
    if (!value) return;
    if (value.indexOf(' ') >= 0) {
      toast({
        variant: 'destructive',
        title: 'Custom Code Error',
        description: 'Please do not put whitespace in custom code',
      });
      return;
    }

    const token = Cookies.get('session');
    if (!token) return;
    const myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    try {
      const res = await fetch(`${HOST}/catalog/customCode`, {
        method: 'GET',
        headers: myHeaders,
      });
      const result = await res.json();
      if (res.status >= 500) {
        throw new Error('Internal server error, please contact admin');
      }
      if (!res.ok) {
        throw new Error(result.errors ? result.errors : res.statusText);
      }
      const data: { custom_code: string }[] = result.data;
      const isCodeFound = data.find((code) => code.custom_code === `${user}/${value}`);
      if (isCodeFound) {
        toast({
          variant: 'destructive',
          title: 'Code is not available',
          description: `${value} is already used`,
        });
      } else {
        toast({
          title: 'Code is available',
          description: `${value} can be used for catalog's code`,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          description: error.message,
        });
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <CardContent>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input data-test='container-title-input' required placeholder='Catalog Title' {...field} />
                  </FormControl>
                  <FormDescription>This is your catalog's title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-fit flex-wrap gap-2 mt-2'>
              <FormField
                control={form.control}
                name='customToken'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-end gap-1'>
                      <FormLabel>Custom Code</FormLabel>
                      <TooltipProvider delayDuration={400}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className='fill-foreground text-background' size={15} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This is your custom code that you can share. This will be like</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      <Input
                        className='w-fit'
                        data-test='container-code-input'
                        placeholder='MYCODE'
                        maxLength={50}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className='translate-y-6'
                data-test='check-button'
                onClick={onCheckCode}
                type='button'
                size={'sm'}
              >
                Check
              </Button>
            </div>
            <p className='text-sm font-medium leading-none text-muted-foreground my-1 ml-2'>
              {form.watch('customToken') ? `Custom Code: ${user}/${form.watch('customToken')}` : ''}
            </p>
            <br />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea data-test='container-desc-input' placeholder='This is my catalog...' {...field} />
                  </FormControl>
                  <FormDescription>This is your catalog's description. It's optional.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <FormItem>
              <FormLabel className='mb-5'>Create Catalog's items</FormLabel>
              <div className='grid gap-4 md:grid-cols-3 sm:grid-cols-2 mb-2'>
                {items.fields.map((field, index) => (
                  <CatalogItem
                    key={field.id}
                    index={index}
                    register={form.register}
                    remove={items.remove}
                    imagePath={field.imagePath}
                  />
                ))}
                <AddItem
                  data-test='add-catalog-item-button'
                  onClick={() => {
                    items.append({ title: '', desc: '', id: +new Date() });
                  }}
                />
              </div>
            </FormItem>
          </CardContent>
          <CardFooter className='justify-end gap-3'>
            <Button
              onClick={() => {
                router.push('/dashboard');
              }}
              type='button'
              variant={'destructive'}
            >
              Cancel
            </Button>
            <input
              data-test='create-submit-button'
              className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
              type='submit'
              placeholder='Submit'
            />
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
