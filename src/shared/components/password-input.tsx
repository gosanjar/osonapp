import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { cn } from "@utils/utils"

interface PasswordInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  "aria-invalid"?: boolean
  error?: string
}

export function PasswordInput({
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        aria-invalid={ariaInvalid}
        className={cn("pr-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        tabIndex={-1}
        onClick={() => setShow((v) => !v)}
        className="absolute inset-y-0 right-0 size-auto px-3 text-muted-foreground hover:bg-transparent hover:text-foreground"
      >
        {show ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
      </Button>
    </div>
  )
}
