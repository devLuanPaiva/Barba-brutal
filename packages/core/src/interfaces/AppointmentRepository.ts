import Appointment from "./Appointment.interface";

export default interface AppointmentRepository{
    create(appointment: Appointment): Promise<void>
    searchEmail(email: string): Promise<Appointment[]>
    searchProfessionalAndData(professional: number, data: Date): Promise<Appointment[]>
}