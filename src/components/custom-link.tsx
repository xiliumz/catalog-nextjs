import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect } from 'react';
import { Button, ButtonProps } from './ui/button';

export interface customLinkProps extends ButtonProps {
  href: string;
  prefetch?: boolean;
}

export default function CustomLink({ href, prefetch = true, className, children, onClick, ...props }: customLinkProps) {
  const router = useRouter();

  useEffect(() => {
    if (prefetch) router.prefetch(href);
  }, []);

  const clickHandler = (e: MouseEvent<HTMLButtonElement, _MouseEvent>) => {
    router.push(href);
    if (onClick) onClick(e);
  };

  return (
    <Button className={className} onClick={clickHandler} {...props}>
      {children}
    </Button>
  );
}
