import { PolyBackground } from '@/components/background';
import CatalogCard from '@/components/dashboard/catalog-card';
import CatalogContainer from '@/components/dashboard/catalogs-container';
import NavigationBar from '@/components/navigation-bar';
import ProfileDropdown from '@/components/profile-dropdown';
import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Container from '@/components/ui/container';
import EmptySpace from '@/components/ui/empty-space';
import { Plus } from 'lucide-react';

function Dashboard() {
  return (
    <>
      <PolyBackground />
      <div className='flex flex-col min-h-screen'>
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
            <Button size='sm' className='font-semibold'>
              <Plus size={16} opacity={1} className='mr-1' /> Create
            </Button>
          </div>
          {/* TODO: fix responsive problem */}
          <CatalogContainer>
            <CatalogCard
              title='Lorem ipsum dolor sit amet consectetur.'
              desc='Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi blanditiis minima explicabo quae laboriosam delectus voluptas cumque quas beatae ducimus!'
            />
            <CatalogCard
              title='Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, facilis!'
              desc='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt aut qui officia, autem molestiae asperiores ipsa laudantium nisi error nulla. Aspernatur hic animi laboriosam? Fugit eos iusto explicabo animi nisi.'
            />
            <CatalogCard
              title='Catalog 1'
              desc='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis, adipisci. Expedita voluptatem tempore quia vel, alias totam quidem esse hic molestias at, quas similique. Quo officiis laudantium fugiat aliquam voluptatibus.'
            />
          </CatalogContainer>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
