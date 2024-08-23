'use client'
import useUser from "@/data/hooks/useUser";
import { useRouter } from "next/navigation";

export default function Layout(props: any) {
    const { user } = useUser()
    const router = useRouter()
    if (!user) return null

    if (user?.barber) {
        return router.push('/')
    }
    return props.children
}