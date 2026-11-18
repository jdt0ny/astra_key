import type { SVGProps } from 'react';

export function AstraMark({ size = 36, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <ellipse
        cx="24"
        cy="24"
        rx="21"
        ry="8.4"
        transform="rotate(-33 24 24)"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <circle cx="24" cy="24" r="15.5" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1" />
      <path
        d="M24 8.5c1.2 10.2 3.3 12.3 13.5 13.5-10.2 1.2-12.3 3.3-13.5 13.5-1.2-10.2-3.3-12.3-13.5-13.5 10.2-1.2 12.3-3.3 13.5-13.5Z"
        fill="currentColor"
      />
      <circle cx="24" cy="19.7" r="2.7" fill="var(--mark-cutout, #060a07)" />
      <path
        d="M24 21.4v6.2m0-3.1h2.8"
        stroke="var(--mark-cutout, #060a07)"
        strokeWidth="1.9"
        strokeLinecap="square"
      />
      <circle cx="40.5" cy="15.5" r="1.6" fill="var(--amber, #ffc46b)" />
    </svg>
  );
}
