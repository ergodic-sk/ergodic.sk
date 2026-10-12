import { useTranslations } from "next-intl"
import { site } from "@/config/site"
import { BriefForm } from "./brief-form"
import { Container } from "./sheet-heading"

export function Contact() {
  const t = useTranslations("Contact")

  return (
    <section id="contact" className="sheet-cobalt scroll-mt-4 py-20 md:py-24">
      <Container className="flex flex-col gap-12 lg:flex-row lg:gap-18">
        <div className="flex flex-col gap-5.5 lg:w-[480px] lg:shrink-0">
          <p className="font-mono-caps text-lilac-300 text-xs tracking-[0.1em]">{t("eyebrow")}</p>
          <h2 className="text-4xl leading-none font-semibold tracking-[-0.05em] text-balance md:text-[52px]">
            {t("title")}
          </h2>
          <p className="text-lilac-200 text-[17px] leading-[1.55] md:text-[19px]">{t("lead")}</p>
          <address className="flex flex-col gap-2.5 font-mono text-sm tracking-[0.02em] not-italic">
            <a href={`mailto:${site.email}`} className="no-underline">
              {site.email}
            </a>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="no-underline">
                {site.phone}
              </a>
            )}
            <span className="text-lilac-300">{site.address}</span>
          </address>
        </div>
        <BriefForm />
      </Container>
    </section>
  )
}
