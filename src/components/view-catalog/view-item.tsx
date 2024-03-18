import Image from 'next/image';
import { catalogProps } from '../dashboard/catalogs-container';
import { AspectRatio } from '../ui/aspect-ratio';
import NoImage from '../no-image';

export default function ViewItem({ title, desc, imagePath = '' }: Omit<catalogProps, 'id'>) {
  return (
    <div className='shadow-md rounded-sm px-3 py-4'>
      <AspectRatio ratio={1 / 1}>
        {imagePath ? (
          <Image
            className='bg-muted rounded-sm w-full h-full object-cover transition-all hover:scale-105 portrait:'
            width={500}
            height={500}
            alt=''
            src={`${process.env.host}/${imagePath}`}
            quality={50}
            priority={true}
            data-test='view-item-image'
          />
        ) : (
          <NoImage
            width={500}
            height={500}
            quality={50}
            priority
            className='bg-muted rounded-sm w-full h-full object-cover transition-all hover:scale-105 portrait:'
            data-test='view-item-image'
          />
        )}
      </AspectRatio>
      <h3 className='scroll-m-20 text-xl font-semibold tracking-tight mt-5' data-test='view-item-title'>
        {title}
      </h3>
      <p className='text-sm text-muted-foreground mt-2' data-test='view-item-desc'>
        {desc}
      </p>
    </div>
  );
}
