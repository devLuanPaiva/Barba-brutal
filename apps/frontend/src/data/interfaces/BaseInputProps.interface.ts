import { Professional, Service } from "@barba/core";

export interface BaseProps<T> {
  changedValue: (value: T) => void;
}

export interface BaseInputProps<T> extends BaseProps<T> {
  date: Date;
}

export interface DayInputProps extends BaseInputProps<Date> {}

export interface DateInputProps extends BaseInputProps<Date> {
  amountSlots: number;
}

export interface TimesInputProps extends BaseInputProps<Date> {
  slotsQuantity: number;
}

export interface ServicesInputProps extends BaseProps<Service[]> {
  services: Service[];
  onChange: (services: Service[]) => void;
}

export interface ProfessionalInputProps extends BaseProps<Professional> {
  professional: Professional | null;
  onChange: (professional: Professional) => void;
}