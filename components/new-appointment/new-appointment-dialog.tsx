"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAppointments } from "@/components/providers/appointment-provider"
import { StepClientService } from "./step-client-service"
import { StepMaster } from "./step-master"
import { StepTime } from "./step-time"
import { StepConfirmation } from "./step-confirmation"
import { todayDate } from "@/lib/mock-data"
import type { AppointmentFormData } from "@/lib/types"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const STEPS = ["Клиент и услуга", "Мастер", "Время", "Подтверждение"]

const emptyForm: AppointmentFormData = {
  clientName: "",
  serviceId: "",
  masterId: "",
  date: todayDate,
  startTime: "",
  endTime: "",
}

export function NewAppointmentDialog({ open, onOpenChange }: Props) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<AppointmentFormData>(emptyForm)
  const { masters, services, appointments, addAppointment } = useAppointments()

  function updateData(partial: Partial<AppointmentFormData>) {
    setData((prev) => ({ ...prev, ...partial }))
  }

  function canProceed(): boolean {
    switch (step) {
      case 0: return data.clientName.trim().length > 0 && data.serviceId.length > 0
      case 1: return data.masterId.length > 0
      case 2: return data.startTime.length > 0
      default: return true
    }
  }

  function handleNext() {
    if (step < STEPS.length - 1) setStep((s) => s + 1)
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1)
  }

  function handleConfirm() {
    addAppointment(data)
    setData(emptyForm)
    setStep(0)
    onOpenChange(false)
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setData(emptyForm)
      setStep(0)
    }
    onOpenChange(open)
  }

  const master = masters.find((m) => m.id === data.masterId)
  const service = services.find((s) => s.id === data.serviceId)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[440px] max-sm:max-w-full max-sm:h-full max-sm:m-0 max-sm:rounded-none">
        <DialogHeader>
          <DialogTitle>Новая запись</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2 pb-4">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  i <= step
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs hidden sm:block ${
                  i === step ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 ${
                    i < step ? "bg-foreground" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <StepClientService data={data} services={services} onChange={updateData} />
        )}
        {step === 1 && (
          <StepMaster masters={masters} data={data} onChange={updateData} />
        )}
        {step === 2 && (
          <StepTime
            data={data}
            appointments={appointments}
            onChange={updateData}
          />
        )}
        {step === 3 && (
          <StepConfirmation
            data={data}
            master={master}
            service={service}
            onConfirm={handleConfirm}
          />
        )}

        <div className="flex items-center justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0}
          >
            Назад
          </Button>
          {step < STEPS.length - 1 && (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Далее
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
