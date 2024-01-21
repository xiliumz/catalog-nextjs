import { cva } from 'class-variance-authority';
import React, { InputHTMLAttributes } from 'react';
import { Input } from './input';

// TODO: Create search component that works well

function SearchInput({ children, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <Input className='outline-none ring-0' placeholder='Search catalogs using id or code...' {...props} />;
}

export default SearchInput;
