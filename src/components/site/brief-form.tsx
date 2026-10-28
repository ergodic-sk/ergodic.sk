"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Link } from "@/i18n/navigation"
import { site } from "@/config/site"
import { briefMailto, invalidFields, needs, type BriefField, type Need } from "@/lib/brief/schema"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"

const cell = "border-ink/12 flex flex-col gap-2 px-4.5 py-4"
const label = "font-mono-caps text-cobalt text-[11px] font-normal tracking-[0.08em]"
const field =
  "text-ink placeholder:text-ink-mute/70 h-auto rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-1.5 text-lg md:text-lg focus-visible:border-cobalt focus-visible:ring-0 aria-invalid:border-signal-ink aria-invalid:ring-0"

export function BriefForm() {
  const t = useTranslations("Brief")
  const [selected, setSelected] = useState<string[]>(["website"])
  const [errors, setErrors] = useState<BriefField[]>([])
  const [opened, setOpened] = useState(false)

  // No server-side sending for now: the brief opens prefilled in the visitor's mail app.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = (key: string) => String(data.get(key) ?? "")
    if (text("website")) return

    const chosen = needs.filter((n) => selected.includes(n))
    const brief = {
      name: text("name"),
      company: text("company"),
      needs: chosen as Need[],
      message: text("message"),
      email: text("email"),
    }
    const invalid = invalidFields(brief)
    setErrors(invalid)
    if (invalid.length) {
      trackEvent("brief_invalid", { fields: invalid.join(",") })
      return
    }

    trackEvent("brief_submit", { needs: chosen.join(",") || "none", count: chosen.length })
    const labels = chosen.map((n) => t(`needOptions.${n}`))
    window.location.href = briefMailto(site.email, brief, labels)
    setOpened(true)
  }

  if (opened) {
    return (
      <div
        role="status"
        className="text-ink flex min-h-64 flex-col justify-center gap-4 bg-white p-8 shadow-[0_24px_60px_-28px_rgb(12_16_51/0.55)] transition-[opacity,translate] duration-500 ease-out starting:translate-y-2 starting:opacity-0"
      >
        <span
          className="bg-signal size-3 rounded-full transition-[opacity,scale] delay-150 duration-400 ease-out starting:scale-50 starting:opacity-0"
          aria-hidden="true"
        />
        <p className="text-2xl font-semibold tracking-[-0.03em] text-balance">{t("success")}</p>
        <p className="text-ink-soft text-[15px]">
          {t.rich("successHint", {
            mail: (chunks) => <a href={`mailto:${site.email}`}>{chunks}</a>,
          })}
        </p>
      </div>
    )
  }

  const invalid = (f: BriefField) => errors.includes(f)
  const errorId = (f: BriefField) => `brief-${f}-error`

  const fieldError = (name: BriefField) =>
    invalid(name) && (
      <p
        id={errorId(name)}
        className="text-signal-ink text-sm transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0"
      >
        {t(`errors.${name}`)}
      </p>
    )

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="text-ink grid grid-cols-1 bg-white shadow-[0_24px_60px_-28px_rgb(12_16_51/0.55)] md:grid-cols-2"
    >
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={cn(cell, "border-b md:border-r")}>
        <Label htmlFor="brief-name" className={label}>
          {t("name")}
        </Label>
        <Input
          id="brief-name"
          name="name"
          required
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          aria-invalid={invalid("name") || undefined}
          aria-describedby={invalid("name") ? errorId("name") : undefined}
          className={field}
        />
        {fieldError("name")}
      </div>
      <div className={cn(cell, "border-b")}>
        <Label htmlFor="brief-company" className={label}>
          {t("company")}
        </Label>
        <Input
          id="brief-company"
          name="company"
          autoComplete="organization"
          placeholder={t("companyPlaceholder")}
          className={field}
        />
      </div>

      <fieldset className={cn(cell, "gap-3 border-b md:col-span-2")}>
        <legend className={cn(label, "float-left mb-3 w-full")}>{t("needs")}</legend>
        <ToggleGroup
          multiple
          value={selected}
          onValueChange={(next) => {
            const added = next.find((n) => !selected.includes(n))
            const removed = selected.find((n) => !next.includes(n))
            const need = added ?? removed
            if (need) trackEvent("need_toggle", { need, selected: Boolean(added) })
            setSelected(next)
          }}
          spacing={2.5}
          className="flex-wrap"
        >
          {needs.map((need) => (
            <ToggleGroupItem
              key={need}
              value={need}
              variant="outline"
              className="border-ink/20 text-ink hover:bg-cobalt/6 hover:text-ink data-pressed:border-cobalt data-pressed:bg-cobalt data-pressed:text-paper h-auto rounded-sm px-3.5 py-2.5 text-[15px] font-normal data-pressed:font-medium"
            >
              {t(`needOptions.${need}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </fieldset>

      <div className={cn(cell, "border-b md:col-span-2")}>
        <Label htmlFor="brief-message" className={label}>
          {t("message")}
        </Label>
        <Textarea
          id="brief-message"
          name="message"
          required
          rows={4}
          placeholder={t("messagePlaceholder")}
          aria-invalid={invalid("message") || undefined}
          aria-describedby={invalid("message") ? errorId("message") : undefined}
          className={cn(field, "resize-none border-b-0 text-[17px] leading-normal md:text-[17px]")}
        />
        {fieldError("message")}
      </div>

      <div className={cn(cell, "max-md:border-b md:border-r")}>
        <Label htmlFor="brief-email" className={label}>
          {t("email")}
        </Label>
        <Input
          id="brief-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={invalid("email") || undefined}
          aria-describedby={invalid("email") ? errorId("email") : undefined}
          className={field}
        />
        {fieldError("email")}
      </div>
      <div className={cn(cell, "justify-center gap-3 md:items-end")}>
        <Button type="submit" size="xl" className="max-md:w-full">
          {t("submit")} →
        </Button>
      </div>

      <div className="border-ink/12 text-ink-mute flex flex-col gap-2 border-t px-4.5 py-3 text-xs md:col-span-2">
        <p>
          {t.rich("consent", {
            link: (chunks) => (
              <Link href="/privacy" className="underline underline-offset-2">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </form>
  )
}
