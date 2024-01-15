import { ModeToggle } from '@/components/toggle-theme';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <nav className='flex'>
        <div>catalog</div>
        <ModeToggle />
      </nav>
    </>
  );
}
