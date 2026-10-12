import "server-only"
import nodemailer from "nodemailer"
import type { Brief } from "./schema"

function smtpConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, CONTACT_TO, CONTACT_FROM } =
    process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO) return null

  const port = Number(SMTP_PORT ?? 465)
  return {
    transport: {
      host: SMTP_HOST,
      port,
      secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    },
    to: CONTACT_TO,
    from: CONTACT_FROM || SMTP_USER,
  }
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim()

export async function sendBrief(brief: Brief, meta: { locale: string }) {
  const config = smtpConfig()
  if (!config) throw new Error("SMTP is not configured")

  const transporter = nodemailer.createTransport(config.transport)
  const subject = `Brief: ${oneLine(brief.name)}${brief.company ? ` · ${oneLine(brief.company)}` : ""}`

  const text = [
    `Name:    ${brief.name}`,
    `Company: ${brief.company || "-"}`,
    `Email:   ${brief.email}`,
    `Needs:   ${brief.needs.length ? brief.needs.join(", ") : "-"}`,
    `Locale:  ${meta.locale}`,
    "",
    brief.message,
  ].join("\n")

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: { name: oneLine(brief.name), address: brief.email },
    subject,
    text,
  })
}
