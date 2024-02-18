import Image from 'next/image';
import { catalogProps } from '../dashboard/catalogs-container';
import { AspectRatio } from '../ui/aspect-ratio';

export default function ViewItem({ title, desc, imagePath = '' }: Omit<catalogProps, 'id'>) {
  return (
    <div className='shadow-md rounded-sm px-3 py-4'>
      <AspectRatio ratio={1 / 1}>
        {/* TODO: Create an option for whether the user wants to display the image full or fit */}
        <Image
          className='bg-muted rounded-sm w-full h-full object-cover transition-all hover:scale-105 portrait:'
          width={500}
          height={500}
          alt=''
          src={`${process.env.host}/${imagePath}`}
          quality={50}
          priority={true}
        />
      </AspectRatio>
      <h3 className='scroll-m-20 text-xl font-semibold tracking-tight mt-5'>{title}</h3>
      <p className='text-sm text-muted-foreground mt-2'>{desc}</p>
    </div>
  );
}
