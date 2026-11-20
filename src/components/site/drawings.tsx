import { useTranslations } from "next-intl"
import { trackAttrs } from "@/lib/analytics"
import { withUtm } from "@/lib/utm"
import { base, delay } from "@/lib/reveal"
import { Container, SheetHeading } from "./sheet-heading"

type Drawing = {
  id: "kromka" | "zwicker"
  code: string
  url: string
  // End y of each considered variant; the chosen one is drawn solid.
  ends: number[]
  chosen: number
}

// Client projects only; our own products live in the Products sheet.
// The path study is decoration: the sketched variants are not real counts, so the card states no numbers.
const drawings: Drawing[] = [
  { id: "kromka", code: "DWG 001", url: "https://www.pekarenkromka.sk", ends: [40, 78, 140, 170], chosen: 1 },
  { id: "zwicker", code: "DWG 002", url: "https://www.zwicker.sk", ends: [30, 70, 100, 136, 170], chosen: 3 },
]

const path = (y: number) => `M40 100 C 150 100, 220 ${y}, 360 ${y}`

/** Same story as the hero, plotted once: considered variants are sketched, then the chosen one is drawn. */
function Study({ ends, chosen }: Pick<Drawing, "ends" | "chosen">) {
  const sketch = (i: number) => delay(200 + i * 70)
  const done = 450 + ends.length * 70 + 650

  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="border-cobalt h-[200px] w-full border-b"
    >
      <g
        fill="none"
        stroke="var(--cobalt)"
        strokeOpacity="0.55"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="0 8"
      >
        {ends.map((y, i) =>
          i === chosen ? null : <path key={y} className="r-fade" style={sketch(i)} d={path(y)} />
        )}
      </g>
      <path
        className="r-draw"
        pathLength={1}
        style={{ ...delay(450 + ends.length * 70), "--dur": "650ms" } as React.CSSProperties}
        d={path(ends[chosen])}
        fill="none"
        stroke="var(--cobalt)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle className="r-pop" style={delay(100)} cx="40" cy="100" r="5" fill="var(--cobalt)" />
      <circle className="r-pop" style={delay(done)} cx="360" cy={ends[chosen]} r="7" fill="var(--signal)" />
    </svg>
  )
}

export function Drawings() {
  const t = useTranslations("Drawings")

  return (
    <section id="drawings" className="sheet-paper py-20 md:py-24">
      <Container className="flex flex-col gap-12">
        <SheetHeading
          tone="paper"
          eyebrow={t("eyebrow")}
          title={t("title")}
          aside={<p className="text-ink-soft max-w-[380px] text-[17px] leading-normal">{t("lead")}</p>}
        />
        <ul className="grid gap-6 md:grid-cols-2">
          {drawings.map(({ id, code, url, ends, chosen }, i) => (
            <li
              key={id}
              data-reveal
              style={base(i * 120)}
              className="r-up border-cobalt bg-paper-2 flex flex-col border"
            >
              <Study ends={ends} chosen={chosen} />
              <div className="flex flex-col gap-3 p-5">
                <div className="font-mono-caps text-cobalt flex justify-between text-[11px] tracking-[0.08em]">
                  <span>{code}</span>
                  <span>{t(`items.${id}.kind`)}</span>
                </div>
                <h3 className="text-[26px] font-semibold tracking-[-0.03em]">
                  <a
                    href={withUtm(url, "drawings")}
                    target="_blank"
                    rel="noopener"
                    {...trackAttrs("case_click", { location: "drawings", target: id })}
                    className="no-underline"
                  >
                    {t(`items.${id}.client`)} <span className="text-cobalt text-lg">↗</span>
                  </a>
                </h3>
                <dl className="font-mono-caps text-ink-soft grid grid-cols-2 gap-y-2 text-[11px] tracking-[0.04em]">
                  <dt>{t("built")}</dt>
                  <dd>{t(`items.${id}.stack`)}</dd>
                  <dt>{t("outcome")}</dt>
                  <dd>{t(`items.${id}.result`)}</dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
