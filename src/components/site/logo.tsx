import { cn } from "@/lib/utils"

/** Path mark: one solid path from the start dot to the signal dot, two dotted alternatives. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("size-9", className)}>
      <g
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="0 11"
      >
        <path d="M12 50 C 42 50, 58 14, 88 14" />
        <path d="M12 50 C 42 50, 58 80, 88 80" />
      </g>
      <path
        d="M12 50 C 42 50, 58 38, 88 38"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="12" cy="50" r="8.5" fill="currentColor" />
      <circle cx="88" cy="38" r="10" fill="var(--signal)" />
    </svg>
  )
}

/** "ergodic" wordmark with the signal-orange dot over a dotless i. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-[28px] font-semibold tracking-[-0.05em]",
        className,
        "leading-none"
      )}
    >
      ergod
      <span className="relative inline-block leading-none">
        ı
        <span
          aria-hidden="true"
          className="bg-signal absolute top-[0.09em] left-1/2 -ml-[0.07em] size-[0.19em] rounded-full"
        />
      </span>
      c
    </span>
  )
}
