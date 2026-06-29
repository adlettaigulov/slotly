"use client"

import type { Master, AppointmentFormData } from "@/lib/types"
import { masterColorAccents } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface Props {
  masters: Master[]
  data: AppointmentFormData
  onChange: (data: Partial<AppointmentFormData>) => void
}

export function StepMaster({ masters, data, onChange }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-[15px] sm:text-sm text-muted-foreground max-sm:text-center">
        Выберите мастера для записи
      </p>
      <div className="grid gap-3.5 sm:gap-3">
        {masters.map((master) => {
          const selected = data.masterId === master.id
          return (
            <button
              key={master.id}
              type="button"
              onClick={() => onChange({ masterId: master.id })}
              className={cn(
                "relative flex items-center gap-4 sm:gap-3 rounded-xl sm:rounded-lg border-2 p-4 sm:p-3.5 text-left transition-all",
                "hover:border-foreground/20 hover:bg-muted/50",
                selected
                  ? "border-foreground bg-muted"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-lg sm:text-sm font-medium text-white",
                  masterColorAccents[master.id]
                )}
              >
                {master.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[17px] sm:text-sm">{master.name}</p>
                <p className="text-[13px] sm:text-xs text-muted-foreground">
                  {selected ? "Выбран" : "Нажмите, чтобы выбрать"}
                </p>
              </div>
              {selected && (
                <div className="flex h-6 w-6 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-foreground">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-background"
                  >
                    <path
                      d="M2.5 6L5 8.5L9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
