'use client'
import { User } from "@barba/core";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { SectionContextProps } from "../interfaces/BaseContextProps.interface";

const SectionContext = createContext<SectionContextProps>({} as any)

export function SectionProvider(props: any) {
    const cookieName = 'barber-authorization'
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    const loadSection = useCallback(function () {
        try {
            setLoading(true)
            const state = getState()
            setToken(state?.token ?? null)
            setUser(state?.user ?? null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadSection()
    }, [loadSection])

    const createSection = useCallback((jwt: string) => {
        cookie.set(cookieName, jwt, {
            expires: 1,
            sameSite: 'None',
            secure: true,
        })
        loadSection()
    }, [loadSection])
    const clearSection = useCallback(() => {
        cookie.remove(cookieName)
        setToken(null)
        setUser(null)
    }, [])
    function getState(): { token: string, user: User } | null {
        const jwt = cookie.get(cookieName)
        if (!jwt) return null

        try {
            const decoded: any = jwtDecode(jwt)
            const expired = decoded.exp < Date.now() / 1000
            if (expired) {
                cookie.remove(cookieName)
                return null
            }
            return {
                token: jwt,
                user: {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    barber: decoded.barber
                }
            }
        } catch (err) {
            cookie.remove(cookieName)
            return null
        }

    }
    const contextValue = useMemo(() => ({
        loading,
        token,
        user,
        createSection,
        clearSection
    }), [loading, token, user, createSection, clearSection])
    return (
        <SectionContext.Provider value={contextValue}>
            {props.children}
        </SectionContext.Provider>
    )
}
export default SectionContext