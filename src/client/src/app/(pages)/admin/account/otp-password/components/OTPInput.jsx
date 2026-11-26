import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp"
import { MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const OTPInputComponent = ({ otp, setOtp, invalid = false }) => {
  return (
    <OTPInput
      id="otp-password"
      name="otp-password"
      containerClassName="flex items-center gap-3 has-disabled:opacity-50"
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      autoComplete="one-time-code"
      autoFocus
      aria-label="Mã OTP gồm 6 chữ số"
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? "otp-error" : undefined}
      value={otp}
      onChange={setOtp}
      render={({ slots }) => (
        <>
          <div className="flex">
            {slots.slice(0, 3).map((slot, idx) => (
              <Slot key={idx} invalid={invalid} {...slot} />
            ))}
          </div>

          <div className="text-muted-foreground/80">
            <MinusIcon size={16} aria-hidden="true" />
          </div>

          <div className="flex">
            {slots.slice(3).map((slot, idx) => (
              <Slot key={idx} invalid={invalid} {...slot} />
            ))}
          </div>
        </>
      )}
    />
  )
}

function Slot(props) {
  return (
    <div
      className={cn(
        "relative -ms-px flex size-12 sm:size-16 items-center justify-center border border-input bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-md last:rounded-e-md",
        { "border-destructive": props.invalid },
        { "z-10 border-ring ring-[3px] ring-ring/50": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-pulse bg-foreground" />
        </div>
      )}
    </div>
  )
}
