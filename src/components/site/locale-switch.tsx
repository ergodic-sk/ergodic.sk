"use client"

import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export function LocaleSwitch({ className }: { className?: string }) {
  const t = useTranslations("Nav")
  const pathname = usePathname()
  const current = useLocale()

  return (
    <nav
      aria-label={t("language")}
      className={cn("font-mono-caps flex items-center gap-1 text-xs tracking-[0.08em]", className)}
    >
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-lilac-500" aria-hidden="true">/</span>}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "px-0.5 no-underline",
              locale === current ? "text-paper" : "text-lilac-500"
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </nav>
  )
}
