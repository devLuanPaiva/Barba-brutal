'use client'
import { useCallback } from 'react'

export default function useSessionStorage() {
    const get = useCallback((chave: string) => {
        const valorLocal = window?.sessionStorage?.getItem(chave)
        return valorLocal ? JSON.parse(valorLocal) : null
    }, [])

    const set = useCallback((chave: string, valor: any) => {
        window?.sessionStorage?.setItem(chave, JSON.stringify(valor))
    }, [])

    return { get, set }
}
