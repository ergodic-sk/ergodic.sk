import { useTranslations } from "next-intl"
import { base, delay } from "@/lib/reveal"
import { Container, SheetHeading } from "./sheet-heading"

type Drawing = {
  id: "dwg002" | "dwg003" | "dwg004"
  code: string
  // End y of each considered variant; the chosen one is drawn solid.
  ends: number[]
  chosen: number
}

const drawings: Drawing[] = [
  { id: "dwg002", code: "DWG 002", ends: [40, 78, 140, 170], chosen: 1 },
  { id: "dwg003", code: "DWG 003", ends: [30, 70, 100, 136, 170], chosen: 3 },
  { id: "dwg004", code: "DWG 004", ends: [50, 100, 150], chosen: 1 },
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
      <g fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1" fill="var(--cobalt)">
        {ends.map((y, i) => (
          <text
            key={y}
            className="r-fade"
            style={i === chosen ? delay(done) : sketch(i)}
            x={i === chosen ? 370 : 366}
            y={y + 4}
          >
            V.0{i + 1}
          </text>
        ))}
      </g>
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
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {drawings.map(({ id, code, ends, chosen }, i) => (
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
                <h3 className="text-[26px] font-semibold tracking-[-0.03em]">{t(`items.${id}.client`)}</h3>
                <dl className="font-mono-caps text-ink-soft grid grid-cols-2 gap-y-2 text-[11px] tracking-[0.04em]">
                  <dt>{t("considered")}</dt>
                  <dd>{t("variants", { count: ends.length })}</dd>
                  <dt>{t("built")}</dt>
                  <dd>
                    V.0{chosen + 1} · {t(`items.${id}.stack`)}
                  </dd>
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
