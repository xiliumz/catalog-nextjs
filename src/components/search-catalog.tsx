'use client';

import { addCustomListener, emitEvent, removeCustomListener } from '@/lib/utils';
import { FormEvent, useEffect, useState } from 'react';
import Loader from './ui/loader';
import SearchInput from './ui/search';
import { Search } from 'lucide-react';

const DATA = ['helloworld'];
const SEARCH_EVENT = 'search';

function SearchCatalog() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState<string[]>([]);

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
      id = setTimeout(() => {
        if (val === '') {
          setSearched([]);
        } else {
          setSearched(DATA.filter((title) => title.toLowerCase().search(val.toLowerCase()) !== -1));
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

function SearchedList({ loading, searched }: { loading: boolean; searched: string[] }) {
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
          searched.map((data) => (
            <p className='text-sm font-semibold leading-none p-5 px-7 capitalize hover:bg-secondary rounded-b-2xl hover:cursor-pointer'>
              {data}
            </p>
          ))}
      </div>
    );
  }
}
