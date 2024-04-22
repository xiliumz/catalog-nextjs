import Image from 'next/image';
import { catalogProps } from '../dashboard/catalogs-container';
import { AspectRatio } from '../ui/aspect-ratio';
import NoImage from '../no-image';
import { Badge } from '../ui/badge';

interface ViewItemProps extends Omit<catalogProps, 'id'> {
  tags: { id: string; name: string }[] | undefined;
}

export default function ViewItem({ title, desc, imagePath = '', tags }: ViewItemProps) {
  const _url = imagePath ? imagePath.split('o.o')[1] : '';
  return (
    <div className='shadow-md rounded-sm px-3 py-4'>
      <AspectRatio ratio={1 / 1}>
        {_url ? (
          <Image
            className='rounded-sm w-full h-full object-contain transition-all hover:scale-105 portrait:'
            width={500}
            height={500}
            alt=''
            src={_url}
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
      <div className='space-x-1'>
        {tags && tags.length > 0 ? (
          tags.map((tag) => (
            <Badge variant={'secondary'} key={tag.id}>
              {tag.name}
            </Badge>
          ))
        ) : (
          <></>
        )}
      </div>
      <p className='text-sm text-foreground mt-2' data-test='view-item-desc'>
        {desc}
      </p>
    </div>
  );
}
