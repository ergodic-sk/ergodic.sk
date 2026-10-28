/** Tags an outbound link so the destination's analytics credit ergodic.sk and the spot on the page it came from. */
export function withUtm(url: string, placement: string) {
  const u = new URL(url)
  u.searchParams.set("utm_source", "ergodic.sk")
  u.searchParams.set("utm_medium", "referral")
  u.searchParams.set("utm_campaign", placement)
  return u.toString()
}
