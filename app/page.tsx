"use client"

import { useState, useCallback } from "react"
import { ScheduleView } from "@/components/schedule/schedule-view"
import { NewAppointmentDialog } from "@/components/new-appointment"
import { Button } from "@/components/ui/button"
import { Plus, CheckCircle2 } from "lucide-react"

export default function Home() {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2800)
  }, [])

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 overflow-auto min-h-0 pb-24 sm:pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
          <ScheduleView onNewAppointment={() => setOpen(true)} />
        </div>
      </div>

      {/* FAB — mobile fixed */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-gradient-to-t from-background via-background to-transparent pt-6 pointer-events-none">
        <div className="px-4 pb-4 pointer-events-auto">
          <Button
            onClick={() => setOpen(true)}
            className="h-14 gap-3 text-[17px] shadow-lg shadow-primary/25 w-full font-semibold rounded-2xl"
          >
            <Plus className="h-6 w-6" />
            Новая запись
          </Button>
        </div>
      </div>

      <NewAppointmentDialog
        open={open}
        onOpenChange={setOpen}
        onAppointmentCreated={() => showToast("Запись создана")}
      />

      {toast && (
        <div className="fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-toast-in px-4 w-full max-w-[400px]">
          <div className="flex items-center gap-3 rounded-2xl bg-primary text-primary-foreground px-6 py-4 shadow-2xl text-[15px] font-medium">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            {toast}
          </div>
        </div>
      )}
    </div>
  )
}
