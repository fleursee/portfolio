// src/components/ui/textarea.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles with softer radius and pastel border
          "flex min-h-[80px] w-full rounded-lg border border-border bg-card px-3 py-2 text-sm",
          "placeholder:text-muted-foreground",
          // Cute focus state: Mint ring and soft shadow
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400 focus-visible:shadow-cute",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
