import { useTranslations } from "next-intl"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PathFan, PathStudy } from "./path-study"
import { Container } from "./sheet-heading"
import { SiteHeader } from "./site-header"

function SheetFrame() {
  const corner = "absolute size-5 border-paper/70"
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-6 hidden md:block">
      <div className="border-paper/35 absolute inset-0 border" />
      <span className={cn(corner, "top-0 left-0 border-t border-l")} />
      <span className={cn(corner, "top-0 right-0 border-t border-r")} />
      <span className={cn(corner, "bottom-0 left-0 border-b border-l")} />
      <span className={cn(corner, "right-0 bottom-0 border-r border-b")} />
    </div>
  )
}

export function Hero() {
  const t = useTranslations("Hero")

  const specs = [
    [t("scope"), t("scopeValue")],
    [t("clients"), t("clientsValue")],
    [t("model"), t("modelValue")],
  ]

  return (
    <section className="sheet-cobalt relative flex min-h-svh flex-col md:min-h-[min(900px,100svh)] max-md:[background-size:24px_24px]">
      <SheetFrame />
      <SiteHeader />

      <Container className="relative flex grow flex-col justify-center gap-10 pt-7 pb-6 md:pb-18 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex grow flex-col gap-5 md:gap-6.5 lg:max-w-[560px] lg:grow-0">
          <p className="font-mono-caps text-lilac-300 text-[11px] tracking-[0.1em] md:text-[13px]">
            <span className="md:hidden">{t("eyebrowShort")}</span>
            <span className="max-md:hidden">{t("eyebrow")}</span>
          </p>
          <h1 className="text-[44px] leading-[0.98] font-semibold tracking-[-0.055em] text-balance md:text-7xl md:leading-[0.96] xl:text-[76px]">
            {t("titleA")} <br className="max-md:hidden" />
            {t("titleB")}
          </h1>
          <p className="text-lilac-200 max-w-[500px] text-[17px] leading-normal md:text-[19px]">
            <span className="md:hidden">{t("leadShort")}</span>
            <span className="max-md:hidden">{t("lead")}</span>
          </p>

          <div className="lg:hidden">
            <PathFan className="w-full max-w-[460px]" />
            <p className="font-mono-caps text-lilac-300 mt-5 text-[11px] tracking-[0.08em]">
              {t("caption")}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 md:mt-0 md:flex-row md:items-center md:gap-6">
            <a
              href="#contact"
              className={cn(buttonVariants({ variant: "paper", size: "xl" }), "no-underline")}
            >
              {t("primary")} →
            </a>
            <a
              href="#drawings"
              className="text-paper max-md:border-paper/55 inline-flex h-12 items-center justify-center text-base font-medium underline-offset-[5px] max-md:rounded-sm max-md:border max-md:no-underline md:h-auto md:text-[17px] md:underline"
            >
              {t("secondary")}
            </a>
          </div>

          <dl className="border-paper/45 font-mono-caps mt-2 hidden grid-cols-3 border text-[11px] tracking-[0.06em] md:grid">
            {specs.map(([k, v], i) => (
              <div
                key={k}
                className={cn("flex flex-col gap-1 px-3 py-2.5", i < 2 && "border-paper/30 border-r")}
              >
                <dt className="text-lilac-500">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <PathStudy
          className="hidden w-full max-w-[720px] lg:block"
          labels={{ start: t("drawingStart"), chosen: t("drawingChosen"), built: t("drawingBuilt") }}
        />
      </Container>
    </section>
  )
}
