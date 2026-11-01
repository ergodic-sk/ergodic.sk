import type { MetadataRoute } from "next"
import { site } from "@/config/site"

// Every language version gets its own <url> entry, each listing all alternates (Google's hreflang rule).
const pages = [
  { sk: "/", en: "/en", priority: 1 },
  { sk: "/privacy", en: "/en/privacy", priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ sk, en, priority }) => {
    const languages = { sk: `${site.url}${sk}`, en: `${site.url}${en}`, "x-default": `${site.url}${sk}` }
    return [sk, en].map((path) => ({
      url: `${site.url}${path}`,
      priority,
      alternates: { languages },
    }))
  })
}
