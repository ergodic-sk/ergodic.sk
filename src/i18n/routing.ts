import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
  localePrefix: "as-needed",
  // Internal route → public URL per locale. Service pages get keyword slugs in each language.
  pathnames: {
    "/": "/",
    "/privacy": "/privacy",
    "/services/web": { sk: "/tvorba-webov", en: "/web-development" },
    "/services/mobile": { sk: "/mobilne-aplikacie", en: "/mobile-app-development" },
    "/services/automation": { sk: "/automatizacia-procesov", en: "/process-automation" },
    "/services/care": { sk: "/sprava-webu", en: "/maintenance" },
  },
})

export type Locale = (typeof routing.locales)[number]
export type AppPathname = keyof typeof routing.pathnames
