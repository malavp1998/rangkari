import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] text-[#1A1A1A]/50">
          About
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-cormorant)] text-5xl font-light leading-tight">
          Kuldeep Gocher
        </h1>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_2fr]">
        {/* Artist photo */}
        <div className="relative aspect-[3/4] max-w-xs overflow-hidden bg-[#1A1A1A]/5">
          <Image
            src="/kuldeep.jpg"
            alt="Kuldeep Gocher"
            fill
            sizes="(min-width: 1024px) 320px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Bio */}
        <div className="space-y-6">
          <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#1A1A1A]/80">
            Kuldeep Gocher is a painter, traveller, and image-maker who lives and works in India.
            Trained in Fashion Design in Udaipur — a city where every wall, façade, and fabric
            seems to carry its own quiet history — his eye was shaped early by texture, drape,
            light, and the slow poetry of how things are put together. That same eye, years later,
            finds its way onto canvas.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#1A1A1A]/80">
            He moves through the world with a camera in one hand and a sketchbook close behind —
            photographing, filming, gathering. The small things most people walk past tend to find
            him: the gold of a late-afternoon wall, the patience in a stranger&rsquo;s hands, the
            slow theatre of a market closing for the night. Each journey leaves a residue. Each
            residue, eventually, becomes a painting.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#1A1A1A]/80">
            His paintings are not made in a hurry. They are built up in layers, reworked, set
            aside, returned to — and finished only when they begin to breathe on their own. There
            is no manifesto and no formula. Only an honest, stubborn attempt to translate what he
            has seen and felt into something a stranger, years from now, can stand in front of and
            quietly recognise.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#1A1A1A]/80">
            Every piece is an original — singular, signed, and shipped with care, along with a
            certificate of authenticity. To own one is to own a small fragment of the world as
            Kuldeep has lived it.
          </p>

          <div className="border-t border-[#1A1A1A]/8 pt-6">
            <p className="font-[family-name:var(--font-inter)] text-sm text-[#1A1A1A]/50">
              For enquiries and commissions, please{' '}
              <a
                href="/contact"
                className="underline underline-offset-2 transition-colors hover:text-[#1A1A1A]"
              >
                get in touch
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
