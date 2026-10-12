import { cn } from "@/lib/utils"

type Props = {
  eyebrow: string
  title: string
  tone: "cobalt" | "paper"
  aside?: React.ReactNode
  className?: string
}

/** Section title block styled as a drawing sheet header with a rule underneath. */
export function SheetHeading({ eyebrow, title, tone, aside, className }: Props) {
  const onPaper = tone === "paper"
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b pb-5 md:flex-row md:items-end md:justify-between",
        onPaper ? "border-cobalt" : "border-paper/50",
        className
      )}
    >
      <div className="flex flex-col gap-2.5">
        <p
          className={cn(
            "font-mono-caps text-xs tracking-[0.1em]",
            onPaper ? "text-cobalt" : "text-lilac-300"
          )}
        >
          {eyebrow}
        </p>
        <h2
          className={cn(
            "text-4xl leading-none font-semibold tracking-[-0.05em] text-balance md:text-[52px]",
            onPaper && "text-cobalt"
          )}
        >
          {title}
        </h2>
      </div>
      {aside}
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
