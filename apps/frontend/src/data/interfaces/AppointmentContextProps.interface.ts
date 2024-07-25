import { Professional, Service } from "@barba/core";

export default interface AppointmentContextProps {
  professional: Professional | null;
  services: Service[];
  date: Date;
  occupiedSchedules: string[];
  totalDuration(): string;
  totalPrice(): number;
  numberOfSlots(): number;
  selectProfessional(professional: Professional): void;
  selectServices(services: Service[]): void;
  selectDate(date: Date): void;
  schedule(): Promise<void>;
}
