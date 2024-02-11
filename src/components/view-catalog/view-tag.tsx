import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

export interface tagProps {
  id: string;
  tag: string;
}

export default function ViewTag({ id, tag }: tagProps) {
  return (
    <div className='w-1/4 px-5 py-5'>
      <div className='flex items-center gap-2 p-1 '>
        <Checkbox className='rounded' id={id} />
        <Label className='w-full' htmlFor={id}>
          ${tag}
        </Label>
      </div>
    </div>
  );
}
