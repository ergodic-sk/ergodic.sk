// Company facts shown on the site. Values set to null are hidden until filled in.
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ergodic.sk",
  name: "Ergodic",
  legalName: "Ergodic s. r. o.",
  email: "office@ergodic.sk",
  phone: null as string | null,
  address: "Bauerova 1205/7, 040 23 Košice",
  ico: "57859892",
  dic: "2123319803",
  register:
    "Zapísaná v OR Mestského súdu Košice, oddiel Sro, vložka č. 67484/V",
  linkedin: null as string | null,
  heystol: "https://heystol.com",
  founderPhoto: null as string | null,
}
