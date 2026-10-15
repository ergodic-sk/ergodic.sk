"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Plays each [data-reveal] block once as it enters the viewport, and pauses [data-loop] animations off screen. */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    ;(window as Window & { __reveal?: boolean }).__reveal = true

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute("data-inview", "")
          reveal.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    )
    document.querySelectorAll("[data-reveal]:not([data-inview])").forEach((el) => reveal.observe(el))

    const loops = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting)
    })
    document.querySelectorAll("[data-loop]").forEach((el) => loops.observe(el))

    return () => {
      reveal.disconnect()
      loops.disconnect()
    }
  }, [pathname])

  return null
}
