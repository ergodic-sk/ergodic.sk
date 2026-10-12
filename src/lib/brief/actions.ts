"use server"

import { routing } from "@/i18n/routing"
import { briefSchema, type BriefField, type BriefState } from "./schema"
import { sendBrief } from "./send"

const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "")

export async function submitBrief(_prev: BriefState, formData: FormData): Promise<BriefState> {
  // Honeypot: real people never see this field.
  if (str(formData.get("website"))) return { status: "success" }

  const values = {
    name: str(formData.get("name")),
    company: str(formData.get("company")),
    message: str(formData.get("message")),
    email: str(formData.get("email")),
  }
  const locale = str(formData.get("locale"))

  const parsed = briefSchema.safeParse({ ...values, needs: formData.getAll("needs") })
  if (!parsed.success) {
    const fields = [
      ...new Set(
        parsed.error.issues
          .map((issue) => issue.path[0])
          .filter((f): f is BriefField => f === "name" || f === "email" || f === "message")
      ),
    ]
    return { status: "error", fields, sendFailed: false, values }
  }

  try {
    await sendBrief(parsed.data, {
      locale: (routing.locales as readonly string[]).includes(locale) ? locale : routing.defaultLocale,
    })
  } catch (error) {
    console.error("[brief] send failed", error)
    return { status: "error", fields: [], sendFailed: true, values }
  }

  return { status: "success" }
}
