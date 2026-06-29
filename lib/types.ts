export interface Master {
  id: string
  name: string
}

export interface Service {
  id: string
  name: string
  duration: number
  price: number
}

export interface Appointment {
  id: string
  clientName: string
  masterId: string
  serviceId: string
  date: string
  startTime: string
  endTime: string
}

export interface AppointmentFormData {
  clientName: string
  serviceId: string
  masterId: string
  date: string
  startTime: string
  endTime: string
}
