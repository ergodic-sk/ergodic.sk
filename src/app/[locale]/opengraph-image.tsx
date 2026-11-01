import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { getTranslations } from "next-intl/server"
import { hasLocale } from "next-intl"
import { routing } from "@/i18n/routing"

// Link preview for LinkedIn, WhatsApp, Slack, Messenger and X. Inherited by every page under [locale].
export const alt = "Ergodic"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const cobalt = "#1F2CE6"
const paper = "#F3EEE4"
const lilac = "#C9CCF7"
const signal = "#FF7A3D"

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: param } = await params
  const locale = hasLocale(routing.locales, param) ? param : routing.defaultLocale
  const hero = await getTranslations({ locale, namespace: "Hero" })

  const [sans, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/InstrumentSans-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/IBMPlexMono-Medium.ttf")),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: cobalt,
          color: paper,
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 100 100">
            <path d="M12 50 C 42 50, 58 38, 88 38" fill="none" stroke={paper} strokeWidth="10" strokeLinecap="round" />
            <circle cx="12" cy="50" r="8.5" fill={paper} />
            <circle cx="88" cy="38" r="10" fill={signal} />
          </svg>
          <div style={{ fontSize: 52, letterSpacing: "-0.05em" }}>ergodic</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontFamily: "IBM Plex Mono", fontSize: 26, color: lilac, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {hero("scopeValue")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1, letterSpacing: "-0.055em" }}>
            <span>{hero("titleA")}</span>
            <span>{hero("titleB")}</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "IBM Plex Mono", fontSize: 24, color: lilac, letterSpacing: "0.08em" }}>
          <span>ERGODIC.SK</span>
          <span>KOŠICE · SK · EU</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Sans", data: sans, weight: 600, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  )
}
