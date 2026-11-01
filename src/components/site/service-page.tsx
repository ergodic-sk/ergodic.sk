import type { Metadata } from "next"
import { getLocale, getTranslations } from "next-intl/server"
import { buttonVariants } from "@/components/ui/button"
import { site } from "@/config/site"
import { serviceCases, serviceKeys, servicePath, services, type ServiceKey } from "@/content/services"
import { getPathname, Link } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { trackAttrs } from "@/lib/analytics"
import { withUtm } from "@/lib/utm"
import { cn } from "@/lib/utils"
import { Contact } from "./contact"
import { Container } from "./sheet-heading"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

const caseUrls = {
  kromka: "https://www.pekarenkromka.sk",
  zwicker: "https://www.zwicker.sk",
  heystol: site.heystol,
} as const

const steps = ["survey", "variants", "build", "maintain"] as const

const url = (locale: Locale, service: ServiceKey) =>
  site.url + getPathname({ locale, href: servicePath[service] })

export async function serviceMetadata(service: ServiceKey): Promise<Metadata> {
  const locale = (await getLocale()) as Locale
  const copy = services[locale][service]
  const languages = Object.fromEntries(routing.locales.map((l) => [l, url(l, service)]))
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: url(locale, service),
      languages: { ...languages, "x-default": url(routing.defaultLocale, service) },
    },
    openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: url(locale, service) },
    twitter: { title: copy.metaTitle, description: copy.metaDescription },
  }
}

