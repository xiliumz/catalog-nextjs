'use client';
import React, { HTMLAttributes, useState } from 'react';
import { CardContent, CardFooter } from '../ui/card';
import { z } from 'zod';
import { FieldValues, UseFormRegister, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Plus } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(50).optional(),
  itemTitle: z.string(),
});

export interface FormData extends FieldValues {
  title: string;
  description: string;
  items: Omit<catalogItemProps, 'index' | 'register'>[];
}

export default function CatalogForm() {
  // 1. Define your form.
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: '',
  //     description: '',
  //   },
  // });
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
  //   control: form.control, // control props comes from useForm (optional: if you are using FormContext)
  //   name: 'itemTitle', // unique name for your Field Array
  // });

  // // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  // 1. Define your form.
  const form = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      items: [],
    },
  });
  form.register;
  const items = useFieldArray({
    control: form.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'items', // unique name for your Field Array
  });

  // 2. Define a submit handler.
  function onSubmit(values: any) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    console.log(values.items[0].img);
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
                    <Input required placeholder='Catalog 1' {...field} />
                  </FormControl>
                  <FormDescription>This is your catalog's title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='This is my catalog...' {...field} />
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
                  <CatalogItem key={field.id} index={index} register={form.register} />
                ))}
                <AddItem
                  onClick={() => {
                    items.append({ title: '', desc: '' });
                  }}
                />
              </div>
            </FormItem>
          </CardContent>
          <CardFooter className='justify-end'>
            <input
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

export function AddItem({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div
        className='border rounded-[var(--radius)] text-muted-foreground flex flex-col justify-center items-center hover:cursor-pointer hover:text-accent-foreground h-40'
        {...props}
      >
        <Plus className='' size={48} />
        <p>Create item</p>
      </div>
    </>
  );
}

export interface catalogItemProps {
  index: number;
  register: UseFormRegister<FormData>;
  title?: string;
  desc?: string;
  img?: any;
}

export function CatalogItem({ index, register }: catalogItemProps) {
  const [fileName, setFileName] = useState('');

  return (
    <div className='border rounded flex flex-col justify-evenly items-center gap-2 min-h-40 py-5'>
      <FormItem>
        <FormLabel htmlFor={`item-title${index}`}>Title</FormLabel>
        <Input
          className='rounded-sm my-2'
          id={`item-title${index}`}
          placeholder='Title'
          {...register(`items.${index}.title` as const, {})}
        />
      </FormItem>

      <FormItem>
        <FormLabel htmlFor={`item-value${index}`}>Description</FormLabel>
        <Input
          className='rounded-sm my-2'
          id={`item-value${index}`}
          placeholder='Description'
          {...register(`items.${index}.desc` as const, {})}
        />
      </FormItem>

      <FormItem className='mt-2'>
        <FormLabel
          className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 text-muted-foreground rounded mr-28'
          htmlFor={`item-img${index}`}
        >
          Upload image
        </FormLabel>
        <p>{fileName}</p>
        <Input
          className='absolute w-0 h-0 -z-50'
          id={`item-img${index}`}
          {...register(`items.${index}.img` as const, {})}
          type='file'
          onChange={(e) => {
            const file = e.target.files;
            if (file === null) return;
            setFileName(file.length > 0 ? file[0].name : '');
          }}
          accept='image/*'
        />
      </FormItem>

      <Button
        size={'sm'}
        variant={'ghost'}
        type='button'
        className='text-destructive/80 font-semibold hover:text-destructive hover:font-bold'
      >
        DELETE
      </Button>
    </div>
  );
}
