import Professional from "./Professional.interface"
import Service from "./Service.interface"

export default interface Appointment{
    id: number
    emailCoustumer: string
    date: Date
    professional: Professional
    service: Service[]
}