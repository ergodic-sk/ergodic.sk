import { ServicePage, serviceMetadata } from "@/components/site/service-page"

export const generateMetadata = () => serviceMetadata("mobile")

export default function Page() {
  return <ServicePage service="mobile" />
}
