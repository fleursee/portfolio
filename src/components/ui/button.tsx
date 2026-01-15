'use client'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-soft text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-cute hover:shadow-soft",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-muted hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        mint: "bg-mint-400 text-slate-900 hover:bg-mint-500 dark:bg-mint-600 dark:text-white dark:hover:bg-mint-500 shadow-cute",
        blush: "bg-blush-400 text-slate-900 hover:bg-blush-500 dark:bg-blush-600 dark:text-white dark:hover:bg-blush-500 shadow-cute",
        lavender: "bg-lavender-300 text-slate-900 hover:bg-lavender-400 dark:bg-lavender-500 dark:text-white dark:hover:bg-lavender-400 shadow-cute",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-soft px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button, buttonVariants }
