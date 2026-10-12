import type { MetadataRoute } from "next"
import { site } from "@/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { sk: `${site.url}/`, en: `${site.url}/en` }
  return [
    { url: `${site.url}/`, alternates: { languages } },
    {
      url: `${site.url}/privacy`,
      alternates: { languages: { sk: `${site.url}/privacy`, en: `${site.url}/en/privacy` } },
    },
  ]
}
