import { Professional, Service, User } from "@barba/core";

export interface BaseContextProps {
  user: User | null;
  loading: boolean;
}

export interface SectionContextProps extends BaseContextProps {
  token: string | null;
  createSection: (jwt: string) => void;
  clearSection: () => void;
}

export interface UserContextProps extends BaseContextProps {
  login: (user: Partial<User>) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
}

export interface AppointmentContextProps {
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
  updateSchedule(id: number | string | undefined): Promise<void>;
}
