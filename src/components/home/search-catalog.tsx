'use client';

import { addCustomListener, emitEvent, removeCustomListener } from '@/lib/utils';
import { FormEvent, useEffect, useState } from 'react';
import Loader from '../ui/loader';
import SearchInput from '../ui/search';
import { Search } from 'lucide-react';
import { HOST } from '@/lib/global-var';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SEARCH_EVENT = 'search';

interface SearchedI {
  id: string;
  title: string;
  user_id: string;
  custom_code?: string;
}

function SearchCatalog() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState<SearchedI[]>([]);

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setLoading(true);
    emitEvent<string>(SEARCH_EVENT, e.currentTarget.value);
  };

  useEffect(() => {
    let id = setTimeout(() => {});

    addCustomListener(SEARCH_EVENT, ((e: CustomEvent<string>) => {
      clearTimeout(id);
      const val = e.detail;
      id = setTimeout(async () => {
        if (val === '') {
          setSearched([]);
        } else {
          const response = await fetch(`${HOST}/catalog/search?id=${val}`, {
            method: 'GET',
            redirect: 'follow',
          });
          const result = await response.json();
          if (response.status >= 500) {
            throw new Error('Internal server error, please contact admin');
          }
          if (!response.ok) {
            throw new Error(result.errors ? result.errors : response.statusText);
          }

          const data: SearchedI[] = result.data;
          setSearched(data);
        }
        setLoading(false);
      }, 1000);
    }) as EventListener);

    return () => {
      removeCustomListener(SEARCH_EVENT, () => {});
    };
  }, []);

  return (
    <div className='h-60 sm:h-[40vh] w-full sm:w-2/3'>
      <div className='shadow-md sm:border-2 border-primary/60 border rounded-2xl animate-fade-down animate-duration-500 animate-ease-out'>
        <div
          className={`bg-background px-3 flex items-center border rounded-2xl ${
            (loading || searched.length !== 0) && 'rounded-b-none'
          }`}
        >
          <Search className='text-muted-foreground' />
          <SearchInput
            className={`sm:text-lg text-base py-6 sm:py-7 border-l-0 rounded-l-none border-none`}
            value={value}
            onInput={onInput}
            onKeyUp={() => {}}
          />
        </div>
        <SearchedList loading={loading} searched={searched} />
      </div>
    </div>
  );
}

export default SearchCatalog;

function SearchedList({ loading, searched }: { loading: boolean; searched: SearchedI[] }) {
  const router = useRouter();
  if (loading || searched.length !== 0) {
    return (
      <div className='w-full bg-background rounded-b-2xl text-base h-fit'>
        {loading && (
          <p className='text-sm font-medium leading-none text-muted-foreground/85 flex items-center gap-2 justify-center p-5 animate-pulse hover:cursor-wait'>
            <Loader className='text-muted-foreground/85 inline-block' /> Loading
          </p>
        )}
        {searched.length !== 0 &&
          !loading &&
          searched.map(
            (data, index) =>
              index < 3 && (
                <Link key={data.id} href={`/u/${data.user_id}/${data.id}`}>
                  <div className='text-sm font-semibold leading-none py-4 px-7 capitalize hover:bg-secondary rounded-b-2xl hover:cursor-pointer'>
                    <p>{data.title}</p>
                    <p className='font-medium leading-none text-sm text-muted-foreground mt-1 normal-case'>
                      {data.custom_code ? data.custom_code : data.id}
                    </p>
                  </div>
                </Link>
              )
          )}
      </div>
    );
  }
}
