import { PolyBackground } from '@/components/background';
import NavigationBar from '@/components/navigation-bar';
import ProfileDropdown from '@/components/profile-dropdown';
import { ModeToggle } from '@/components/toggle-theme';
import React from 'react';

export default function Profile() {
  return (
    <>
      <PolyBackground />
      <NavigationBar>
        <div className='flex justify-center items-center lg:mr-3'>
          <ModeToggle />
          <ProfileDropdown />
        </div>
      </NavigationBar>
    </>
  );
}
