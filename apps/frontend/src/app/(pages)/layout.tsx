'use client'
import { UserProvider } from '@/data/contexts/UserContext'

export default function Layout({ children }: any) {
    return <UserProvider>{children}</UserProvider>
    // envolve a aplicação com o contexto, para que cada parte da aplicação tenha os dados do contexto.
}