"use client"

import { useEffect, useRef } from "react"

/** Sticky shell for the header: transparent over the hero, solid cobalt once the page scrolls. */
export function StickyHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      el.dataset.scrolled = window.scrollY > 8 ? "true" : "false"
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div
      ref={ref}
      data-scrolled="false"
      className="text-paper data-[scrolled=true]:bg-cobalt/95 data-[scrolled=true]:border-paper/20 sticky top-0 z-40 border-b border-paper/25 md:border-transparent transition-colors duration-200 data-[scrolled=true]:backdrop-blur-sm"
    >
      {children}
    </div>
  )
}
