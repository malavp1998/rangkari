export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-[#1A1A1A]/50">
        Get in touch
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-5xl font-light leading-tight">
        Contact
      </h1>
      <p className="mt-4 font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/60">
        For purchases, commissions, or general enquiries.
      </p>

      <div className="mt-12 space-y-8">
        <div className="flex flex-col gap-1">
          <span className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-[#1A1A1A]/40">
            Email
          </span>
          <a
            href="mailto:piyushmalav85@gmail.com"
            className="font-[family-name:var(--font-inter)] text-base text-[#1A1A1A] underline underline-offset-4 transition-opacity hover:opacity-60"
          >
            piyushmalav85@gmail.com
          </a>
        </div>
      </div>

      <div className="mt-16 border-t border-[#1A1A1A]/8 pt-10">
        <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-wider text-[#1A1A1A]/40">
          Response time
        </p>
        <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/60">
          Usually within 1–2 business days.
        </p>
      </div>
    </div>
  )
}
