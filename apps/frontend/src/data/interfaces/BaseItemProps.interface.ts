import { Professional, Service } from "@barba/core";

interface BaseItemProps<T> {
  item: T;
}

interface ProfessionalItemProps extends BaseItemProps<Professional> {}

interface ServicesItemProps extends BaseItemProps<Service> {
  onClick: (service: Service) => void;
}

export type { ProfessionalItemProps, ServicesItemProps };
