'use client'
import { User } from "@barba/core";
import { createContext, useCallback, useEffect, useState } from "react";
import cookie from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface SectionContextProps {
    loading: boolean;
    token: string | null;
    user: User | null;
    createSection: (jwt: string) => void
    clearSection: () => void
}
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

    function createSection(jwt: string) {
        cookie.set(cookieName, jwt, {
            expires: 1,
            sameSite: 'None',
            secure: true,
        })
        loadSection()
    }
    function clearSection() {
        cookie.remove(cookieName)
        setToken(null)
        setUser(null)
    }
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
    return (
        <SectionContext.Provider
            value={{
                loading,
                token,
                user,
                createSection,
                clearSection
            }}>
            {props.children}
        </SectionContext.Provider>
    )
}
export default SectionContext