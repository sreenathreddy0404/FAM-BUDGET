import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const labelVariants = cva("py-3 px-2 w-full rounded-lg border border-input bg-input/20 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(labelVariants(), className)}
      {...props} />
  );
}

export { Input }
