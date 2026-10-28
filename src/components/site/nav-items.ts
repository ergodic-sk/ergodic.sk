import { site } from "@/config/site"

const allNavItems = [
  { id: "method", n: "02" },
  { id: "services", n: "03" },
  { id: "drawings", n: "04" },
  { id: "products", n: "05" },
  { id: "studio", n: "06" },
] as const

export const navItems = allNavItems.filter((item) => item.id !== "studio" || site.showStudio)
