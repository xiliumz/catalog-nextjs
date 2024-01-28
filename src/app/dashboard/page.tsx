import { PolyBackground } from '@/components/background';
import NavigationBar from '@/components/navigation-bar';
import ProfileDropdown from '@/components/profile-dropdown';
import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Container from '@/components/ui/container';

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
        <Container className='flex-grow flex gap-4 flex-col py-10'>
          <div className='flex w-full justify-end'>
            <Button size='sm'>Create</Button>
          </div>
          <Card className='flex-grow flex flex-col'>
            <CardHeader></CardHeader>
            <CardContent className='flex-grow flex justify-center items-center text-muted-foreground'>
              You don't have any catalogs
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
