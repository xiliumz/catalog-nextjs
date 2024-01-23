import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React, { SVGAttributes } from 'react';

function Loader({ className, ...props }: SVGAttributes<HTMLOrSVGElement>) {
  return <Loader2 className={cn('animate-spin', className)} />;
}

export default Loader;
