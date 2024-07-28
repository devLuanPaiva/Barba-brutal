import { SLOT_TIME } from "../constants";
import RepositoryAppointment from "./RepositoryAppointment";

// Esse código trata-se de um caso de uso para mostrar os horários ocupados para o funcionário em uma data especifica.
export default class GetOccupiedSlots {
  constructor(private readonly repo: RepositoryAppointment) {}

  async execute(professionalId: number, date: Date): Promise<string[]> {
    // recebe o profissional e a data como parametro
    const appointments = await this.repo.searchProfessionalAndData(
      professionalId,
      date
    );
    const data = appointments
      .map((appointment) => {
        return {
          date: appointment.date,
          slots: appointment.services.reduce(
            (total, service) => total + service.amountSlots,
            0
          ),
          // vai buscar os agendamentos do profissional na data, a partir desses agendamentos, ele soma a quantidade de slots (15 minutos pra cada) e retorna
        };
      })
      .reduce((occupiedSlots: Date[], data: any) => {
        const time = data.date;
        const slots = data.slots;
        const times = Array.from({ length: slots }, (_, i) =>
          this.addMinutes(time, i * SLOT_TIME)
        );
        return [...occupiedSlots, ...times];
      }, [])
      .map((d) => d.toTimeString().slice(0, 5));

    return data; // [ '10:00', '10:15', '10:30', '10:45', '14:15' ]
  }

  private addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
}
