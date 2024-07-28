'use client'
import { useCallback } from 'react'

export default function useSessionStorage() {
    const get = useCallback((key: string) => {
        const localValue = window?.sessionStorage?.getItem(key)
        return localValue ? JSON.parse(localValue) : null

        // Retorna o valor presente no sessionStorage, com a chave passada por parametro em um objeto para o contexto.
    }, [])

    const set = useCallback((key: string, value: any) => {
        window?.sessionStorage?.setItem(key, JSON.stringify(value))
        // Adiciona o valor junto com a chave passada por parametro no sessionStorage.
    }, [])

    return { get, set }
}
