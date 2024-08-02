'use client'
import InputDay from "@/components/appointments/InputDay";
import ScheduleProfessionalItem from "@/components/appointments/ScheduleProfessionalItem";
import Header from "@/components/shared/Header";
import useProfessionalSchedule from "@/data/hooks/useProfessionalSchedule";
import { IconCalendarCancel } from "@tabler/icons-react";

export default function PageSchedule() {
    const { date, appointments, deleteAppointment, changeDate } = useProfessionalSchedule()

    return (
        <div className="flex flex-col bg-zinc-900">
            <Header title="Minha Agenda" description="Veja e gerencie seus agendamentos." />
            <div className="container flex flex-col gap-10 py-16">
                <InputDay date={date} changedDate={changeDate} />
                {appointments.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {appointments.map((appointment) => (
                            <ScheduleProfessionalItem
                                key={appointment.id}
                                appointment={appointment}
                                delete={deleteAppointment}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <IconCalendarCancel size={50} stroke={0.5} className="text text-zinc-400" />
                        <span className="text-xl text-zinc-500 font-extralight w-64 text-center">
                            Nenhum agendamento para esta data.
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}