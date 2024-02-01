import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import Logout from './auth/logout';
import { Button } from './ui/button';

export default function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' data-test='profile-dropdown'>
          Profile <CircleUser className='ml-2 antialiased' strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-test='profile-dropdown-content' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href='/profile'>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
