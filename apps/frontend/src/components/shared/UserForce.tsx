'use client'
import useUser from "@/data/hooks/useUser";
import { usePathname, useRouter } from "next/navigation";

export default function UserForce(props: any) {
    const { loading, user } = useUser()
    const path = usePathname()
    const router = useRouter()

    function redirect(url: string) {
        router.push(url);
        return <div className="flex justify-center items-center h-screen">Direcionando...</div>
    }
    if (!user?.email && loading) return <div>Carregando...</div>
    if (!user?.email) return redirect(`/access?desiny=${path}`)

    return props.children;
}