import { CheckedState } from '@radix-ui/react-checkbox';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface ViewTagProps {
  id: string;
  tag: string;
  handleCheckboxChange: (e: CheckedState, id: string) => void;
}

export default function ViewTag({ id, tag, handleCheckboxChange }: ViewTagProps) {
  return (
    <>
      {/* <div className='sm:w-1/4 sm:px-5 sm:py-5 w-fit'> */}
      <div className='flex items-center gap-2 p-1'>
        <Checkbox className='rounded' id={id} onCheckedChange={(e) => handleCheckboxChange(e, id)} />
        <Label
          className='w-full inline font-semibold text-nowrap p-1 bg-secondary text-secondary-foreground rounded'
          htmlFor={id}
        >
          {tag}
        </Label>
      </div>
      {/* </div> */}
    </>
  );
}
