import React from 'react';

export function PolyBackground() {
  return (
    <svg
      className='absolute top-0 w-full h-full -z-50'
      id='visual'
      viewBox='0 0 960 540'
      width='960'
      height='540'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
    >
      <g>
        <g transform='translate(797 535)'>
          <path d='M0 -144L124.7 -72L124.7 72L0 144L-124.7 72L-124.7 -72Z' fill='rgba(37, 100, 235, 0.07)'></path>
        </g>
        <g transform='translate(61 39)'>
          <path d='M0 -88L76.2 -44L76.2 44L0 88L-76.2 44L-76.2 -44Z' fill='rgba(37, 100, 235, 0.04)'></path>
        </g>
        <g transform='translate(186 518)'>
          <path
            d='M0 -125L108.3 -62.5L108.3 62.5L0 125L-108.3 62.5L-108.3 -62.5Z'
            fill='rgba(37, 100, 235, 0.07)'
          ></path>
        </g>
      </g>
    </svg>
  );
}

export function WaveBackground() {
  return (
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
  );
}
