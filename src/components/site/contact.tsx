import { useTranslations } from "next-intl"
import { site } from "@/config/site"
import { trackAttrs } from "@/lib/analytics"
import { delay } from "@/lib/reveal"
import { BriefForm } from "./brief-form"
import { Container } from "./sheet-heading"

export function Contact() {
  const t = useTranslations("Contact")

  return (
    <section id="contact" className="sheet-cobalt py-20 md:py-24">
      <Container className="flex flex-col gap-12 lg:flex-row lg:gap-18">
        <div data-reveal className="flex flex-col gap-5.5 lg:w-[480px] lg:shrink-0">
          <p className="r-up font-mono-caps text-lilac-300 text-xs tracking-[0.1em]">{t("eyebrow")}</p>
          <h2 style={delay(70)} className="r-up text-4xl leading-none font-semibold tracking-[-0.05em] text-balance md:text-[52px]">
            {t("title")}
          </h2>
          <p style={delay(140)} className="r-up text-lilac-200 text-[17px] leading-[1.55] md:text-[19px]">{t("lead")}</p>
          <address style={delay(210)} className="r-up flex flex-col gap-2.5 font-mono text-sm tracking-[0.02em] not-italic">
            <a
              href={`mailto:${site.email}`}
              {...trackAttrs("contact_email_click", { location: "contact" })}
              className="no-underline"
            >
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
        <div data-reveal style={delay(160)} className="r-up grow lg:self-start">
          <BriefForm />
        </div>
      </Container>
    </section>
  )
}
