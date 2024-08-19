import { User } from "@barba/core";

export interface BaseContextProps{
    user: User | null;
    loading: boolean;
}
export interface SectionContextProps extends BaseContextProps{
    token: string | null;
    createSection: (jwt: string) => void;
    clearSection: () => void;
}
export interface UserContextProps extends BaseContextProps{
    login: (user: Partial<User>) => Promise<void>;
    register: (user: User) => Promise<void>;
    logout: () => void;
}