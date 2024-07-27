'use client'
import { useCallback } from 'react'

export default function useSessionStorage() {
    const get = useCallback((key: string) => {
        const localValue = window?.sessionStorage?.getItem(key)
        return localValue ? JSON.parse(localValue) : null
    }, [])

    const set = useCallback((key: string, value: any) => {
        window?.sessionStorage?.setItem(key, JSON.stringify(value))
    }, [])

    return { get, set }
}
