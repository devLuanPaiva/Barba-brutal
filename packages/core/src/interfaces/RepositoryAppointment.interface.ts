import Appointment from "./Appointment.interface";

export default interface RepositoryAppointment {
  create(appointment: Appointment): Promise<void>;
  searchEmail(email: string): Promise<Appointment[]>;
  searchProfessionalAndDate(
    professional: number,
    date: Date,
  ): Promise<Appointment[]>;
}
