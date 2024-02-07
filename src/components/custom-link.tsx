'use client';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect } from 'react';
import { Button, ButtonProps } from './ui/button';
import Cookies from 'js-cookie';
import { cn } from '@/lib/utils';

export interface customLinkProps extends ButtonProps {
  href: string;
  prefetch?: boolean;
  cookie?: string;
}

export default function CustomLink({
  href,
  prefetch = true,
  className,
  children,
  onClick,
  cookie,
  ...props
}: customLinkProps) {
  const router = useRouter();

  useEffect(() => {
    if (!prefetch) return;

    if (cookie) {
      const cook = Cookies.get(cookie);
      if (cook) router.prefetch(href);
      return;
    }

    router.prefetch(href);
  }, []);

  const clickHandler = (e: MouseEvent<HTMLButtonElement, _MouseEvent>) => {
    router.push(href);
    if (onClick) onClick(e);
  };

  return (
    <span size='sm' variant={'ghost'} className={cn('w-full', className)} onClick={clickHandler} {...props}>
      {children}
    </span>
  );
}
