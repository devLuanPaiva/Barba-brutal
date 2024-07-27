import { SLOT_TIME } from "../constants";
import RepositoryAppointment from "./RepositoryAppointment";

export default class GetOccupiedSlots {
  constructor(private readonly repo: RepositoryAppointment) {}

  async execute(professionalId: number, date: Date): Promise<string[]> {
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
