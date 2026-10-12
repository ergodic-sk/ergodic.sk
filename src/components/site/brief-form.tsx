"use client"

import { useActionState, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Link } from "@/i18n/navigation"
import { submitBrief } from "@/lib/brief/actions"
import { needs, type BriefField, type BriefState } from "@/lib/brief/schema"
import { cn } from "@/lib/utils"

const initialState: BriefState = { status: "idle" }

const cell = "border-paper/30 flex flex-col gap-2 px-4.5 py-4"
const label = "font-mono-caps text-lilac-300 text-[11px] font-normal tracking-[0.08em]"
const field =
  "text-paper placeholder:text-lilac-400 h-auto rounded-none border-0 border-b border-paper/50 bg-transparent px-0 py-1.5 text-lg md:text-lg focus-visible:border-signal focus-visible:ring-0 aria-invalid:border-signal aria-invalid:ring-0"

export function BriefForm() {
  const t = useTranslations("Brief")
  const locale = useLocale()
  const [state, formAction, pending] = useActionState(submitBrief, initialState)
  const [selected, setSelected] = useState<string[]>(["website"])

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border-paper/55 flex min-h-64 flex-col justify-center gap-4 border p-8 md:self-start"
      >
        <span className="bg-signal size-3 rounded-full" aria-hidden="true" />
        <p className="text-2xl font-semibold tracking-[-0.03em] text-balance">{t("success")}</p>
      </div>
    )
  }

  const values = state.status === "error" ? state.values : undefined
  const invalid = (f: BriefField) => state.status === "error" && state.fields.includes(f)
  const errorId = (f: BriefField) => `brief-${f}-error`

  const fieldError = (name: BriefField) =>
    invalid(name) && (
      <p id={errorId(name)} className="text-signal text-sm">
        {t(`errors.${name}`)}
      </p>
    )

  return (
    <form
      action={formAction}
      noValidate
      className="border-paper/55 grid grow grid-cols-1 border md:grid-cols-2 lg:self-start"
    >
      <input type="hidden" name="locale" value={locale} />
      {selected.map((need) => (
        <input key={need} type="hidden" name="needs" value={need} />
      ))}
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
          defaultValue={values?.name}
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
          defaultValue={values?.company}
          className={field}
        />
      </div>

      <fieldset className={cn(cell, "gap-3 border-b md:col-span-2")}>
        <legend className={cn(label, "float-left mb-3 w-full")}>{t("needs")}</legend>
        <ToggleGroup
          multiple
          value={selected}
          onValueChange={setSelected}
          spacing={2.5}
          className="flex-wrap"
        >
          {needs.map((need) => (
            <ToggleGroupItem
              key={need}
              value={need}
              variant="outline"
              className="border-paper/55 text-paper hover:bg-paper/10 hover:text-paper data-pressed:border-paper data-pressed:bg-paper data-pressed:text-ink h-auto rounded-sm px-3.5 py-2.5 text-[15px] font-normal data-pressed:font-medium"
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
          defaultValue={values?.message}
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
          defaultValue={values?.email}
          aria-invalid={invalid("email") || undefined}
          aria-describedby={invalid("email") ? errorId("email") : undefined}
          className={field}
        />
        {fieldError("email")}
      </div>
      <div className={cn(cell, "justify-center gap-3 md:items-end")}>
        <Button type="submit" variant="paper" size="xl" disabled={pending} className="max-md:w-full">
          {pending ? t("sending") : `${t("submit")} →`}
        </Button>
      </div>

      <div className="border-paper/30 text-lilac-300 flex flex-col gap-2 border-t px-4.5 py-3 text-xs md:col-span-2">
        {state.status === "error" && state.sendFailed && (
          <p role="alert" className="text-signal text-sm">
            {t("errors.send")}
          </p>
        )}
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
