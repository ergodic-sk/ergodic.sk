import { useTranslations } from "next-intl"
import { site } from "@/config/site"
import { trackAttrs } from "@/lib/analytics"
import { delay } from "@/lib/reveal"
import { Container, SheetHeading } from "./sheet-heading"

/** Isometric table, drawn top first, then legs, the reserved place and its dimension. */
function TableDrawing() {
  const draw = (ms: number, dur = 600) => ({ ...delay(ms), "--dur": `${dur}ms` }) as React.CSSProperties

  return (
    <svg data-reveal viewBox="0 0 300 200" aria-hidden="true" className="w-full max-w-[300px] shrink-0">
      <g fill="none" stroke="var(--paper)" strokeWidth="1.5" strokeLinejoin="round">
        <path className="r-draw" pathLength={1} style={draw(200, 800)} d="M40 70 L150 20 L260 70 L150 120 Z" />
        <path className="r-draw" pathLength={1} style={draw(600)} d="M40 70 L40 80 L150 130 L260 80 L260 70" />
        <path className="r-draw" pathLength={1} style={draw(600)} d="M150 120 L150 130" />
        <line className="r-draw" pathLength={1} style={draw(850, 450)} x1="62" y1="90" x2="62" y2="160" />
        <line className="r-draw" pathLength={1} style={draw(920, 450)} x1="238" y1="90" x2="238" y2="160" />
        <line className="r-draw" pathLength={1} style={draw(990, 450)} x1="150" y1="130" x2="150" y2="190" />
      </g>
      <path
        className="r-draw"
        pathLength={1}
        style={draw(1150, 500)}
        d="M120 62 L150 48 L180 62 L150 76 Z"
        fill="none"
        stroke="var(--paper)"
        strokeOpacity="0.6"
        strokeWidth="1.2"
      />
      <circle className="r-pop" style={delay(1550)} cx="150" cy="62" r="5" fill="var(--signal)" />
      <g className="r-fade" style={delay(1300)} stroke="var(--paper)" strokeOpacity="0.6" strokeWidth="1">
        <line x1="270" y1="80" x2="270" y2="160" />
        <line x1="264" y1="80" x2="276" y2="80" />
        <line x1="264" y1="160" x2="276" y2="160" />
      </g>
      <text
        className="r-fade"
        style={delay(1400)}
        x="278"
        y="124"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--paper)"
        fillOpacity="0.75"
      >
        75
      </text>
    </svg>
  )
}

/** Invoice sheet: the page, its lines filled in one by one, then the check and the confirmed mark. */
function InvoiceDrawing() {
  const draw = (ms: number, dur = 600) => ({ ...delay(ms), "--dur": `${dur}ms` }) as React.CSSProperties
  const rows = [70, 88, 106, 124]

  return (
    <svg data-reveal viewBox="0 0 300 200" aria-hidden="true" className="w-full max-w-[300px] shrink-0">
      <g fill="none" stroke="var(--paper)" strokeWidth="1.5" strokeLinejoin="round">
        <path className="r-draw" pathLength={1} style={draw(200, 800)} d="M90 10 L190 10 L210 30 L210 190 L90 190 Z" />
        <path className="r-draw" pathLength={1} style={draw(700, 300)} d="M190 10 L190 30 L210 30" />
      </g>
      <g stroke="var(--paper)" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round">
        <line className="r-draw" pathLength={1} style={draw(750, 350)} x1="106" y1="40" x2="150" y2="40" />
        {rows.map((y, i) => (
          <line key={y} className="r-draw" pathLength={1} style={draw(900 + i * 90, 350)} x1="106" y1={y} x2={i % 2 ? 170 : 194} y2={y} />
        ))}
        <line className="r-draw" pathLength={1} style={draw(1300, 350)} x1="150" y1="150" x2="194" y2="150" />
      </g>
      <path
        className="r-draw"
        pathLength={1}
        style={draw(1550, 400)}
        d="M108 166 L116 174 L132 156"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="r-pop" style={delay(1850)} cx="194" cy="170" r="5" fill="var(--signal)" />
      <text
        className="r-fade"
        style={delay(1400)}
        x="222"
        y="154"
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--paper)"
        fillOpacity="0.75"
      >
        ZIP
      </text>
    </svg>
  )
}

type Product = {
  id: "heystol" | "okfaktura"
  url: string
  event: "heystol_click" | "okfaktura_click"
  Drawing: () => React.ReactNode
}

const products: Product[] = [
  { id: "heystol", url: site.heystol, event: "heystol_click", Drawing: TableDrawing },
  { id: "okfaktura", url: site.okfaktura, event: "okfaktura_click", Drawing: InvoiceDrawing },
]

export function Products() {
  const t = useTranslations("Products")

  return (
    <section id="products" className="sheet-cobalt py-20 md:py-24">
      <Container className="flex flex-col gap-10">
        <SheetHeading tone="cobalt" eyebrow={t("eyebrow")} title={t("title")} />
        <div className="flex flex-col gap-6">
          {products.map(({ id, url, event, Drawing }) => (
            <article
              key={id}
              data-reveal
              className="r-up border-paper/45 flex flex-col items-start gap-10 border p-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-9"
            >
              <div className="flex max-w-[640px] flex-col gap-4">
                <p className="font-mono-caps text-lilac-300 text-[11px] tracking-[0.08em]">{t(`items.${id}.tag`)}</p>
                <h3 className="text-5xl leading-none font-bold tracking-[-0.05em]">{id}</h3>
                <p className="text-lilac-200 text-lg leading-[1.55]">{t(`items.${id}.body`)}</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener"
                  {...trackAttrs(event, { location: "products" })}
                  className="text-[17px] font-semibold underline-offset-[5px]"
                >
                  {new URL(url).host} ↗
                </a>
              </div>
              <Drawing />
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
