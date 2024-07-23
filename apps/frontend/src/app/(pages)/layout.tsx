'use client'
import { UserProvider } from '@/data/contexts/UseContext'

export default function Layout({ children }: any) {
    return <UserProvider>{children}</UserProvider>
}