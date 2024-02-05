import { PolyBackground } from '@/components/background';
import CatalogForm from '@/components/create-catalog/catalog-form';
import NavigationBar from '@/components/navigation-bar';
import ProfileDropdown from '@/components/profile-dropdown';
import { ModeToggle } from '@/components/toggle-theme';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Container from '@/components/ui/container';
import FullScreen from '@/components/ui/full-screen';
import { Toaster } from '@/components/ui/toaster';

export default function CreateCatalog() {
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
        <Container className='flex py-5' size='lg'>
          <Card className='flex-grow border-2'>
            <CardHeader>
              <CardTitle>Create Catalog</CardTitle>
            </CardHeader>
            <CatalogForm />
          </Card>
        </Container>
        <Toaster />
      </FullScreen>
    </>
  );
}
