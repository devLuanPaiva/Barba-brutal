'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { User } from '@barba/core'
import useSessionStorage from '../hooks/useAsyncStorage'

export interface UserContextProps {
    loading: boolean
    user: User | null
    login: (user: User) => Promise<void>
    logout: () => void
}

const UserContext = createContext<UserContextProps>({} as any)

export function UserProvider({ children }: any) {
    const { get, set } = useSessionStorage()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const loadUser = useCallback(
        async function () {
            try {
                const localUser = await get('user')
                if (localUser) {
                    setUser(localUser)
                }
            } finally {
                setLoading(false)
            }
        },
        [get]
    )

    async function login(user: User) {
        setUser(user)
        await set('user', user)
    }

    function logout() {
        setUser(null)
        set('user', null)
    }

    useEffect(() => { loadUser() }, [loadUser])

    return (
        <UserContext.Provider
            value={{
                loading,
                user,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
