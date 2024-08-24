import Appointment from "./Appointment.interface";
import Professional from "./Professional.interface";
import Service from "./Service.interface";

export interface BaseItemProps<T> {
  item: T;
}

export interface ProfessionalItemProps extends BaseItemProps<Professional> {}

export interface AppointmentItemProps extends BaseItemProps<Appointment> {
  delete: (id: number) => void;
}

export interface ServicesItemProps extends BaseItemProps<Service> {
  onClick: (service: Service) => void;
}

export interface CustomersItemProps {
  name: string;
  testimony: string;
}
