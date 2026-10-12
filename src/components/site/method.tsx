import { useTranslations } from "next-intl"
import { Container, SheetHeading } from "./sheet-heading"

const steps = [
  { key: "survey", code: "A · 01" },
  { key: "variants", code: "B · 02" },
  { key: "build", code: "C · 03" },
  { key: "maintain", code: "D · 04" },
] as const

function MethodLine() {
  return (
    <svg viewBox="0 0 1296 200" aria-hidden="true" className="hidden w-full md:block">
      <defs>
        <pattern
          id="hatchMethod"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="7" stroke="var(--cobalt)" strokeWidth="1.2" strokeOpacity="0.5" />
        </pattern>
      </defs>
      <line x1="20" y1="100" x2="486" y2="100" stroke="var(--cobalt)" strokeWidth="1.5" />
      <g
        fill="none"
        stroke="var(--cobalt)"
        strokeOpacity="0.6"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="0 8"
      >
        <path d="M486 100 C 590 100, 700 28, 790 28" />
        <path d="M486 100 C 590 100, 700 60, 790 60" />
        <path d="M486 100 C 590 100, 700 142, 790 142" />
        <path d="M486 100 C 590 100, 700 174, 790 174" />
      </g>
      <line x1="486" y1="100" x2="810" y2="100" stroke="var(--cobalt)" strokeWidth="3" />
      <rect x="810" y="104" width="324" height="20" fill="url(#hatchMethod)" />
      <line x1="810" y1="100" x2="1134" y2="100" stroke="var(--cobalt)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="1134" cy="100" r="28" fill="none" stroke="var(--cobalt)" strokeWidth="1.5" />
      <path d="M1128 66 L1138 72 L1128 78" fill="none" stroke="var(--cobalt)" strokeWidth="1.5" strokeLinejoin="round" />
      <g stroke="var(--cobalt)" strokeWidth="1.5" fill="var(--paper)">
        <circle cx="162" cy="100" r="8" />
        <circle cx="486" cy="100" r="8" />
        <circle cx="1134" cy="100" r="8" />
      </g>
      <circle cx="810" cy="100" r="10" fill="var(--signal)" />
      <g fontFamily="var(--font-mono)" fontSize="11" letterSpacing="1" fill="var(--cobalt)">
        <text x="150" y="80">A</text>
        <text x="474" y="80">B</text>
        <text x="798" y="78">C</text>
        <text x="1122" y="58">D</text>
      </g>
    </svg>
  )
}

export function Method() {
  const t = useTranslations("Method")

  return (
    <section id="method" className="sheet-paper py-20 md:py-24">
      <Container className="flex flex-col gap-12">
        <SheetHeading
          tone="paper"
          eyebrow={t("eyebrow")}
          title={t("title")}
          aside={
            <p className="font-mono-caps text-ink-mute text-[11px] tracking-[0.08em]">{t("scale")}</p>
          }
        />
        <MethodLine />
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ key, code }) => (
            <li key={key} className="flex flex-col gap-2.5 pr-4 max-md:border-cobalt/35 max-md:border-l max-md:pl-4">
              <span className="text-cobalt font-mono text-xs">{code}</span>
              <h3 className="text-[26px] font-semibold tracking-[-0.03em]">{t(`steps.${key}.title`)}</h3>
              <p className="text-ink-soft text-base leading-[1.55]">{t(`steps.${key}.body`)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
