import { getLocale, getTranslations } from "next-intl/server"
import { site } from "@/config/site"
import { serviceKeys, servicePath } from "@/content/services"
import { getPathname } from "@/i18n/navigation"

// schema.org data for Google: who the company is, where it sits and what it does.
export async function StructuredData() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "Metadata" })
  const s = await getTranslations({ locale, namespace: "Services.items" })
  const orgId = `${site.url}/#organization`

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        description: t("description"),
        email: site.email,
        ...(site.phone ? { telephone: site.phone.replace(/\s/g, "") } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bauerova 1205/7",
          postalCode: "040 23",
          addressLocality: "Košice",
          addressCountry: "SK",
        },
        identifier: { "@type": "PropertyValue", propertyID: "IČO", value: site.ico },
        taxID: site.dic,
        areaServed: [
          { "@type": "Country", name: "Slovakia" },
          { "@type": "Place", name: "European Union" },
        ],
        knowsLanguage: ["sk", "en"],
        ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
        makesOffer: serviceKeys.map((key) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s(`${key}.title`),
            description: s(`${key}.body`),
            url: site.url + getPathname({ locale, href: servicePath[key] }),
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["sk", "en"],
        publisher: { "@id": orgId },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
