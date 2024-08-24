import Appointment from "./Appointment.interface";

export default interface RepositoryAppointment {
  create(appointment: Appointment): Promise<void>;
  searchEmail(email: string, date: Date): Promise<Appointment[]>;
  searchProfessionalAndDate(
    professional: number,
    date: Date
  ): Promise<Appointment[]>;
  delete(id: number): Promise<void>;
  update(id: number, appointment: Partial<Appointment>): Promise<void>;
  view(id: number): Promise<Appointment>;
}
