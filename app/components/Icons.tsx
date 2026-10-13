export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" className={className} width="100%" height="100%">
      <path d="M1.5 8.5 8.5 1.5M8.5 1.5H2.9M8.5 1.5v5.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 10" fill="none" className={className} width="100%" height="100%">
      <path d="M0 5h11M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 12" fill="none" className={className} width="100%" height="100%">
      <path d="M5 0v11M1 7l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Dot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className} width="100%" height="100%">
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  );
}

export function Plus({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" className={className} width="100%" height="100%">
      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={className} width="100%" height="100%">
      <path
        d="M11 0 22 11 11 22 0 11 11 0Zm0 4.4L4.4 11 11 17.6 17.6 11 11 4.4Z"
        fill="currentColor"
      />
      <circle cx="11" cy="11" r="2.4" fill="currentColor" />
    </svg>
  );
}

/** Aximest symbol — from public/Logo/logo/aximest-symbol-*.svg, inked in currentColor. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="2 4 78 90" fill="none" className={className} width="100%" height="100%">
      <polygon
        points="50,50 30,8 6,90 50,50 76,26 62,75"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Long arrow used as the leading glyph in the closing statement. */
export function ArrowRightLong({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 28" fill="none" className={className} width="100%" height="100%">
      <path
        d="M0 14h60M46 2l14 12-14 12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  );
}
