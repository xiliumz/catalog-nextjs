import { PolyBackground } from '@/components/background';
import CatalogCard from '@/components/dashboard/catalog-card';
import CatalogContainer from '@/components/dashboard/catalogs-container';
import NavigationBar from '@/components/navigation-bar';
import ProfileDropdown from '@/components/profile-dropdown';
import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import EmptySpace from '@/components/ui/empty-space';
import FullScreen from '@/components/ui/full-screen';
import { Toaster } from '@/components/ui/toaster';
import { Plus } from 'lucide-react';
import Link from 'next/link';

function Dashboard() {
  return (
    <>
      <PolyBackground />
      <FullScreen>
        <NavigationBar>
          <div className='flex justify-center items-center lg:mr-3'>
            <ModeToggle />
            <ProfileDropdown />
          </div>
        </NavigationBar>
        <EmptySpace size='small' />
        <Container className='flex-grow flex gap-4 flex-col py-10'>
          <div className='flex w-full justify-between'>
            <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl'> dashboard</h1>
            <Link data-test='create-catalog-button' href='/create'>
              <Button size='sm' className='font-semibold'>
                <Plus size={16} opacity={1} className='mr-1' /> Create
              </Button>
            </Link>
          </div>
          <CatalogContainer />
        </Container>
        <Toaster />
      </FullScreen>
    </>
  );
}

export default Dashboard;
