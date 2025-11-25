import type { SVGProps } from 'react';

export function BoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 12c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h2z" />
      <path d="M7 12c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h2z" />
      <path d="M17.28 8.04A3 3 0 0 0 15 6.07V5c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1.07a3 3 0 0 0-2.28 1.97l-1.07 3.2C5.02 12.63 5 13.82 5 15c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2 0-1.18-.02-2.37-.65-3.76l-1.07-3.2z" />
    </svg>
  );
}
