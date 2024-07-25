'use client'

import InputDate from "@/components/appointments/InputDate"
import ProfessionalInput from "@/components/appointments/InputProfessional"
import ServicesInput from "@/components/appointments/InputServices"
import Summary from "@/components/appointments/Summary"
import Header from "@/components/shared/Header"
import Steps from "@/components/shared/Steps"
import useAppointment from "@/data/hooks/useAppointments"
import { Professional, Service } from "@barba/core"
import { useState } from "react"

export default function PageAppointment(){
    const [allowNextStep, setAllowNextStep] = useState<boolean>(false)
    const {
        professional,
        services,
        date,
        selectProfessional,
        selectServices,
        selectDate,
        numberOfSlots,
    } = useAppointment()
    function professionalChanged(professional: Professional) {
        selectProfessional(professional)
        setAllowNextStep(!!professional)
    }

    function servicesChanged(services: Service[]) {
        selectServices(services)
        setAllowNextStep(services.length > 0)
    }

    function dateChanged(date: Date) {
        selectDate(date)
        const hasDate = date
        const validHour = date.getHours() >= 8 && date.getHours() <= 21
        setAllowNextStep(hasDate && validHour)
    }
    return (
        <div className="flex flex-col bg-zinc-900">
            <Header
                title="Agendamento de Serviços"
                description="Seja atendido exatamente no horário marcado."
            />
            <div
                className="
                    container flex flex-col lg:flex-row 
                    items-center lg:items-start lg:justify-around 
                    gap-10 lg:gap-0 py-10
                "
            >
                <Steps
                    allowsNextStep={allowNextStep}
                    changeNextStep={setAllowNextStep}
                    labels={[
                        'Selecione o profissional',
                        'Informe os serviços',
                        'Escolha o horário',
                    ]}
                >
                    <ProfessionalInput
                        professional={professional}
                        professionalChanged={professionalChanged}
                    />
                    <ServicesInput services={services} changedService={servicesChanged} />
                    <InputDate
                        date={date}
                        dateChanged={dateChanged}
                        amountSlots={numberOfSlots()}
                    />
                </Steps>
                <Summary />
            </div>
        </div>
    )
}