import Professional from "./Professional.interface";
import Service from "./Service.interface";
import User from "./User.interface";

export default interface Appointment {
  id: number;
  user: User;
  date: Date;
  professional: Professional;
  services: Service[];
}
