import Professional from "./Professional.interface"
import Service from "./Service.interface"

export default interface Appointment{
    id: number
    emailCoustumer: string
    data: Date
    professional: Professional
    service: Service[]
}