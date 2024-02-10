import ValidateToken from '@/components/auth/validate-token';
import { PolyBackground } from '@/components/background';
import NavigationBar from '@/components/navigation-bar';
import ProfileDropdown from '@/components/profile-dropdown';
import { ModeToggle } from '@/components/toggle-theme';
import FullScreen from '@/components/ui/full-screen';
import React from 'react';

export default function EditCatalog({ params }: { params: { catalogId: string } }) {
  return (
    <>
      <ValidateToken />
      <PolyBackground />
      <FullScreen>
        <NavigationBar>
          <div className='flex justify-center items-center lg:mr-3'>
            <ModeToggle />
            <ProfileDropdown />
          </div>
        </NavigationBar>
        <p>{params.catalogId}</p>
      </FullScreen>
    </>
  );
}
