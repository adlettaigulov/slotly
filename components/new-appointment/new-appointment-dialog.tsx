"use client"

import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
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
  onAppointmentCreated?: () => void
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

export function NewAppointmentDialog({ open, onOpenChange, onAppointmentCreated }: Props) {
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
    onAppointmentCreated?.()
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
      <DialogContent className="sm:max-w-[560px] sm:gap-0 max-sm:max-w-full max-sm:h-dvh max-sm:m-0 max-sm:rounded-none max-sm:border-0 max-sm:p-6 max-sm:top-0 max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:flex max-sm:flex-col max-sm:overflow-hidden">
        <div className="flex items-start justify-between">
          <DialogHeader className="pb-3 sm:pb-4">
            <DialogTitle className="text-xl sm:text-lg">Новая запись</DialogTitle>
          </DialogHeader>
          <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-1 sm:mt-0">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>

        <div className="flex items-center max-sm:justify-center gap-4 sm:gap-2 pb-5 sm:pb-4">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1 max-sm:flex-none">
              <div
                className={`flex h-8 w-8 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full text-sm sm:text-xs font-bold transition-all ${
                  i <= step
                    ? "bg-[hsl(350_65%_57%)] text-white shadow-sm"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-sm sm:text-xs hidden sm:block font-medium ${
                  i === step ? "text-[hsl(350_65%_57%)]" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 max-sm:hidden ${
                    i < step ? "bg-[hsl(350_65%_57%)]" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="max-sm:flex-1 max-sm:overflow-y-auto">
          <div className="animate-slide-up" key={step}>
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
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 sm:pt-4 gap-3">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0}
            className="h-12 sm:h-9 text-[15px] sm:text-sm flex-1 sm:flex-none"
          >
            Назад
          </Button>
          {step < STEPS.length - 1 && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="h-12 sm:h-9 text-[15px] sm:text-sm flex-1 sm:flex-none"
            >
              Далее
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
