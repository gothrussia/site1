import type { SVGProps } from 'react';

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

type P = SVGProps<SVGSVGElement>;

export const BagIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);
export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.8-3.8" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const TrashIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M9 7V5h6v2M6.5 7l1 12.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5L17.5 7" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const LeafIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
    <path d="M5 19 13 11" />
  </svg>
);
export const HandIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V11M11 10V5a1.5 1.5 0 0 1 3 0v5M14 10V6.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5A6.5 6.5 0 0 1 4 15.5L3.2 13a1.5 1.5 0 0 1 2.6-1.3L8 14" />
  </svg>
);
export const GiftIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="9" width="16" height="11" rx="1.5" />
    <path d="M3 9h18M12 9v11M12 9c-1.5-3-5-4-5-1.5S10 9 12 9Zm0 0c1.5-3 5-4 5-1.5S14 9 12 9Z" />
  </svg>
);
export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);
export const TelegramIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m21 4-18 7.2 6 2.1L18 7l-7 7.8L17.5 20 21 4Z" />
  </svg>
);
export const VkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 7.5c.2 6 3.6 10 9 10h.6v-3.4c2 .2 3.4 1.6 4 3.4H20c-.8-2.8-2.8-4.4-4-5 1.2-.7 3-2.5 3.4-5h-2.6c-.6 2-2.2 3.8-4.2 4V7.5H10v6.8c-1.6-.4-3.6-2.4-3.7-6.8H3Z" />
  </svg>
);
export const Logo = (p: P) => (
  <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true" {...p}>
    <defs>
      <linearGradient id="md-logo" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F4DDE2" />
        <stop offset="1" stopColor="#EAC5CE" />
      </linearGradient>
    </defs>
    <circle cx="20" cy="20" r="19" fill="url(#md-logo)" />
    <path
      d="M11 24.5c0-2 1.5-3.5 3.5-3.5h11c2 0 3.5 1.5 3.5 3.5V27H11v-2.5Z"
      fill="#FFFDF9"
      stroke="#57463F"
      strokeWidth="1.2"
    />
    <path d="M13 21c0-3.9 3.1-7 7-7s7 3.1 7 7" fill="none" stroke="#57463F" strokeWidth="1.2" />
    <circle cx="20" cy="11.5" r="2" fill="#C98A97" />
  </svg>
);
