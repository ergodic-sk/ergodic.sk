"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { LocaleSwitch } from "./locale-switch"
import { navItems } from "./nav-items"

export function MobileNav() {
  const t = useTranslations("Nav")
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline-paper"
            aria-label={t("open")}
            className="font-mono-caps h-11 bg-transparent px-3.5 text-xs tracking-[0.08em]"
          />
        }
      >
        {t("label")}
      </SheetTrigger>
      <SheetContent
        side="top"
        className="sheet-cobalt border-paper/25 text-paper gap-6 px-5 pt-5 pb-8 [&_[data-slot=sheet-close]]:text-paper [&_[data-slot=sheet-close]]:hover:bg-paper/10"
      >
        <SheetTitle className="font-mono-caps text-lilac-300 text-xs font-normal tracking-[0.1em]">
          {t("label")}
        </SheetTitle>
        <nav className="flex flex-col">
          {navItems.map(({ id, n }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={close}
              className="border-paper/20 flex items-baseline gap-3 border-b py-3.5 text-2xl font-semibold tracking-[-0.03em] no-underline"
            >
              <span className="text-lilac-500 font-mono text-xs font-normal">{n}</span>
              {t(id)}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={close}
          className={cn(buttonVariants({ variant: "paper", size: "xl" }), "w-full no-underline")}
        >
          {t("cta")} →
        </a>
        <LocaleSwitch />
      </SheetContent>
    </Sheet>
  )
}
