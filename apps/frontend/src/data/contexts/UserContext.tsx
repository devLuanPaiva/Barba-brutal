"use client";
import { createContext, useCallback, useMemo } from "react";
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

  const register = useCallback(async (user: User) => {
    await httpPOST('user/register', user);
  }, [httpPOST]);

  const login = useCallback(async (user: Partial<User>) => {
    const token = await httpPOST('user/login', user);
    createSection(token);
  }, [createSection, httpPOST]);

  const logout = useCallback(() => {
    clearSection();
    router.push("/");
  }, [router, clearSection]);

  const contextValue = useMemo(() => {
    return {
      loading,
      user,
      login,
      register,
      logout,
    };
  }, [loading, user, login, register, logout]);
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
