"use client"

import type { AppointmentFormData, Appointment } from "@/lib/types"
import { cn } from "@/lib/utils"
import { todayDate } from "@/lib/mock-data"
import { X } from "lucide-react"

interface Props {
  data: AppointmentFormData
  appointments: Appointment[]
  onChange: (data: Partial<AppointmentFormData>) => void
}

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => {
  const hour = i + 9
  return `${String(hour).padStart(2, "0")}:00`
})

export function StepTime({ data, appointments, onChange }: Props) {
  const bookedSlots = appointments
    .filter((a) => a.masterId === data.masterId && a.date === todayDate)
    .map((a) => a.startTime)

  return (
    <div className="space-y-3 animate-fade-in" key={data.masterId}>
      <p className="text-[15px] sm:text-sm text-muted-foreground max-sm:text-center">
        Выберите свободное время
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2.5">
        {TIME_SLOTS.map((slot, i) => {
          const isBooked = bookedSlots.includes(slot)
          const isSelected = data.startTime === slot
          return (
            <button
              key={slot}
              type="button"
              disabled={isBooked}
              onClick={() =>
                onChange({
                  startTime: slot,
                  endTime: calcEnd(slot, data.serviceId),
                })
              }
              style={{ animationDelay: `${i * 0.04}s` }}
              className={cn(
                "relative rounded-xl sm:rounded-lg border-2 px-4 py-4 sm:py-3 text-[16px] sm:text-sm font-medium transition-all duration-150 animate-fade-in",
                isBooked &&
                  "border-dashed border-muted-foreground/20 bg-muted/30 text-muted-foreground/40 cursor-not-allowed",
                !isBooked && isSelected &&
                  "border-primary bg-primary/10 text-primary shadow-sm",
                !isBooked && !isSelected &&
                  "border-border bg-white hover:border-foreground/40 hover:bg-muted/40 hover:shadow-sm cursor-pointer active:scale-[0.98]"
              )}
            >
              <span className={cn(isBooked && "line-through")}>{slot}</span>
              {isBooked && (
                <X className="absolute right-3.5 sm:right-2.5 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-3.5 sm:w-3.5 text-muted-foreground/40" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function calcEnd(startTime: string, serviceId: string): string {
  const durations: Record<string, number> = {
    manicure: 60,
    pedicure: 60,
    coating: 60,
    design: 60,
    complex: 120,
  }
  const dur = durations[serviceId] ?? 60
  const [h, m] = startTime.split(":").map(Number)
  const total = h * 60 + m + dur
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`
}
