import { ServicePage, serviceMetadata } from "@/components/site/service-page"

export const generateMetadata = () => serviceMetadata("web")

export default function Page() {
  return <ServicePage service="web" />
}
