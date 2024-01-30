import LogginButtonWrapper from '@/components/auth/login-button-wrapper';
import { WaveBackground } from '@/components/background';
import FooterHome from '@/components/home/footer';
import SearchCatalog from '@/components/home/search-catalog';
import NavigationBar from '@/components/navigation-bar';
import { ModeToggle } from '@/components/toggle-theme';
import Container from '@/components/ui/container';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <>
      <WaveBackground />
      <div className='min-h-[100vh] max-h-[100vh] flex flex-col overflow-hidden'>
        <NavigationBar>
          <div className='flex justify-center items-center'>
            <ModeToggle />
            <LogginButtonWrapper />
          </div>
        </NavigationBar>
        <Container size={'lg'} className='flex-1 flex flex-col'>
          <main className='animate-fade-up animate-duration-500 flex flex-col justify-center h-full flex-1 gap-10 md:gap-16 items-center pb-4 pt-16 sm:pt-28'>
            <h1 className='text-2xl font-semibold tracking-tight lg:text-3xl text-center leading-loose opacity-85'>
              <span className='hidden sm:block'>Craft Your Vision, Build Your Catalog: </span>Your Go-To Hub for{' '}
              <span className='text-primary'>Showcasing and Presenting</span> Catalogs
            </h1>
            <SearchCatalog />
            <FooterHome />
          </main>
        </Container>
        <Toaster />
      </div>
    </>
  );
}
