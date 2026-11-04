import { ServicePage, serviceMetadata } from "@/components/site/service-page"

export const generateMetadata = () => serviceMetadata("care")

export default function Page() {
  return <ServicePage service="care" />
}
