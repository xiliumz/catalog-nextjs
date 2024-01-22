import { LoginDrawerDialog } from '@/components/login-dialog';
import RegisterDrawerDialog from '@/components/register-dialog';
import SearchCatalog from '@/components/search-catalog';
import { ModeToggle } from '@/components/toggle-theme';
import Container from '@/components/ui/container';
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
        <nav className='container flex w-full justify-between items-center px-4 pt-3'>
          <div className='scroll-m-20 text-2xl font-semibold tracking-tight'>catalog</div>
          <div className='flex justify-center items-center'>
            <ModeToggle />
            <LoginDrawerDialog size='sm' variant='ghost'>
              Log in
            </LoginDrawerDialog>
          </div>
        </nav>
        <Container size={'lg'} className='flex-1 flex flex-col'>
          <main className='animate-fade-up animate-duration-500 flex flex-col justify-center h-full flex-1 gap-10 md:gap-16 items-center pb-4 pt-16 sm:pt-28'>
            <h1 className='text-2xl font-semibold tracking-tight lg:text-3xl text-center leading-loose opacity-85'>
              <span className='hidden sm:block'>Craft Your Vision, Build Your Catalog: </span>Your Go-To Hub for{' '}
              <span className='text-primary'>Showcasing and Presenting</span> Catalogs
            </h1>
            <SearchCatalog />
            <TypographySmall className='text-center text-muted-foreground -translate-y-16 -z-10'>
              Prefer to create catalogs instead? Click here to{' '}
              <RegisterDrawerDialog className='p-0 text-primary/60' variant='link'>
                register
              </RegisterDrawerDialog>{' '}
              or{' '}
              <LoginDrawerDialog className='p-0 text-primary/60' variant='link'>
                log in
              </LoginDrawerDialog>
              .
            </TypographySmall>
          </main>
        </Container>
      </div>
    </>
  );
}
