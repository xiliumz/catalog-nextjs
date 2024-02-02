import { Plus } from 'lucide-react';
import React from 'react';

export default function AddItem() {
  return (
    <div className='border rounded-[var(--radius)] text-muted flex flex-col justify-center items-center hover:cursor-pointer hover:text-muted-foreground h-40'>
      <Plus className='' size={48} />
      <p>Create item</p>
    </div>
  );
}
