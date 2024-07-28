import Appointment from "./Appointment.interface";

export default interface RepositoryAppointment{
    create(appointment: Appointment): Promise<void>
    searchEmail(email: string): Promise<Appointment[]>
    searchProfessionalAndData(professional: number, data: Date): Promise<Appointment[]>

    // Essa interface garante que a aplicação vai ter esses metodos. Só que eles vão ser implementados no backend. Isso é uma necessidade de negócio e cabe ao backend deicidir se vai buscar esses dados em um banco de dados ou não. O core apenas precisa desses metodos.
}