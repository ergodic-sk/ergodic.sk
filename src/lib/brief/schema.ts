export const needs = ["website", "eshop", "mobile", "automation", "unsure"] as const

export type Need = (typeof needs)[number]
export type BriefField = "name" | "email" | "message"
export type Brief = {
  name: string
  company: string
  needs: Need[]
  message: string
  email: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function invalidFields(brief: Brief): BriefField[] {
  const fields: BriefField[] = []
  if (!brief.name.trim()) fields.push("name")
  if (!EMAIL.test(brief.email.trim())) fields.push("email")
  if (!brief.message.trim()) fields.push("message")
  return fields
}

/** Prefilled mailto: link, so the brief goes out from the visitor's own mail app. */
export function briefMailto(to: string, brief: Brief, needLabels: string[]) {
  const subject = `Brief: ${brief.name.trim()}${brief.company.trim() ? ` · ${brief.company.trim()}` : ""}`
  const body = [
    `${brief.message.trim()}`,
    "",
    "---",
    `${brief.name.trim()}${brief.company.trim() ? `, ${brief.company.trim()}` : ""}`,
    needLabels.length ? needLabels.join(", ") : null,
    brief.email.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n")
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
