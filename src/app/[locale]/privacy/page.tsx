import type { Metadata } from "next"
import { useLocale, useTranslations } from "next-intl"
import { getLocale, getTranslations } from "next-intl/server"
import { LogoMark, Wordmark } from "@/components/site/logo"
import { Container } from "@/components/site/sheet-heading"
import { SiteFooter } from "@/components/site/site-footer"
import { privacy } from "@/content/privacy"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "Privacy" })
  return {
    title: `${t("title")} · Ergodic`,
    alternates: {
      canonical: locale === "sk" ? "/privacy" : `/${locale}/privacy`,
      languages: { sk: "/privacy", en: "/en/privacy" },
    },
  }
}

export default function PrivacyPage() {
  const t = useTranslations("Privacy")
  const locale = useLocale() as Locale
  const content = privacy[locale]

  return (
    <>
      <header className="sheet-cobalt">
        <Container className="flex h-16 items-center justify-between md:h-24">
          <Link href="/" className="text-paper hover:text-paper flex items-center gap-2.5 no-underline">
            <LogoMark className="size-7 md:size-9" />
            <Wordmark className="text-[22px] md:text-[28px]" />
          </Link>
          <Link href="/" className="font-mono-caps text-lilac-100 text-xs tracking-[0.08em] no-underline">
            ← {t("back")}
          </Link>
        </Container>
      </header>
      <main className="sheet-paper py-16 md:py-24">
        <Container className="flex max-w-[880px] flex-col gap-10">
          <div className="border-cobalt flex flex-col gap-2.5 border-b pb-5">
            <p className="font-mono-caps text-cobalt text-xs tracking-[0.1em]">{t("eyebrow")}</p>
            <h1 className="text-cobalt text-4xl leading-none font-semibold tracking-[-0.05em] md:text-[52px]">
              {t("title")}
            </h1>
            <p className="text-ink-mute font-mono text-xs">{content.updated}</p>
          </div>
          {content.sections.map((section, i) => (
            <section key={section.title} className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                <span className="text-cobalt mr-3 font-mono text-xs font-normal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              {section.body.map((p) => (
                <p key={p} className="text-ink-soft text-[17px] leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}
