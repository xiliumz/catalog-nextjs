'use client';

import React, { HTMLAttributes, useCallback, useMemo, useState } from 'react';
import { Calculator, Calendar, CreditCard, Search, Settings, Smile, User } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import SearchInput from './ui/search';

const catalogs = ['Emoji', 'Calendar'];

// export function SearchCatalogs() {
//   const [inputValue, setInputValue] = useState('');
//   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
//   const [searchedArray, setSearchedArray] = useState<string[]>([]);
//   const catalogArray = catalogs;

//   const onInputChange = useCallback((e: React.FormEvent<HTMLInputElement>, timeoutId: NodeJS.Timeout | undefined) => {
//     clearTimeout(timeoutId);
//     setInputValue(e.currentTarget.value);
//     const timeout = setTimeout(() => {
//       console.log(inputValue);
//       const newCatalog = catalogArray.flatMap((catalog) =>
//         catalog.toLocaleLowerCase().search(inputValue.toLocaleLowerCase()) !== -1 ? catalog : []
//       );
//       setSearchedArray(newCatalog);
//     }, 1000);
//     setTimeoutId(timeout);
//   }, []);

//   return (
//     <div className='h-80 w-full md:w-3/4 '>
//       <Command className={'rounded-lg sm:border-4 border-2 border-primary/20 shadow-md overflow-auto h-min mx-auto'}>
//         <CommandInput
//           className='border-none sm:text-lg'
//           placeholder={width >= 425 ? 'Search catalogs using code or id...' : 'Search catalogs...'}
//           onInput={(e) => onInputChange(e, timeoutId)}
//           value={inputValue}
//         />
//         {searchedArray.length !== 0 && (
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup>
//               <CommandItem>
//                 <Calendar className='mr-2 h-4 w-4' />
//                 <span>Calendar</span>
//               </CommandItem>
//               <CommandItem>
//                 <Smile className='mr-2 h-4 w-4' />
//                 <span>Search Emoji</span>
//               </CommandItem>
//               <CommandItem>
//                 <Calculator className='mr-2 h-4 w-4' />
//                 <span>Calculator</span>
//               </CommandItem>
//             </CommandGroup>
//             <CommandSeparator />
//             <CommandGroup heading='Settings'>
//               <CommandItem>
//                 <User className='mr-2 h-4 w-4' />
//                 <span>Profile</span>
//                 <CommandShortcut>⌘P</CommandShortcut>
//               </CommandItem>
//               <CommandItem>
//                 <CreditCard className='mr-2 h-4 w-4' />
//                 <span>Billing</span>
//                 <CommandShortcut>⌘B</CommandShortcut>
//               </CommandItem>
//               <CommandItem>
//                 <Settings className='mr-2 h-4 w-4' />
//                 <span>Settings</span>
//                 <CommandShortcut>⌘S</CommandShortcut>
//               </CommandItem>
//             </CommandGroup>
//           </CommandList>
//         )}
//       </Command>
//     </div>
//   );
// }

function SearchCatalog() {
  const width = useMemo(() => innerWidth, []);

  return (
    <div className='h-60 sm:h-[40vh] w-full sm:w-2/3'>
      <SearchInput className='sm:text-lg px-4 py-6 sm:py-7 shadow-md sm:border-2 border-primary/60' />
    </div>
  );
}

export default SearchCatalog;
