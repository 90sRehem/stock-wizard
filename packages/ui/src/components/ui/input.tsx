import * as React from "react"

import { cn } from "../../lib/utils"
import { Icons } from "./icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    }

    const inputType = type === "password" && passwordVisible ? "text" : type;

    return (
      <div className="relative">

        <input
          type={inputType}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <Icons.EyeOff className="h-4 w-4" />
            ) : (
              <Icons.Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
