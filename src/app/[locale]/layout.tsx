import type { Metadata, Viewport } from "next"
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getTranslations } from "next-intl/server"
import { ClickTracker } from "@/components/site/click-tracker"
import { RevealObserver } from "@/components/site/reveal-observer"
import { site } from "@/config/site"
import { revealBootScript } from "@/lib/reveal"
import { routing } from "@/i18n/routing"
import "../globals.css"

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin", "latin-ext"],
})

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: { sk: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t("title"),
      description: t("description"),
      locale: locale === "sk" ? "sk_SK" : "en_GB",
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#1F2CE6",
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      className={`${instrumentSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <div className="grain" aria-hidden="true" />
        <ClickTracker />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  )
}
