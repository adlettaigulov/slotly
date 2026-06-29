"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { AppointmentFormData, Service } from "@/lib/types"

interface Props {
  data: AppointmentFormData
  services: Service[]
  onChange: (data: Partial<AppointmentFormData>) => void
}

export function StepClientService({ data, services, onChange }: Props) {
  const valid =
    data.clientName.trim().length > 0 && data.serviceId.length > 0

  return (
    <div className="space-y-6">
      <div className="space-y-2.5">
        <Label htmlFor="clientName" className="text-[17px] sm:text-sm">
          Имя клиента
        </Label>
        <Input
          id="clientName"
          placeholder="Например, Айгерим"
          value={data.clientName}
          onChange={(e) => onChange({ clientName: e.target.value })}
          autoFocus
          className="h-14 sm:h-9 text-[17px] sm:text-sm px-4 sm:px-3"
        />
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="service" className="text-[17px] sm:text-sm">
          Услуга
        </Label>
        <Select
          value={data.serviceId}
          onValueChange={(value) => {
            const service = services.find((s) => s.id === value)
            const duration = service?.duration ?? 60
            onChange({
              serviceId: value,
              endTime: calcEndTime(data.startTime || "09:00", duration),
            })
          }}
        >
          <SelectTrigger
            id="service"
            className="h-14 sm:h-9 text-[17px] sm:text-sm px-4 sm:px-3"
          >
            <SelectValue placeholder="Выберите услугу" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                <span className="flex items-center justify-between w-full gap-4">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground tabular-nums">
                    {s.duration} мин
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-[15px] sm:text-xs text-muted-foreground text-center">
        {valid ? "Нажмите «Далее»" : "Заполните имя и выберите услугу"}
      </div>
    </div>
  )
}

function calcEndTime(startTime: string, duration: number): string {
  const [h, m] = startTime.split(":").map(Number)
  const total = h * 60 + m + duration
  const endH = Math.floor(total / 60)
  const endM = total % 60
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`
}
