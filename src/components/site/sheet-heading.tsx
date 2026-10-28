import { delay } from "@/lib/reveal"
import { cn } from "@/lib/utils"

type Props = {
  eyebrow: string
  title: string
  tone: "cobalt" | "paper"
  aside?: React.ReactNode
  className?: string
}

/** Section title block styled as a drawing sheet header; its rule is drawn in when the sheet scrolls into view. */
export function SheetHeading({ eyebrow, title, tone, aside, className }: Props) {
  const onPaper = tone === "paper"
  return (
    <div
      data-reveal
      className={cn("relative flex flex-col gap-4 pb-5 md:flex-row md:items-end md:justify-between", className)}
    >
      <div className="flex flex-col gap-2.5">
        <p
          className={cn(
            "r-up font-mono-caps text-xs tracking-[0.1em]",
            onPaper ? "text-cobalt" : "text-lilac-300"
          )}
        >
          {eyebrow}
        </p>
        <h2
          style={delay(70)}
          className={cn(
            "r-up text-4xl leading-none font-semibold tracking-[-0.05em] text-balance md:text-[52px]",
            onPaper && "text-cobalt"
          )}
        >
          {title}
        </h2>
      </div>
      {aside && (
        <div className="r-up" style={delay(140)}>
          {aside}
        </div>
      )}
      <span
        aria-hidden="true"
        className={cn("r-rule absolute inset-x-0 bottom-0 h-px", onPaper ? "bg-cobalt" : "bg-paper/50")}
      />
    </div>
  )
}

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-10 xl:px-[72px]", className)}
      {...props}
    />
  )
}
