import { CheckedState } from '@radix-ui/react-checkbox';
import ViewTag from './view-tag';

interface TagsSectionProps {
  tags: { id: string; name: string }[];
  handleCheckboxChange: (e: CheckedState, id: string) => void;
}

export default function TagsSection({ tags, handleCheckboxChange }: TagsSectionProps) {
  return (
    <div>
      <p>Tags</p>
      <div className='flex sm:flex-col flex-wrap justify-evenly sm:justify-start pr-2'>
        {tags && tags.length > 0
          ? tags.map((tag: any) => (
              <ViewTag key={tag.id} id={tag.id} tag={tag.name} handleCheckboxChange={handleCheckboxChange} />
            ))
          : null}
      </div>
    </div>
  );
}