export async function ServicePage({ service }: { service: ServiceKey }) {
  const locale = (await getLocale()) as Locale
  const t = await getTranslations({ locale, namespace: "ServicePage" })
  const s = await getTranslations({ locale, namespace: "Services.items" })
  const m = await getTranslations({ locale, namespace: "Method.steps" })
  const d = await getTranslations({ locale, namespace: "Drawings.items" })
  const copy = services[locale][service]
  const n = serviceKeys.indexOf(service) + 1
  const homeUrl = site.url + getPathname({ locale, href: "/" })
  const cases = serviceCases[service]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: copy.h1,
        description: copy.metaDescription,
        url: url(locale, service),
        serviceType: s(`${service}.title`),
        provider: { "@id": `${site.url}/#organization` },
        areaServed: [
          { "@type": "Country", name: "Slovakia" },
          { "@type": "Place", name: "European Union" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("home"), item: homeUrl },
          { "@type": "ListItem", position: 2, name: s(`${service}.title`), item: url(locale, service) },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: copy.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader anchorBase={getPathname({ locale, href: "/" })} />
      <main>
        <section className="sheet-cobalt -mt-16 pt-16 md:-mt-24 md:pt-24">
          <Container className="flex flex-col gap-6 py-14 md:py-20 lg:max-w-[1040px] lg:ml-0">
            <nav aria-label="Breadcrumb" className="font-mono-caps text-lilac-300 text-[11px] tracking-[0.1em] md:text-xs">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href="/" className="text-lilac-300 no-underline">
                    {t("home")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={{ pathname: "/", hash: "services" }} className="text-lilac-300 no-underline">
                    {t("services")}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-paper">
                  S-0{n} · {s(`${service}.tag`)}
                </li>
              </ol>
            </nav>
            <h1 className="text-[40px] leading-[0.98] font-semibold tracking-[-0.055em] text-balance md:text-6xl xl:text-[68px]">
              {/* Keep "e-shop" whole: the hyphen is otherwise a line-break point in the big headline. */}
              {copy.h1.split(/(e-shop\S*)/).map((part, i) =>
                part.startsWith("e-shop") ? (
                  <span key={i} className="whitespace-nowrap">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </h1>
            <p className="text-lilac-200 max-w-[640px] text-[17px] leading-normal md:text-[19px]">{copy.lead}</p>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <a
                href="#contact"
                {...trackAttrs("cta_click", { location: `service_${service}`, target: "contact" })}
                className={cn(buttonVariants({ variant: "paper", size: "xl" }), "no-underline")}
              >
                {t("cta")} →
              </a>
              <span className="font-mono-caps text-lilac-300 text-[11px] tracking-[0.08em]">{t("ctaNote")}</span>
            </div>
            <ul className="font-mono-caps text-lilac-400 mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11px] tracking-[0.06em]">
              {s(`${service}.specs`)
                .split("|")
                .map((line) => (
                  <li key={line}>{line}</li>
                ))}
            </ul>
          </Container>
        </section>

        <section className="sheet-paper py-16 md:py-24">
          <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col gap-5">
              <h2 className="text-cobalt border-cobalt border-b pb-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                {t("forWho")}
              </h2>
              <ul className="flex flex-col gap-4">
                {copy.forWho.map((line) => (
                  <li key={line} className="text-ink-soft flex gap-3 text-[17px] leading-relaxed">
                    <span aria-hidden="true" className="bg-signal mt-[0.6em] size-2 shrink-0 rounded-full" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-cobalt border-cobalt border-b pb-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                {t("deliverables")}
              </h2>
              <ul className="flex flex-col gap-4">
                {copy.deliverables.map((line) => (
                  <li key={line} className="text-ink-soft flex gap-3 text-[17px] leading-relaxed">
                    <span aria-hidden="true" className="text-cobalt font-mono text-sm leading-[1.9]">→</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        <section className="sheet-paper border-cobalt/20 border-t py-16 md:py-24">
          <Container className="flex flex-col gap-10">
            <h2 className="text-cobalt border-cobalt border-b pb-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              {t("process")}
            </h2>
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <li key={step} className="flex flex-col gap-2">
                  <span className="text-cobalt font-mono text-xs">0{i + 1}</span>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{m(`${step}.title`)}</h3>
                  <p className="text-ink-soft text-[15px] leading-[1.6]">{m(`${step}.body`)}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {cases.length > 0 && (
          <section className="sheet-paper border-cobalt/20 border-t py-16 md:py-24">
            <Container className="flex flex-col gap-10">
              <h2 className="text-cobalt border-cobalt border-b pb-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                {t("cases")}
              </h2>
              <ul className="grid gap-6 md:grid-cols-2">
                {cases.map((id) => (
                  <li key={id} className="border-cobalt bg-paper-2 flex flex-col gap-3 border p-5">
                    <span className="font-mono-caps text-cobalt text-[11px] tracking-[0.08em]">{d(`${id}.kind`)}</span>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                      <a
                        href={withUtm(caseUrls[id], `service_${service}`)}
                        target="_blank"
                        rel="noopener"
                        {...trackAttrs("case_click", { location: `service_${service}`, target: id })}
                        className="no-underline"
                      >
                        {d(`${id}.client`)} <span className="text-cobalt text-lg">↗</span>
                      </a>
                    </h3>
                    <p className="text-ink-soft text-[15px]">{d(`${id}.result`)}</p>
                    <p className="font-mono-caps text-ink-mute text-[11px] tracking-[0.04em]">{d(`${id}.stack`)}</p>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        <section className="sheet-paper border-cobalt/20 border-t py-16 md:py-24">
          <Container className="flex max-w-[960px] flex-col gap-8 lg:ml-0">
            <h2 className="text-cobalt border-cobalt border-b pb-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              {t("faq")}
            </h2>
            <div className="flex flex-col">
              {copy.faq.map(({ q, a }) => (
                <details key={q} className="border-cobalt/30 group border-b py-4">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 text-xl font-semibold tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                    <h3>{q}</h3>
                    <span aria-hidden="true" className="text-cobalt font-mono text-lg transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-ink-soft mt-3 max-w-[760px] text-[17px] leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="sheet-paper border-cobalt/20 border-t py-16 md:py-20">
          <Container className="flex flex-col gap-6">
            <h2 className="font-mono-caps text-cobalt text-xs tracking-[0.1em]">{t("other")}</h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {serviceKeys
                .filter((k) => k !== service)
                .map((k) => (
                  <li key={k}>
                    {/* No prefetch: the client router would read the unprefixed SK slug as a locale (see site-footer). */}
                    <Link
                      href={servicePath[k]}
                      prefetch={false}
                      className="border-cobalt hover:bg-paper-2 flex h-full items-center justify-between gap-3 border px-5 py-4 text-xl font-semibold tracking-[-0.03em] no-underline"
                    >
                      {s(`${k}.title`)}
                      <span className="text-cobalt">→</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </Container>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
