import Image from "next/image"
import { useTranslations } from "next-intl"
import { site } from "@/config/site"
import { Container } from "./sheet-heading"

/** 240×320 photo frame drawn with dimension lines; shows a placeholder cross until a photo is set. */
function PhotoFrame({ alt }: { alt: string }) {
  return (
    <div className="relative h-[380px] w-[300px] shrink-0">
      <svg viewBox="0 0 300 380" aria-hidden="true" className="absolute inset-0">
        <rect x="20" y="20" width="240" height="320" fill="var(--paper-2)" stroke="var(--cobalt)" strokeWidth="1.2" />
        {!site.founderPhoto && (
          <g stroke="var(--cobalt)" strokeOpacity="0.35" strokeWidth="1">
            <line x1="20" y1="20" x2="260" y2="340" />
            <line x1="260" y1="20" x2="20" y2="340" />
          </g>
        )}
        <g stroke="var(--cobalt)" strokeWidth="1">
          <line x1="20" y1="356" x2="260" y2="356" />
          <line x1="20" y1="350" x2="20" y2="362" />
          <line x1="260" y1="350" x2="260" y2="362" />
          <line x1="276" y1="20" x2="276" y2="340" />
          <line x1="270" y1="20" x2="282" y2="20" />
          <line x1="270" y1="340" x2="282" y2="340" />
        </g>
        <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--cobalt)">
          <text x="124" y="374">240</text>
          <text x="284" y="184">320</text>
        </g>
      </svg>
      {site.founderPhoto && (
        <Image
          src={site.founderPhoto}
          alt={alt}
          width={240}
          height={320}
          className="absolute top-5 left-5 h-80 w-60 object-cover grayscale"
        />
      )}
    </div>
  )
}

export function Studio() {
  const t = useTranslations("Studio")

  const facts = [
    [t("languages"), "SK · EN · UA"],
    [t("stack"), "React · RN · Next.js"],
    [t("firm"), site.legalName],
  ]

  return (
    <section id="studio" className="sheet-paper scroll-mt-4 py-20 md:py-24">
      <Container className="flex flex-col gap-12 md:flex-row md:gap-18">
        <PhotoFrame alt={t("photoAlt")} />
        <div className="flex max-w-[640px] flex-col gap-4.5">
          <p className="font-mono-caps text-cobalt text-xs tracking-[0.1em]">{t("eyebrow")}</p>
          <h2 className="text-cobalt text-4xl leading-none font-semibold tracking-[-0.05em] md:text-[52px]">
            {t("title")}
          </h2>
          <p className="text-ink-soft text-[17px] leading-relaxed md:text-[19px]">{t("body")}</p>
          <dl className="border-cobalt font-mono-caps grid border text-[11px] tracking-[0.06em] sm:grid-cols-3">
            {facts.map(([k, v], i) => (
              <div
                key={k}
                className={
                  i < 2
                    ? "border-cobalt/35 flex flex-col gap-1 px-3 py-2.5 max-sm:border-b sm:border-r"
                    : "flex flex-col gap-1 px-3 py-2.5"
                }
              >
                <dt className="text-cobalt">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
