import Image, { ImageProps } from 'next/image';
import React from 'react';

export default function NoImage({ ...props }: Omit<ImageProps, 'src' | 'alt'>) {
  return <Image {...props} alt='no image' src='/no-image.png' />;
}
