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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' data-test='profile-dropdown'>
          {/* TODO: change with user's username */}
          Profile <CircleUser className='ml-2 antialiased' strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-test='profile-dropdown-content' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {/* TODO: add dashboard */}
        <DropdownMenuSeparator />
        <Link href='/profile'>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
