"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useAppointments } from "@/components/providers/appointment-provider"
import { AppointmentCard } from "./appointment-card"
import { todayDate, services, masterAccentHex } from "@/lib/mock-data"

const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => {
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

  const todayAppointments = appointments.filter((a) => a.date === todayDate)

  function getAppointmentsAtSlot(slot: string) {
    return masters
      .map((master) => {
        const appt = todayAppointments.find(
          (a) => a.masterId === master.id && a.startTime === slot
        )
        const service = appt
          ? services.find((s) => s.id === appt.serviceId)
          : undefined
        return appt && service ? { appointment: appt, master, service } : null
      })
      .filter(Boolean) as { appointment: typeof todayAppointments[0]; master: typeof masters[0]; service: typeof services[0] }[]
  }

  return (
    <div className="flex flex-col animate-fade-in">
      {/* Header */}
      <header className="flex items-start pb-5 sm:pb-6">
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Расписание
            </h1>
            <span className="text-xs sm:text-[11px] font-semibold bg-primary/10 text-primary rounded-full px-3 sm:px-2.5 py-1.5 sm:py-1 border border-primary/20">
              Сегодня
            </span>
          </div>
          <p className="text-[15px] sm:text-base text-muted-foreground mt-1.5">
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

      {/* ─── MOBILE: timeline ─── */}
      <div className="sm:hidden -mx-4 px-4">
        <div className="relative">
          {TIME_SLOTS.map((slot, slotIdx) => {
            const appts = getAppointmentsAtSlot(slot)
            const occupied = appts.length > 0

            return (
              <div
                key={slot}
                className="animate-fade-in-up pb-3"
                style={{ animationDelay: `${slotIdx * 0.025}s` }}
              >
                <div className="flex items-start gap-4">
                  {/* Time label */}
                  <div className="shrink-0 pt-1 w-[28px]">
                    <span className="text-[13px] font-bold tabular-nums text-foreground/70">
                      {slot.slice(0, 2)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {occupied ? (
                      <div className="space-y-2">
                        {appts.map(({ appointment, master, service }) => (
                          <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            master={master}
                            service={service}
                            showMaster
                          />
                        ))}
                      </div>
                    ) : (
                      <div
                        onClick={onNewAppointment}
                        className="h-16 sm:h-auto rounded-xl border-2 border-dashed border-[hsl(350_65%_57%_/0.15)] flex items-center justify-center cursor-pointer hover:border-[hsl(350_65%_57%_/0.4)] hover:bg-[hsl(350_65%_57%_/0.04)] transition-all active:scale-[0.98]"
                      >
                        <span className="text-[13px] text-[hsl(350_65%_57%_/0.4)]">Свободно</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── DESKTOP: table ─── */}
      <div className="overflow-x-auto max-sm:hidden relative">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-background w-0" />
              {masters.map((m) => (
                <th
                  key={m.id}
                  className="text-center py-3 border-b border-border bg-background font-semibold text-sm"
                  style={{ color: masterAccentHex[m.id] ?? "var(--foreground)" }}
                >
                  Мастер {m.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="relative">
            {TIME_SLOTS.map((slot, slotIdx) => {
              const isLast = slotIdx === TIME_SLOTS.length - 1

              return (
                <tr
                  key={slot}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${slotIdx * 0.025}s` }}
                >
                  <td className="sticky left-0 z-10 bg-background align-top pr-3 overflow-visible">
                    <span className="text-xs text-foreground/70 tabular-nums leading-none font-semibold -translate-y-[9px] inline-block">
                      {slot}
                    </span>
                  </td>
                  {masters.map((master) => {
                    const appt = todayAppointments.find(
                      (a) => a.masterId === master.id && a.startTime === slot
                    )
                    const service = appt
                      ? services.find((s) => s.id === appt.serviceId)
                      : undefined
                    const accent = masterAccentHex[master.id]
                    return (
                      <td
                        key={master.id}
                        className={`h-[72px] sm:h-20 py-0 px-2 relative ${
                          isLast ? "" : "border-b border-border"
                        }`}
                        style={appt && accent ? { backgroundColor: `${accent}0D` } : undefined}
                      >
                        {appt && service ? (
                          <div className="animate-fade-in pt-0.5">
                            <AppointmentCard
                              appointment={appt}
                              master={master}
                              service={service}
                            />
                          </div>
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
