"use client"

import type { Appointment, Master, Service } from "@/lib/types"
import { masterAccentHex } from "@/lib/mock-data"

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

interface Props {
  appointment: Appointment
  master: Master
  service: Service
  showMaster?: boolean
}

export function AppointmentCard({ appointment, master, service, showMaster }: Props) {
  const accent = masterAccentHex[master.id] ?? "#6b7280"

  return (
    <div
      className="rounded-xl border border-border/80 shadow-[0_2px_8px_0_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-center transition-all hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.09)] hover:-translate-y-px sm:rounded-lg px-3.5 sm:px-3 py-3 sm:py-2.5"
      style={{
        borderLeft: `6px solid ${accent}`,
        backgroundColor: hexToRgba(accent, 0.12),
      }}
    >
      <p className="font-bold leading-tight text-[16px] sm:text-[15px] text-foreground">
        {appointment.clientName}
        {showMaster && (
          <span className="font-medium text-[13px] sm:text-xs text-foreground/60 ml-2">
            Мастер {master.name}
          </span>
        )}
      </p>
      <p className="leading-tight mt-0.5 text-[13px] sm:text-xs" style={{ color: accent }}>
        {service.name}
        <span className="text-foreground/50 ml-2 font-medium">
          {appointment.startTime}–{appointment.endTime}
        </span>
      </p>
    </div>
  )
}
