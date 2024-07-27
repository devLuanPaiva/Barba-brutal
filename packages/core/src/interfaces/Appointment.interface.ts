import Professional from "./Professional.interface"
import Service from "./Service.interface"

export default interface Appointment{
    id: number
    emailCustomer: string
    date: Date
    professional: Professional
    services: Service[]
}