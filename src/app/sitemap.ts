import type { MetadataRoute } from "next"
import { site } from "@/config/site"
import { serviceKeys, servicePath } from "@/content/services"
import { getPathname } from "@/i18n/navigation"
import { routing, type AppPathname } from "@/i18n/routing"

const pages: { href: AppPathname; priority: number }[] = [
  { href: "/", priority: 1 },
  ...serviceKeys.map((key) => ({ href: servicePath[key], priority: 0.8 })),
  { href: "/privacy", priority: 0.2 },
]

// Every language version gets its own <url> entry, each listing all alternates (Google's hreflang rule).
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ href, priority }) => {
    const url = (locale: (typeof routing.locales)[number]) => site.url + getPathname({ locale, href })
    const languages = {
      ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
      "x-default": url(routing.defaultLocale),
    }
    return routing.locales.map((locale) => ({ url: url(locale), priority, alternates: { languages } }))
  })
}
