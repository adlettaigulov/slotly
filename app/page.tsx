"use client"

import { useState } from "react"
import { ScheduleView } from "@/components/schedule/schedule-view"
import { NewAppointmentDialog } from "@/components/new-appointment"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col h-dvh">
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <ScheduleView onNewAppointment={() => setOpen(true)} />
        </div>
      </div>

      <div className="flex p-4 sm:p-6 sm:pt-0 sm:hidden">
        <Button
          onClick={() => setOpen(true)}
          className="h-12 px-6 gap-2 text-base shadow-sm w-full font-semibold"
        >
          <Plus className="h-5 w-5" />
          Новая запись
        </Button>
      </div>

      <NewAppointmentDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
