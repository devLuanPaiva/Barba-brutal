'use client'
import InputDay from "@/components/appointments/InputDay";
import ItemAppointment from "@/components/appointments/ItemAppointment";
import Header from "@/components/shared/Header";
import useLoadSchedule from "@/data/hooks/useLoadSchedule";
import { IconCalendarCancel } from "@tabler/icons-react";

export default function PageMyAppointments(){
    const {appointments, changedDate, date, deleteAppointment} = useLoadSchedule()
    return(
        <section className="flex flex-col bg-zinc-900">
            <Header title="Minha Agenda" description="Visualize seus agendamentos" />
            <section className="container flex flex-col gap-10 py-16">
                <InputDay date={date} changedValue={changedDate}/>
                {appointments.length > 0 ? (
                    <ul className="flex flex-col gap-4">
                        {appointments.map((appoint) => (
                           <ItemAppointment key={appoint.id} item={appoint} delete={deleteAppointment}/>
                        ))}
                    </ul>
                ): (
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