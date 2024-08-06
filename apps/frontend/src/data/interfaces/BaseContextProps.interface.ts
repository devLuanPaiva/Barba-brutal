import { Professional, Service, User } from "@barba/core";

interface BaseContextProps {
  user: User | null;
  loading: boolean;
}

interface SectionContextProps extends BaseContextProps{
  token: string | null;
  createSection: (jwt: string) => void
  clearSection: () => void
}

interface UserContextProps extends BaseContextProps {
  login: (user: Partial<User>) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
}

interface AppointmentContextProps {
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

export type{
  BaseContextProps,
  SectionContextProps,
  UserContextProps,
  AppointmentContextProps
}