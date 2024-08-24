'use client'
import InputDay from "@/components/appointments/InputDay";
import ScheduleProfessionalItem from "@/components/appointments/ScheduleProfessionalItem";
import Header from "@/components/shared/Header";
import useLoadSchedule from "@/data/hooks/useLoadSchedule";
import { IconCalendarCancel } from "@tabler/icons-react";

export default function PageSchedule() {
    const { date, appointments, deleteAppointment, changedDate } = useLoadSchedule()

    return (
        <section className="flex flex-col bg-zinc-900">
            <Header title="Minha Agenda" description="Veja e gerencie seus agendamentos." />
            <section className="container flex flex-col gap-10 py-16">
                <InputDay date={date} changedValue={changedDate} />
                {appointments.length > 0 ? (
                    <ul className="flex flex-col gap-4 ">
                        {appointments.map((appointment) => (
                            <ScheduleProfessionalItem
                                key={appointment.id}
                                item={appointment}
                                delete={deleteAppointment}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center">
                        <IconCalendarCancel size={50} stroke={0.5} className="text text-zinc-400" />
                        <p className="text-xl text-zinc-500 font-extralight w-64 text-center">
                            Nenhum agendamento para esta data.
                        </p>
                    </div>
                )}
            </section>
        </section>
    )
}