import { useTranslations } from "next-intl"
import { site } from "@/config/site"
import { Container, SheetHeading } from "./sheet-heading"

function TableDrawing() {
  return (
    <svg viewBox="0 0 300 200" aria-hidden="true" className="w-full max-w-[300px] shrink-0">
      <g fill="none" stroke="var(--paper)" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M40 70 L150 20 L260 70 L150 120 Z" />
        <path d="M40 70 L40 80 L150 130 L260 80 L260 70" />
        <path d="M150 120 L150 130" />
        <line x1="62" y1="90" x2="62" y2="160" />
        <line x1="238" y1="90" x2="238" y2="160" />
        <line x1="150" y1="130" x2="150" y2="190" />
      </g>
      <path d="M120 62 L150 48 L180 62 L150 76 Z" fill="none" stroke="var(--paper)" strokeOpacity="0.6" strokeWidth="1.2" />
      <circle cx="150" cy="62" r="5" fill="var(--signal)" />
      <g stroke="var(--paper)" strokeOpacity="0.6" strokeWidth="1">
        <line x1="270" y1="80" x2="270" y2="160" />
        <line x1="264" y1="80" x2="276" y2="80" />
        <line x1="264" y1="160" x2="276" y2="160" />
      </g>
      <text x="278" y="124" fontFamily="var(--font-mono)" fontSize="10" fill="var(--paper)" fillOpacity="0.75">
        75
      </text>
    </svg>
  )
}

export function Products() {
  const t = useTranslations("Products")

  return (
    <section id="products" className="sheet-cobalt py-20 md:py-24">
      <Container className="flex flex-col gap-10">
        <SheetHeading tone="cobalt" eyebrow={t("eyebrow")} title={t("title")} />
        <article className="border-paper/45 flex flex-col items-start gap-10 border p-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-9">
          <div className="flex max-w-[640px] flex-col gap-4">
            <p className="font-mono-caps text-lilac-300 text-[11px] tracking-[0.08em]">{t("tag")}</p>
            <h3 className="text-5xl leading-none font-bold tracking-[-0.05em]">heystol</h3>
            <p className="text-lilac-200 text-lg leading-[1.55]">{t("body")}</p>
            <a
              href={site.heystol}
              target="_blank"
              rel="noopener"
              className="text-[17px] font-semibold underline-offset-[5px]"
            >
              heystol.com ↗
            </a>
          </div>
          <TableDrawing />
        </article>
      </Container>
    </section>
  )
}
