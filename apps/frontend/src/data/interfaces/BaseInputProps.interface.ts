import { Professional, Service } from "@barba/core";

interface BaseProps<T> {
  changedValue: (value: T) => void;
}

interface BaseInputProps<T> extends BaseProps<T> {
  date: Date;
}

interface DayInputProps extends BaseInputProps<Date> {}

interface DateInputProps extends BaseInputProps<Date> {
  amountSlots: number;
}

interface TimesInputProps extends BaseInputProps<Date> {
  slotsQuantity: number;
}

interface ServicesInputProps extends BaseProps<Service[]> {
  services: Service[];
  onChange: (services: Service[]) => void;
}

interface ProfessionalInputProps extends BaseProps<Professional> {
  professional: Professional | null;
  onChange: (professional: Professional) => void;
}

export type {
  DayInputProps,
  DateInputProps,
  TimesInputProps,
  ServicesInputProps,
  ProfessionalInputProps,
};
