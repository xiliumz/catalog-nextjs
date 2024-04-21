'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

export const LoadingContext = createContext<Dispatch<SetStateAction<number>> | null>(null);

function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(0);

  return (
    <>
      <LoadingBar color='#3b82f6' progress={loading} onLoaderFinished={() => setLoading(0)} />
      <LoadingContext.Provider value={setLoading}>{children}</LoadingContext.Provider>
    </>
  );
}

export default LoadingProvider;
