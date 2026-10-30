import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

type Props = SVGProps<SVGSVGElement>;

export function SunIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4l1.4-1.4M18 6l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M9.5 7H17v7.5" />
    </svg>
  );
}

export function MailIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 7.1 5.3a1.5 1.5 0 0 0 1.8 0L20 7.5" />
    </svg>
  );
}

export function GithubIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 19.5c-4 1.2-4-2.1-5.5-2.6m11 5.1v-3.3a2.9 2.9 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.7 4.7 0 0 0-1.3-3.2 4.4 4.4 0 0 0-.1-3.3s-1-.3-3.4 1.3a11.5 11.5 0 0 0-6 0C5.9 3.6 4.9 3.9 4.9 3.9a4.4 4.4 0 0 0-.1 3.3A4.7 4.7 0 0 0 3.5 10.4c0 4.7 2.8 5.7 5.5 6a2.9 2.9 0 0 0-.8 2.3V22" />
    </svg>
  );
}

export function MapPinIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function ChatIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 11.6a8.4 8.4 0 0 1-12.2 7.5L4 20l1.1-4.2A8.4 8.4 0 1 1 21 11.6Z" />
      <path d="M8.6 11.2h.02M12 11.2h.02M15.4 11.2h.02" />
    </svg>
  );
}

export function ChevronDownIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function RadarIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M12 12 18 6.5" />
    </svg>
  );
}

export function LayersIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6 12 3Z" />
      <path d="m3.5 12.3 8.5 4.6 8.5-4.6" />
      <path d="m3.5 16.8 8.5 4.6 8.5-4.6" />
    </svg>
  );
}

export function TerminalIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.8" y="4.2" width="18.4" height="15.6" rx="2.4" />
      <path d="m7 10 2.4 2.2L7 14.4M12.4 15h4.4" />
    </svg>
  );
}

export function SparkleIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5l1.6 4.6L18 9.7l-4.4 1.6L12 15.9l-1.6-4.6L6 9.7l4.4-1.6L12 3.5Z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </svg>
  );
}

export function HomeIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="m3.5 10.5 8.5-7 8.5 7" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  );
}

export function GamepadIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M7.5 7.5h9a4.5 4.5 0 0 1 4.4 3.6l.9 5a3 3 0 0 1-5.2 2.4l-1.4-1.5H8.8l-1.4 1.5a3 3 0 0 1-5.2-2.4l.9-5a4.5 4.5 0 0 1 4.4-3.6Z" />
      <path d="M8 10.5v3M6.5 12h3M15.5 11.5h.01M17.5 13.5h.01" />
    </svg>
  );
}

export function UserIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20.2a7.4 7.4 0 0 1 14.4 0" />
    </svg>
  );
}

export function MenuIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PanelLeftIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.4" />
      <path d="M9.5 4.5v15" />
    </svg>
  );
}

export function HeartIcon(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.2s-7.4-4.6-7.4-9.9a4.3 4.3 0 0 1 7.4-3 4.3 4.3 0 0 1 7.4 3c0 5.3-7.4 9.9-7.4 9.9Z" />
    </svg>
  );
}
