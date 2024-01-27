import LogginButtonWrapper from '@/components/auth/login-button-wrapper';
import { LoginDrawerDialog } from '@/components/auth/login-dialog';
import RegisterDrawerDialog from '@/components/auth/register-dialog';
import FooterHome from '@/components/home/footer';
import SearchCatalog from '@/components/home/search-catalog';
import NavigationBar from '@/components/navigation-bar';
import { ModeToggle } from '@/components/toggle-theme';
import Container from '@/components/ui/container';
import { Toaster } from '@/components/ui/toaster';
import { TypographySmall } from '@/components/ui/typhography';

export default function Home() {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        className='absolute -z-10 bottom-0'
        preserveAspectRatio='none'
        viewBox='0 0 1440 560'
      >
        <g mask='url("#SvgjsMask1229")' fill='none'>
          <path
            d='M 0,292 C 96,255.4 288,98.2 480,109 C 672,119.8 768,314.6 960,346 C 1152,377.4 1344,282 1440,266L1440 560L0 560z'
            fill='rgba(37, 100, 235, 0.07)'
          ></path>
        </g>
        <defs>
          <mask id='SvgjsMask1229'>
            <rect width='1440' height='560' fill='#ffffff'></rect>
          </mask>
        </defs>
      </svg>
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
