"use client"

import type { AppointmentFormData, Master, Service } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface Props {
  data: AppointmentFormData
  master: Master | undefined
  service: Service | undefined
  onConfirm: () => void
}

export function StepConfirmation({ data, master, service, onConfirm }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border divide-y divide-border">
        <Row label="Клиент" value={data.clientName} />
        <Row label="Услуга" value={service?.name ?? data.serviceId} />
        <Row label="Мастер" value={master?.name ?? data.masterId} />
        <Row label="Дата" value={data.date} />
        <Row
          label="Время"
          value={`${data.startTime}–${data.endTime}`}
        />
      </div>

      <Button
        onClick={onConfirm}
        className="w-full h-11 text-base"
      >
        Создать запись
      </Button>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
