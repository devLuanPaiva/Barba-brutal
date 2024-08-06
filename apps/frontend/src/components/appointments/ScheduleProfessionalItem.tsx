import { Appointment, UtilsDate, UtilsSchedule } from "@barba/core";
import { IconCalendar, IconTrash } from "@tabler/icons-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export interface ScheduleProfessionalItemProps {
    appointment: Appointment
    delete: (id: number) => void
}
export default function ScheduleProfessionalItem(props: Readonly<ScheduleProfessionalItemProps>) {
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
            <AlertDialog>
                <AlertDialogTrigger>
                    <button className="button bg-gradient-to-r from-red-500 to-red-600
                            text-white font-semibold text-base md:text-lg
                            py-2 px-4 hover:from-red-600 hover:to-red-700" >
                        <IconTrash size={24} stroke={1.5} />
                    </button>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Agendamento</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tem certeza que deseja excluir este agendamento?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="button rounded" onClick={() => { }}>Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="button rounded bg-gradient-to-r from-red-500 to-red-600
                            text-white font-semibold text-base md:text-lg
                            py-2 px-4 hover:from-red-600 hover:to-red-700" onClick={() => props.delete(appointment.id)}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>

                </AlertDialogTrigger>

            </AlertDialog>
        </div>
    )
}