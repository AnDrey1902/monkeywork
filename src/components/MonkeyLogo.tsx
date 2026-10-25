export default function MonkeyLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} aria-labelledby="monkey-logo-title">
      <title id="monkey-logo-title">Monkeywork</title>

      <defs>
        <g id="monkey-eye">
          <circle cx="390" cy="505" r="97" fill="var(--logo-white)" />
          <circle cx="390" cy="505" r="97" fill="none" stroke="var(--logo-ink)" strokeWidth="22" />
          <circle cx="390" cy="512" r="54" fill="var(--logo-ink)" />
          <circle cx="370" cy="490" r="22" fill="var(--logo-white)" />
        </g>
      </defs>

      {/* Ears */}
      <g>
        <circle
          cx="128"
          cy="420"
          r="112"
          fill="var(--logo-body)"
          stroke="var(--logo-ink)"
          strokeWidth="24"
        />
        <circle cx="128" cy="420" r="56" fill="var(--logo-face)" />
        <circle
          cx="896"
          cy="420"
          r="112"
          fill="var(--logo-body)"
          stroke="var(--logo-ink)"
          strokeWidth="24"
        />
        <circle cx="896" cy="420" r="56" fill="var(--logo-face)" />
      </g>

      {/* Head */}
      <circle
        cx="512"
        cy="560"
        r="382"
        fill="var(--logo-body)"
        stroke="var(--logo-ink)"
        strokeWidth="26"
      />

      {/* Hair tuft */}
      <path
        d="M470 192 C 470 142 566 134 572 182 C 576 216 524 224 516 194"
        fill="none"
        stroke="var(--logo-ink)"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Face mask */}
      <path
        d="M512 344
           C 396 310, 268 366, 254 474
           C 244 560, 300 622, 372 664
           C 330 710, 318 778, 356 822
           C 396 868, 628 868, 668 822
           C 706 778, 694 710, 652 664
           C 724 622, 780 560, 770 474
           C 756 366, 628 310, 512 344
           Z"
        fill="var(--logo-face)"
      />

      {/* Eyes */}
      <use href="#monkey-eye" />
      <use href="#monkey-eye" x="244" />

      {/* Nostrils */}
      <ellipse cx="466" cy="672" rx="14" ry="21" fill="var(--logo-ink)" />
      <ellipse cx="558" cy="672" rx="14" ry="21" fill="var(--logo-ink)" />

      {/* Smile */}
      <path
        d="M 412 724 Q 512 796 612 724"
        fill="none"
        stroke="var(--logo-ink)"
        strokeWidth="18"
        strokeLinecap="round"
      />
    </svg>
  );
}
