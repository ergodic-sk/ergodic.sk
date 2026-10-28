"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Plays each [data-reveal] block once as it enters the viewport, and pauses [data-loop] animations off screen.
 * Blocks are picked up whenever they enter the DOM, not only on mount: if React re-creates the tree
 * (a recovered hydration mismatch, e.g. iOS Safari linking phone numbers) or streams content in later,
 * the new nodes still get observed instead of staying hidden.
 */
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
    const loops = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.toggleAttribute("data-offscreen", !entry.isIntersecting)
    })

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not([data-inview])").forEach((el) => reveal.observe(el))
      document.querySelectorAll("[data-loop]").forEach((el) => loops.observe(el))
    }
    scan()

    // observe() is idempotent per target, so rescanning after DOM changes is safe.
    let frame = 0
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(scan)
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(frame)
      mutations.disconnect()
      reveal.disconnect()
      loops.disconnect()
    }
  }, [pathname])

  return null
}
