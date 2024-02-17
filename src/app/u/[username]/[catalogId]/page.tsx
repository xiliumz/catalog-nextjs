import { PolyBackground } from '@/components/background';
import NavigationBar from '@/components/navigation-bar';
import ProfileDropdown from '@/components/profile-dropdown';
import { ModeToggle } from '@/components/toggle-theme';
import { Card } from '@/components/ui/card';
import Container from '@/components/ui/container';
import FullScreen from '@/components/ui/full-screen';
import { Toaster } from '@/components/ui/toaster';
import ViewWrapper from '@/components/view-catalog/view-wrapper';

export default function ViewCatalog({ params }: { params: { username: string; catalogId: string } }) {
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
        <br />
        <Container>
          <Card>
            <ViewWrapper user={params.username} catalogId={params.catalogId} />
          </Card>
        </Container>
        <Toaster />
      </FullScreen>
    </>
  );
}
