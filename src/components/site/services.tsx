import { useTranslations } from "next-intl"
import { Container, SheetHeading } from "./sheet-heading"

const icons = {
  web: (
    <>
      <g fill="none" stroke="var(--paper)" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M10 30 L60 6 L110 30 L60 54 Z" />
        <path d="M10 30 L10 42 L60 66 L110 42 L110 30" />
        <path d="M60 54 L60 66" />
      </g>
      <g stroke="var(--paper)" strokeOpacity="0.6" strokeWidth="1.2">
        <line x1="34" y1="28" x2="60" y2="16" />
        <line x1="42" y1="32" x2="78" y2="16" />
        <line x1="50" y1="36" x2="70" y2="27" />
      </g>
    </>
  ),
  mobile: (
    <>
      <g fill="none" stroke="var(--paper)" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M40 20 L64 8 L88 20 L64 32 Z" />
        <path d="M40 20 L40 64 L64 76 L64 32" />
        <path d="M88 20 L88 64 L64 76" />
      </g>
      <g stroke="var(--paper)" strokeOpacity="0.6" strokeWidth="1.2">
        <line x1="46" y1="30" x2="46" y2="60" />
        <line x1="52" y1="33" x2="52" y2="63" />
        <line x1="58" y1="36" x2="58" y2="50" />
      </g>
    </>
  ),
  automation: (
    <>
      <g fill="none" stroke="var(--paper)" strokeWidth="1.4">
        <rect x="8" y="30" width="24" height="24" />
        <rect x="88" y="10" width="24" height="24" />
        <rect x="88" y="50" width="24" height="24" />
        <path d="M32 42 C 60 42, 60 22, 88 22" />
        <path d="M32 42 C 60 42, 60 62, 88 62" />
      </g>
      <circle cx="60" cy="42" r="4" fill="var(--signal)" />
    </>
  ),
  care: (
    <>
      <g fill="none" stroke="var(--paper)" strokeWidth="1.4">
        <circle cx="60" cy="42" r="30" />
        <path d="M54 8 L62 12 L54 17" strokeLinejoin="round" />
      </g>
      <g stroke="var(--paper)" strokeOpacity="0.6" strokeWidth="1.2">
        <line x1="60" y1="42" x2="60" y2="24" />
        <line x1="60" y1="42" x2="74" y2="50" />
      </g>
      <circle cx="60" cy="42" r="3" fill="var(--paper)" />
    </>
  ),
}

const keys = ["web", "mobile", "automation", "care"] as const

export function Services() {
  const t = useTranslations("Services")

  return (
    <section id="services" className="sheet-cobalt py-20 md:py-24">
      <Container className="flex flex-col gap-12">
        <SheetHeading tone="cobalt" eyebrow={t("eyebrow")} title={t("title")} />
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {keys.map((key, i) => (
            <li key={key} className="border-paper/45 flex flex-col border">
              <div className="border-paper/30 font-mono-caps text-lilac-300 flex justify-between border-b px-3.5 py-2.5 text-[11px] tracking-[0.08em]">
                <span>S-0{i + 1}</span>
                <span>{t(`items.${key}.tag`)}</span>
              </div>
              <div className="flex flex-col gap-4 px-5 py-6">
                <svg viewBox="0 0 120 84" aria-hidden="true" className="h-[84px] w-[120px]">
                  {icons[key]}
                </svg>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{t(`items.${key}.title`)}</h3>
                <p className="text-lilac-200 text-[15px] leading-[1.55]">{t(`items.${key}.body`)}</p>
                <ul className="font-mono-caps text-lilac-400 text-[11px] leading-[1.8] tracking-[0.04em]">
                  {t(`items.${key}.specs`)
                    .split("|")
                    .map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
