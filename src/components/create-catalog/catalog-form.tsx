'use client';
import { Plus } from 'lucide-react';
import { HTMLAttributes, useState } from 'react';
import { FieldValues, UseFieldArrayRemove, UseFormRegister, useFieldArray, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { CardContent, CardFooter } from '../ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Cookies from 'js-cookie';
import { HOST } from '@/lib/global-var';
import { useToast } from '../ui/use-toast';
import { getFileExt, renameFile } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { catalogProps } from '../dashboard/catalogs-container';

interface itemProps extends Omit<catalogProps, 'id' | 'img'> {
  id: number;
  img?: FileList;
}

export interface FormData extends FieldValues {
  title: string;
  description?: string;
  items: itemProps[];
}

export default function CatalogForm() {
  // 1. Define your form.
  const { toast } = useToast();
  const router = useRouter();

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
  async function onSubmit(values: FormData) {
    const formData = new FormData();
    const isItemsExists = values.items.length > 0;
    const token = Cookies.get('session');

    const myHeader = new Headers();

    if (token) myHeader.append('Authorization', token);
    formData.append('title', values.title);
    if (values.description) formData.append('desc', values.description);
    if (isItemsExists) {
      formData.append(
        'items',
        JSON.stringify(
          values.items.map((item) => {
            const image = item.img?.item(0);
            if (image) {
              const ext = getFileExt(image.name);
              formData.append('images', image, `${item.id}.${ext}`);
              console.log(`${item.id}.${ext}`);
            }
            return { id: item.id.toString(), title: item.title, desc: item.desc };
          })
        )
      );
    }

    try {
      const response = await fetch(`${HOST}/catalog/create`, {
        method: 'POST',
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
                    <Input data-test='container-title-input' required placeholder='Catalog 1' {...field} />
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
                  <CatalogItem key={field.id} index={index} register={form.register} remove={items.remove} />
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
          <CardFooter className='justify-end'>
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
  remove: UseFieldArrayRemove;
}

export function CatalogItem({ index, register, remove }: catalogItemProps) {
  const [fileName, setFileName] = useState('');

  // TODO: fix responsive
  return (
    <div
      data-test='catalog-item'
      className='border flex flex-col justify-evenly items-center gap-2 min-h-40 py-5 rounded-[var(--radius)]'
    >
      <FormItem>
        <FormLabel htmlFor={`item-title${index}`}>Title</FormLabel>
        <Input
          data-test='item-title-input'
          className='rounded-sm my-2'
          id={`item-title${index}`}
          placeholder='Title'
          {...register(`items.${index}.title` as const, {})}
        />
      </FormItem>

      {/* TODO: fix rezize so textarea can fit the remaining height */}
      {/* TODO: fix textarea not align with the title */}
      <FormItem>
        <FormLabel htmlFor={`item-value${index}`}>Description</FormLabel>
        <Textarea
          data-test='item-desc-input'
          className='my-2 resize-y'
          id={`item-value${index}`}
          placeholder='Description'
          {...register(`items.${index}.desc` as const, {})}
        />
      </FormItem>

      <FormItem className='mt-2'>
        <FormLabel
          className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 text-muted-foreground rounded mr-28'
          htmlFor={`item-img${index}`}
          data-test='item-file-input'
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
        onClick={() => {
          remove(index);
        }}
        className='text-destructive/80 font-semibold hover:text-destructive hover:font-bold'
      >
        DELETE
      </Button>
    </div>
  );
}
