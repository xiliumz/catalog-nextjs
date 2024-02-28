import ValidateToken from '@/components/auth/validate-token';
import { PolyBackground } from '@/components/background';
import NavigationBar from '@/components/navigation-bar';
import ProfileForm from '@/components/profile';
import ProfileDropdown from '@/components/profile-dropdown';
import { ModeToggle } from '@/components/toggle-theme';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Container from '@/components/ui/container';
import FullScreen from '@/components/ui/full-screen';

export default function Profile() {
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
        <Container className='flex-grow flex gap-4 flex-col py-5'>
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <ProfileForm />
          </Card>
        </Container>
      </FullScreen>
    </>
  );
}
