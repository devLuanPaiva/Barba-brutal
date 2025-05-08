import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import { SectionContextProps } from "../interfaces";
import { User } from "@barba/core";

const SectionContext = createContext<SectionContextProps>({} as any);

export function SectionProvider(props: any) {
  const storageKey = 'barber-authorization';
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const loadSection = useCallback(async () => {
    try {
      setLoading(true);
      const state = await getState();
      setToken(state?.token ?? null);
      setUser(state?.user ?? null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSection();
  }, [loadSection]);

  const createSection = useCallback(async (jwt: string) => {
    await AsyncStorage.setItem(storageKey, jwt);
    await loadSection();
  }, [loadSection]);
  
  const clearSection = useCallback(async () => {
    await AsyncStorage.removeItem(storageKey);
    setToken(null);
    setUser(null);
  }, []);

  async function getState(): Promise<{ token: string, user: User } | null> {
    const jwt = await AsyncStorage.getItem(storageKey);
    if (!jwt) return null;
  
    try {
      const decoded: any = jwtDecode(jwt);
      const expired = decoded.exp < Date.now() / 1000;
      if (expired) {
        await AsyncStorage.removeItem(storageKey);
        return null;
      }
      return {
        token: jwt,
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          barber: decoded.barber,
        }
      };
    } catch (err) {
      console.error("Erro ao decodificar o token:", err);
      await AsyncStorage.removeItem(storageKey);
      return null;
    }
  }
  

  const contextValue = useMemo(() => ({
    loading,
    token,
    user,
    createSection,
    clearSection,
  }), [loading, token, user, createSection, clearSection]);

  return (
    <SectionContext.Provider value={contextValue}>
      {props.children}
    </SectionContext.Provider>
  );
}

export default SectionContext;
