import { Appointment, UtilsDate, UtilsSchedule } from "@barba/core";
import { IconCalendar, IconTrash } from "@tabler/icons-react";

export interface ScheduleProfessionalItemProps {
    appointment: Appointment
    delete: (id: number) => void
}
export default function ScheduleProfessionalItem(props: ScheduleProfessionalItemProps) {
    const { appointment } = props;
    return (
        <div className="flex item-center gap-6 bg-zinc-800 rounded-md p-7">
            <IconCalendar size={60} stroke={1} />
            <div className="flex-1 flex flex-col">
                <span className="text-xl">{appointment.user.name}</span>
                <span className="text-zinc-400 text sm">{UtilsDate.formatDateAndTime(new Date(appointment.date))}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xl font-black">
                    {UtilsSchedule.durationTotal(appointment.services)}
                </span>
                <span className="text-zinc-400">
                    {appointment.services.reduce((acc, service) => acc + service.price, 0).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </span>
            </div>
            <div>
                <button className="button bg-red-500" onClick={() => props.delete(appointment.id)}>
                    <IconTrash size={24} stroke={1.5} />
                </button>
            </div>
        </div>
    )
}