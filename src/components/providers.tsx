'use client';
import LoadingProvider from '@/contexts/LoadingProvider';
import { ThemeProvider } from './theme-provider';
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </LoadingProvider>
  );
}

export default Providers;
