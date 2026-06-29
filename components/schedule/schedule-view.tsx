"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAppointments } from "@/components/providers/appointment-provider"
import { AppointmentCard } from "./appointment-card"
import { todayDate, services } from "@/lib/mock-data"

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) => {
  const hour = i + 9
  return `${String(hour).padStart(2, "0")}:00`
})

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00")
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ]
  return `${d.getDate()} ${months[d.getMonth()]}`
}

interface Props {
  onNewAppointment?: () => void
}

export function ScheduleView({ onNewAppointment }: Props) {
  const { masters, appointments } = useAppointments()
  const [selectedMasterId, setSelectedMasterId] = useState<string | null>(masters[0].id)

  const todayAppointments = appointments.filter((a) => a.date === todayDate)

  const filteredMasters = selectedMasterId
    ? masters.filter((m) => m.id === selectedMasterId)
    : masters

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-start pb-6">
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight">
            Расписание
          </h1>
          <p className="text-base text-muted-foreground mt-1.5">
            {formatDate(todayDate)}
          </p>
        </div>
        {onNewAppointment && (
          <Button
            onClick={onNewAppointment}
            className="h-10 px-4 gap-2 shrink-0 max-sm:hidden font-semibold"
          >
            <Plus className="h-4 w-4" />
            Новая запись
          </Button>
        )}
      </header>

      <div className="flex gap-2 pb-6 flex-wrap justify-center sm:flex-nowrap sm:justify-start">
        <button
          onClick={() => setSelectedMasterId(null)}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors max-sm:hidden ${
            selectedMasterId === null
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-muted-foreground border-border hover:border-foreground/30"
          }`}
        >
          Все
        </button>
        {masters.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMasterId(m.id)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedMasterId === m.id
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground border-border hover:border-foreground/30"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-background w-0" />
              {filteredMasters.map((m) => (
                <th
                  key={m.id}
                  className="text-center py-3 border-b border-border bg-muted/30 font-semibold text-xs sm:text-sm text-foreground"
                >
                  {m.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((slot, slotIdx) => {
              const isLast = slotIdx === TIME_SLOTS.length - 1
              return (
                <tr key={slot}>
                  <td className="sticky left-0 z-10 bg-background align-bottom pr-3 h-[72px]">
                    <span className="text-xs text-muted-foreground tabular-nums leading-none">
                      {slot}
                    </span>
                  </td>
                  {filteredMasters.map((master) => {
                    const appt = todayAppointments.find(
                      (a) => a.masterId === master.id && a.startTime === slot
                    )
                    const service = appt
                      ? services.find((s) => s.id === appt.serviceId)
                      : undefined
                    return (
                      <td
                        key={master.id}
                        className={`h-[72px] p-0 ${isLast ? "" : "border-b border-border/40"} ${appt ? "bg-muted/30" : ""}`}
                      >
                        {appt && service ? (
                          <AppointmentCard
                            appointment={appt}
                            master={master}
                            service={service}
                          />
                        ) : null}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
