/**
 * Navbar brand: abstract code brackets + subtle label (no personal name).
 * Pairs with the dark / teal portfolio aesthetic.
 */
export function SiteLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-accent"
          aria-hidden
        >
          <path
            d="M9 7 5 12l4 5M15 7l4 5-4 5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="hidden font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500/90 sm:inline">
        Portfolio
      </span>
    </span>
  )
}
