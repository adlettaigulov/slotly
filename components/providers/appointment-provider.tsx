"use client"

import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react"
import { masters as defaultMasters, services as defaultServices, initialAppointments } from "@/lib/mock-data"
import type { Master, Service, Appointment, AppointmentFormData } from "@/lib/types"

interface State {
  masters: Master[]
  services: Service[]
  appointments: Appointment[]
}

type Action =
  | { type: "ADD_APPOINTMENT"; payload: Appointment }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_APPOINTMENT":
      return { ...state, appointments: [...state.appointments, action.payload] }
    default:
      return state
  }
}

interface ContextValue extends State {
  addAppointment: (data: AppointmentFormData) => string
}

const AppointmentContext = createContext<ContextValue | null>(null)

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    masters: defaultMasters,
    services: defaultServices,
    appointments: initialAppointments,
  })

  const addAppointment = useCallback((data: AppointmentFormData) => {
    const id = `appt-${Date.now()}`
    const appointment: Appointment = { ...data, id }
    dispatch({ type: "ADD_APPOINTMENT", payload: appointment })
    return id
  }, [])

  return (
    <AppointmentContext.Provider value={{ ...state, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const ctx = useContext(AppointmentContext)
  if (!ctx) throw new Error("useAppointments must be used within AppointmentProvider")
  return ctx
}
