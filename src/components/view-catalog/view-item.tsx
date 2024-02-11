import React from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';

export default function ViewItem() {
  return (
    <div className='shadow-md rounded-sm px-3 py-4'>
      <AspectRatio ratio={1 / 1}>
        {/* TODO: Create an option for whether the user wants to display the image full or fit */}
        <Image
          className='bg-muted rounded-sm w-full h-full object-cover transition-all hover:scale-105 portrait:'
          width={500}
          height={500}
          alt=''
          // fill={true}
          src={
            'https://images.unsplash.com/photo-1590099914662-a76f2f83b802?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8OSUzQTE2fGVufDB8fDB8fHww'
          }
        />
      </AspectRatio>
      <h3 className='scroll-m-20 text-xl font-semibold tracking-tight mt-5'>Title</h3>
      <p className='text-sm text-muted-foreground mt-2'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, quaerat.
      </p>
    </div>
  );
}
