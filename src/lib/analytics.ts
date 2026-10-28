import { track } from "@vercel/analytics"

// Custom events sent to Vercel Web Analytics. Custom events need a Pro or
// Enterprise plan; on Hobby, track() calls are simply not recorded.
// Keep to two short properties per event: the plan limits the count.
export type AnalyticsEvent =
  | "cta_click"
  | "mobile_nav_open"
  | "locale_switch"
  | "need_toggle"
  | "brief_submit"
  | "brief_invalid"
  | "contact_email_click"
  | "phone_click"
  | "case_click"
  | "heystol_click"
  | "okfaktura_click"
  | "linkedin_click"

type Props = Record<string, string | number | boolean | null>

export function trackEvent(name: AnalyticsEvent, props?: Props) {
  track(name, props)
}

/**
 * Attributes for links rendered in Server Components. A single document-level
 * listener (ClickTracker) reads them, so those links stay server-rendered.
 */
export function trackAttrs(name: AnalyticsEvent, props?: { location?: string; target?: string }) {
  return {
    "data-track": name,
    ...(props?.location && { "data-track-location": props.location }),
    ...(props?.target && { "data-track-target": props.target }),
  }
}
