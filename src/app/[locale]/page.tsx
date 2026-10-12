import { Contact } from "@/components/site/contact"
import { Drawings } from "@/components/site/drawings"
import { Hero } from "@/components/site/hero"
import { Method } from "@/components/site/method"
import { Products } from "@/components/site/products"
import { Services } from "@/components/site/services"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Studio } from "@/components/site/studio"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Method />
        <Services />
        <Drawings />
        <Products />
        <Studio />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
