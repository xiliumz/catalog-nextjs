import { catalogProps } from '../dashboard/catalogs-container';
import ViewItem from './view-item';

interface ItemsSectionProps {
  catalogs: catalogProps[];
}

export default function ItemsSection({ catalogs }: ItemsSectionProps) {
  return (
    <div className='w-full sm:pl-4'>
      <p>Items</p>
      <div className='w-full sm:pl-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6'>
        {catalogs.map((item: any) => (
          <ViewItem title={item.title} desc={item.desc} imagePath={item.imagePath} key={item.id} tags={item.tags} />
        ))}
      </div>
    </div>
  );
}
