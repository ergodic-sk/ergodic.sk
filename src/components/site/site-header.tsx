import { useTranslations } from "next-intl"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { LocaleSwitch } from "./locale-switch"
import { LogoMark, Wordmark } from "./logo"
import { MobileNav } from "./mobile-nav"
import { navItems } from "./nav-items"
import { Container } from "./sheet-heading"

export function SiteHeader() {
  const t = useTranslations("Nav")

  return (
    <header className="border-paper/25 relative z-10 border-b md:border-0">
      <Container className="flex h-16 items-center justify-between md:h-24">
        <Link
          href="/"
          aria-label={t("home")}
          className="text-paper hover:text-paper flex items-center gap-2.5 no-underline"
        >
          <LogoMark className="size-7 md:size-9" />
          <Wordmark className="text-[22px] md:text-[28px]" />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <nav
            aria-label={t("label")}
            className="font-mono-caps flex items-center gap-7 text-xs tracking-[0.08em]"
          >
            {navItems.map(({ id, n }) => (
              <a key={id} href={`#${id}`} className="text-lilac-100 no-underline">
                <span className="text-lilac-500">{n}</span> {t(id)}
              </a>
            ))}
          </nav>
          <LocaleSwitch />
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "paper" }),
              "font-mono-caps h-auto px-4.5 py-3 text-xs font-medium tracking-[0.08em] no-underline"
            )}
          >
            {t("cta")}
          </a>
        </div>

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
