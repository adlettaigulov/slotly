"use client"

import type { AppointmentFormData, Appointment } from "@/lib/types"
import { cn } from "@/lib/utils"
import { todayDate } from "@/lib/mock-data"

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
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Выберите свободное время
      </p>
      <div className="grid grid-cols-2 gap-2">
        {TIME_SLOTS.map((slot) => {
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
              className={cn(
                "rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all",
                isBooked &&
                  "border-muted bg-muted/50 text-muted-foreground/40 line-through cursor-not-allowed",
                !isBooked && isSelected && "border-foreground bg-muted",
                !isBooked && !isSelected &&
                  "border-border bg-background hover:border-foreground/30 hover:bg-muted/50 cursor-pointer"
              )}
            >
              {slot}
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
