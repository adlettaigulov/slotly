"use client"

import type { Appointment, Master, Service } from "@/lib/types"
import { masterColors, masterAccentHex } from "@/lib/mock-data"

interface Props {
  appointment: Appointment
  master: Master
  service: Service
}

export function AppointmentCard({ appointment, master, service }: Props) {
  return (
    <div
      className={`m-1.5 h-[calc(100%-12px)] rounded-md border border-l-[3px] p-2.5 sm:p-3 flex flex-col justify-center ${masterColors[master.id] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
      style={{ borderLeftColor: masterAccentHex[master.id] ?? "#6b7280" }}
    >
      <p className="text-sm font-semibold leading-tight">{appointment.clientName}</p>
      <p className="text-xs opacity-70 mt-0.5 leading-tight">{service.name}</p>
      <p className="text-xs opacity-50 mt-0.5 leading-tight">
        {appointment.startTime}–{appointment.endTime}
      </p>
    </div>
  )
}
