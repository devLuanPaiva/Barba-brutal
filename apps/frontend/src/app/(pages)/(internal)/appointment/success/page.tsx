'use client'
import SuccessAppontment from "@/components/appointments/SuccessAppointment";
import Header from "@/components/shared/Header";

export default function PageAppointment(){
    return (
        <div className="flex flex-col bg-zinc-900">
            <Header
                title="Agendamento de Serviços"
                description="Seu horário está garantido e será um prazer te atender!"
            />
            <div className="container flex flex-col justify-around items-center py-10 gap-1">
                <SuccessAppontment />
            </div>
        </div>
    )
}