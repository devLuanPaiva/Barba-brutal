'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@barba/core'
import useSessionStorage from '../hooks/useSessionStorage'

export interface UserContextProps {
    loading: boolean
    user: User | null
    login: (user: User) => Promise<void>
    logout: () => void
}

const UserContext = createContext<UserContextProps>({} as any)

export function UserProvider({ children }: any) {
    const { get, set } = useSessionStorage()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const loadUser = useCallback(
        function () {
            try {
                const localUser = get('user')
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
        set('user', user)
    }

    function logout() {
        router.push('/')
        setUser(null)
        set('user', null)
    }

    useEffect(() => loadUser(), [loadUser])

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
