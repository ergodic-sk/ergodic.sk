import { useTranslations } from "next-intl"
import { site } from "@/config/site"
import { serviceKeys, servicePath } from "@/content/services"
import { Link } from "@/i18n/navigation"
import { trackAttrs } from "@/lib/analytics"
import { withUtm } from "@/lib/utm"
import { Wordmark } from "./logo"
import { Container } from "./sheet-heading"

export function SiteFooter() {
  const t = useTranslations("Footer")
  const s = useTranslations("Services.items")
  const sp = useTranslations("ServicePage")

  return (
    <footer className="bg-cobalt-deep text-paper py-10">
      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Wordmark className="text-2xl" />
          <nav className="text-lilac-100 flex flex-wrap gap-x-7 gap-y-2 text-[15px]">
            {/* No prefetch: with SK unprefixed, the client router guesses /privacy is /[locale]=privacy,
                the segment prefetch 404s and it retries in a loop (hundreds of requests per second). */}
            <Link href="/privacy" prefetch={false}>
              {t("privacy")}
            </Link>
            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener"
                {...trackAttrs("linkedin_click", { location: "footer" })}
              >
                {t("linkedin")}
              </a>
            )}
            <a
              href={withUtm(site.heystol, "footer")}
              target="_blank"
              rel="noopener"
              {...trackAttrs("heystol_click", { location: "footer" })}
            >
              {t("heystol")}
            </a>
            <a
              href={withUtm(site.okfaktura, "footer")}
              target="_blank"
              rel="noopener"
              {...trackAttrs("okfaktura_click", { location: "footer" })}
            >
              {t("okfaktura")}
            </a>
          </nav>
        </div>
        <nav aria-label={sp("footerTitle")} className="border-paper/20 flex flex-col gap-3 border-t pt-6 md:flex-row md:items-baseline md:gap-7">
          <span className="font-mono-caps text-lilac-400 text-[11px] tracking-[0.1em]">{sp("footerTitle")}</span>
          <ul className="text-lilac-100 flex flex-wrap gap-x-7 gap-y-2 text-[15px]">
            {serviceKeys.map((key) => (
              <li key={key}>
                <Link href={servicePath[key]} prefetch={false}>
                  {s(`${key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-lilac-400 font-mono text-[11px] leading-[1.7] tracking-[0.04em]">
          {site.legalName} · {site.address} · IČO {site.ico} · DIČ {site.dic} · {site.register} · © 2026
        </p>
      </Container>
    </footer>
  )
}
