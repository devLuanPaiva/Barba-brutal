'use client'
import { useServices } from "@barba/ui"
import { useRouter } from "next/navigation"
import Title from "../shared/Title"
import { Service } from "@barba/core"
import ItemServices from "./ItemServies"

export default function OurServices() {
    const router = useRouter()
    const { services } = useServices()

    function startAppointments() {
        router.push('/access')
    }

    return (
        <div className="flex flex-col gap-16">
            <Title
                tag="Serviços"
                primary="Do Classico ao Rock"
                secondary="Cabelo afiado, barba de lenhador e mãos de motoqueiro, tudo ao som de rock pesado!"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {services && Array.isArray(services) ? (
                    services.map((service: Service) => (
                        <ItemServices key={service.id} service={service} onClick={startAppointments} />
                    ))
                ) : (
                    <p>Não tem serviços disponiveis</p>
                )}
            </div>
        </div>
    )
}