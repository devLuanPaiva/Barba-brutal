'use client'
import useAppointment from "@/data/hooks/useAppointments";
import useFetchAppointment from "@/data/hooks/useFetchAppointment"
import { Professional, Service } from "@barba/core";
import { useEffect, useState } from "react";
import Header from "../shared/Header";
import Steps from "../shared/Steps";
import ProfessionalInput from "./InputProfessional";
import ServicesInput from "./InputServices";
import InputDate from "./InputDate";
import Summary from "./Summary";

export default function UpdateAppointment() {
    const { appointment } = useFetchAppointment()
    const [allowNextStep, setAllowNextStep] = useState<boolean>(false)
    const { date, numberOfSlots, professional, selectDate, selectProfessional, selectServices, services } = useAppointment()

    useEffect(() => {
        if (appointment) {
            selectDate(new Date(appointment.date));
            selectProfessional(appointment.professional);
            selectServices(appointment.services);
        }
    }, [appointment, selectDate, selectProfessional, selectServices])
    function professionalChanged(professional: Professional) {
        selectProfessional(professional);
        setAllowNextStep(!!professional);
    }

    function servicesChanged(services: Service[]) {
        selectServices(services);
        setAllowNextStep(services.length > 0);
    }

    function dateChanged(date: Date) {
        selectDate(date);
        const hasDate = date;
        const validHour = date.getHours() >= 8 && date.getHours() <= 21;
        setAllowNextStep(hasDate && validHour);
    }

    return (
        <section className="flex flex-col bg-zinc-900">
          <Header
            title="Atualizar Agendamento"
            description="Edite seu agendamento existente."
          />
          <section className="container flex flex-col lg:flex-row items-center lg:items-start lg:justify-around gap-10 lg:gap-0 py-10">
            <Steps
              allowsNextStep={allowNextStep}
              changeNextStep={setAllowNextStep}
              labels={[
                "Selecione o profissional",
                "Informe os serviços",
                "Escolha o horário",
              ]}
            >
              <ProfessionalInput
                professional={professional}
                changedValue={professionalChanged}
                onChange={professionalChanged}
              />
              <ServicesInput
                services={services}
                changedValue={servicesChanged}
                onChange={servicesChanged}
              />
              <InputDate
                date={date}
                changedValue={dateChanged}
                amountSlots={numberOfSlots()}
              />
            </Steps>
            <Summary update={true} idAppointment={appointment?.id}/>
          </section>
        </section>
      );
}