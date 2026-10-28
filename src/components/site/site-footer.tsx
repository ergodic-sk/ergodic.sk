import { useTranslations } from "next-intl"
import { site } from "@/config/site"
import { Link } from "@/i18n/navigation"
import { trackAttrs } from "@/lib/analytics"
import { withUtm } from "@/lib/utm"
import { Wordmark } from "./logo"
import { Container } from "./sheet-heading"

export function SiteFooter() {
  const t = useTranslations("Footer")

  return (
    <footer className="bg-cobalt-deep text-paper py-10">
      <Container className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Wordmark className="text-2xl" />
          <nav className="text-lilac-100 flex flex-wrap gap-x-7 gap-y-2 text-[15px]">
            <Link href="/privacy">{t("privacy")}</Link>
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
        <p className="text-lilac-400 font-mono text-[11px] leading-[1.7] tracking-[0.04em]">
          {site.legalName} · {site.address} · IČO {site.ico} · DIČ {site.dic} · {site.register} · © 2026
        </p>
      </Container>
    </footer>
  )
}
