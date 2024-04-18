import LogginButtonWrapper from '@/components/auth/login-button-wrapper';
import { PolyBackground } from '@/components/background';
import NavigationBar from '@/components/navigation-bar';
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
            <LogginButtonWrapper />
          </div>
        </NavigationBar>
        <Container>
          <Card className='py-5'>
            <ViewWrapper user={params.username} catalogId={params.catalogId} />
          </Card>
        </Container>
        <Toaster />
      </FullScreen>
    </>
  );
}
