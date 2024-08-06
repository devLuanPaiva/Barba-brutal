import { Professional, Service } from "@barba/core";

export interface BaseItemProps<T> {
  item: T;
}

export interface ProfessionalItemProps extends BaseItemProps<Professional> {}

export interface ServicesItemProps extends BaseItemProps<Service> {
  onClick: (service: Service) => void;
}

export interface CustomersItemProps {
  name: string;
  testimony: string;
}