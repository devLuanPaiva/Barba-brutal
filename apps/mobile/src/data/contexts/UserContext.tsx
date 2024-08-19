import React, { createContext, useCallback, useMemo } from "react";
import useSection from "../hooks/useSection";
import useAPI from "../hooks/useAPI";
import { UserContextProps } from "../interfaces";
import { User } from "@barba/core";
import Toast from 'react-native-toast-message';


const UserContext = createContext<UserContextProps>({} as any);

export function UserProvider({ children }: any) {
  const { httpPOST } = useAPI();
  const { clearSection, createSection, loading, user } = useSection();

  const register = useCallback(async (user: User) => {
    try {
      await httpPOST('user/register', user);
      Toast.show({
        type: 'success',
        text1: 'Registro bem-sucedido!',
        text2: 'Você se registrou com sucesso.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro no registro',
        text2: 'Algo deu errado durante o registro. Tente novamente.',
      });
    }
  }, [httpPOST]);

  const login = useCallback(async (user: Partial<User>) => {
    const token = await httpPOST('user/login', user);
    createSection(token);
  }, [createSection, httpPOST]);

  const logout = useCallback(() => {
    clearSection();
  }, [clearSection]);

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
