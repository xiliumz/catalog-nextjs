import { InputHTMLAttributes } from 'react';
import { Input } from './input';

function SearchInput({ children, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <Input className='outline-none ring-0' placeholder='Search catalogs using id or code...' {...props} />;
}

export default SearchInput;
