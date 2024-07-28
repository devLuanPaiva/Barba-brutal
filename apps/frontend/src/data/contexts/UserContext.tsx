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
    // interface direcionada para informar se o usuário está carregando, se tem usuário ou não, e possibilita entrar e sair da aplicação.
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
                    // se tiver usuário no session storage, ele adiciona no contexto.
                }
            } finally {
                setLoading(false)
            }
        },
        [get]
        // carrega o usuário
    )

    async function login(user: User) {
        setUser(user)
        set('user', user)
        // coloca o usuário no contexto da aplicação
    }

    function logout() {
        router.push('/')
        setUser(null)
        set('user', null)
        // remove o usuário no contexto da aplicação e o direciona para a landing page.

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
