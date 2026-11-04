import { ServicePage, serviceMetadata } from "@/components/site/service-page"

export const generateMetadata = () => serviceMetadata("automation")

export default function Page() {
  return <ServicePage service="automation" />
}
