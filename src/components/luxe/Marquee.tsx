const ITEMS = ['AI Engineering', 'Product Engineering', 'Automation', 'Next.js', 'TypeScript', 'Postgres', 'Agents & LLM workflows', 'Offline-first Android', 'Payments']

export function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-[#d9b877]/15 py-5" aria-hidden>
      <div className="flex w-max animate-[yb-marquee_38s_linear_infinite] gap-10 whitespace-nowrap motion-reduce:animate-none">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl italic text-gray-300 md:text-4xl">
            {t}
            <span className="text-[#d9b877]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
