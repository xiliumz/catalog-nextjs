import React from 'react';

export function PolyBackground() {
  return (
    <svg
      className='absolute -z-10 top-0 w-full h-full'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      preserveAspectRatio='none'
      viewBox='0 0 900 600'
    >
      <g mask='url("#SvgjsMask1005")' fill='none'>
        <path
          d='M0 166L25 183.8C50 201.7 100 237.3 150 239.5C200 241.7 250 210.3 300 170.8C350 131.3 400 83.7 450 92.2C500 100.7 550 165.3 600 161.3C650 157.3 700 84.7 750 60.7C800 36.7 850 61.3 875 73.7L900 86L900 0L875 0C850 0 800 0 750 0C700 0 650 0 600 0C550 0 500 0 450 0C400 0 350 0 300 0C250 0 200 0 150 0C100 0 50 0 25 0L0 0Z'
          fill='rgba(37, 100, 235, 0.07)'
          stroke-linecap='round'
          stroke-linejoin='miter'
        ></path>
      </g>
      <defs>
        <mask id='SvgjsMask1005'>
          <rect width='1440' height='560' fill='#ffffff'></rect>
        </mask>
      </defs>
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
