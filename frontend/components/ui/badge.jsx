import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:size-3 [&>svg]:pointer-events-none transition-[color,box-shadow] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90",

        outline:
          "border-border text-foreground hover:bg-accent hover:text-accent-foreground",

        ghost:
          "hover:bg-accent hover:text-accent-foreground",

        link:
          "text-primary underline-offset-4 hover:underline",

        /* ✅ CUSTOM COLOR VARIANTS */
        success:
          "bg-green-600 text-white hover:bg-green-700",

        warning:
          "bg-orange-600 text-white hover:bg-orange-700",

        neutral:
          "bg-stone-600 text-white hover:bg-stone-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
