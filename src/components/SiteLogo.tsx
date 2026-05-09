/** Navbar brand: mark + name — personal, still quiet. */
export function SiteLogo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="site-logo-mark relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
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
      <span className="hidden min-w-0 flex-col sm:flex">
        <span className="site-logo-title truncate font-display text-[13px] font-semibold leading-tight tracking-[-0.02em] text-white/92">
          Yash Bankar
        </span>
        <span className="mt-0.5 font-display text-[9px] font-medium uppercase tracking-[0.18em] text-gray-500">
          Full-stack
        </span>
      </span>
    </span>
  )
}
