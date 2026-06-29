import { Master, Service, Appointment } from "./types"

export const masters: Master[] = [
  { id: "alina", name: "Алина" },
  { id: "maria", name: "Мария" },
  { id: "aizhan", name: "Айжан" },
]

export const masterColors: Record<string, string> = {
  alina: "bg-blue-100 text-blue-700 border-blue-200",
  maria: "bg-amber-100 text-amber-700 border-amber-200",
  aizhan: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

export const masterColorAccents: Record<string, string> = {
  alina: "bg-blue-500",
  maria: "bg-amber-500",
  aizhan: "bg-emerald-500",
}

export const masterAccentHex: Record<string, string> = {
  alina: "#3b82f6",
  maria: "#f59e0b",
  aizhan: "#10b981",
}

export const services: Service[] = [
  { id: "manicure", name: "Маникюр", duration: 60, price: 2500 },
  { id: "pedicure", name: "Педикюр", duration: 60, price: 3000 },
  { id: "coating", name: "Покрытие гель-лаком", duration: 60, price: 2000 },
  { id: "design", name: "Дизайн ногтей", duration: 60, price: 3500 },
  { id: "complex", name: "Маникюр + педикюр", duration: 120, price: 5000 },
]

function getTodayDate(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export const todayDate = getTodayDate()

export const initialAppointments: Appointment[] = [
  {
    id: "appt-1",
    clientName: "Анна",
    masterId: "alina",
    serviceId: "manicure",
    date: todayDate,
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "appt-2",
    clientName: "Ольга",
    masterId: "maria",
    serviceId: "coating",
    date: todayDate,
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "appt-3",
    clientName: "Лаура",
    masterId: "aizhan",
    serviceId: "manicure",
    date: todayDate,
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "appt-4",
    clientName: "Светлана",
    masterId: "alina",
    serviceId: "design",
    date: todayDate,
    startTime: "11:00",
    endTime: "12:00",
  },
  {
    id: "appt-5",
    clientName: "Марина",
    masterId: "aizhan",
    serviceId: "pedicure",
    date: todayDate,
    startTime: "11:00",
    endTime: "12:00",
  },
  {
    id: "appt-6",
    clientName: "Диана",
    masterId: "maria",
    serviceId: "design",
    date: todayDate,
    startTime: "12:00",
    endTime: "13:00",
  },
  {
    id: "appt-7",
    clientName: "Елена",
    masterId: "aizhan",
    serviceId: "complex",
    date: todayDate,
    startTime: "13:00",
    endTime: "15:00",
  },
  {
    id: "appt-8",
    clientName: "Инна",
    masterId: "alina",
    serviceId: "coating",
    date: todayDate,
    startTime: "14:00",
    endTime: "15:00",
  },
  {
    id: "appt-9",
    clientName: "Татьяна",
    masterId: "maria",
    serviceId: "manicure",
    date: todayDate,
    startTime: "16:00",
    endTime: "17:00",
  },
  {
    id: "appt-10",
    clientName: "Виктория",
    masterId: "alina",
    serviceId: "pedicure",
    date: todayDate,
    startTime: "17:00",
    endTime: "18:00",
  },
]
