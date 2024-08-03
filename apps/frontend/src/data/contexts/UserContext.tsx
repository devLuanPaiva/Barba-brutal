"use client";
import { createContext } from "react";
import { useRouter } from "next/navigation";
import { User } from "@barba/core";
import useSection from "../hooks/useSection";
import useAPI from "../hooks/useAPI";

export interface UserContextProps {
  loading: boolean;
  user: User | null;
  login: (user: Partial<User>) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps>({} as any);

export function UserProvider({ children }: any) {
  const { httpPOST } = useAPI()
  const { clearSection, createSection, loading, user } = useSection()
  const router = useRouter();

  async function login(user: Partial<User>) {
    const token = await httpPOST('user/login', user)
    createSection(token)
  }
  async function register(user: User) {
    await httpPOST('user/register', user)
  }

  function logout() {
    clearSection()
    router.push("/");
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
