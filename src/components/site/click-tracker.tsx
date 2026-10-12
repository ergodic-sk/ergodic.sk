"use client"

import { useEffect } from "react"
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics"

/** Sends a custom event for clicks on elements marked with trackAttrs(). */
export function ClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const el = (event.target as Element | null)?.closest<HTMLElement>("[data-track]")
      if (!el) return
      const { track, trackLocation, trackTarget } = el.dataset
      const props: Record<string, string> = {}
      if (trackLocation) props.location = trackLocation
      if (trackTarget) props.target = trackTarget
      trackEvent(track as AnalyticsEvent, props)
    }
    document.addEventListener("click", onClick, { capture: true })
    return () => document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
