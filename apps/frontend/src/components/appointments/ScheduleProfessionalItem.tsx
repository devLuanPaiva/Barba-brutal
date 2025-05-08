import { AppointmentItemProps, UtilsDate, UtilsSchedule } from "@barba/core";
import { IconCalendar, IconTrash } from "@tabler/icons-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export default function ScheduleProfessionalItem(props: Readonly<AppointmentItemProps>) {
    const { item } = props;
    return (
        <li className="flex item-center gap-6 bg-zinc-800 rounded-md p-7">
            <IconCalendar size={60} stroke={1} />
            <section className="flex-1 flex flex-col">
                <h3 className="text-xl">{item.user.name}</h3>
                <p className="text-zinc-400 text sm">{UtilsDate.formatDateAndTime(new Date(item.date))}</p>
            </section>
            <section className="flex flex-col items-center">
                <p className="text-xl font-black">
                    {UtilsSchedule.durationTotal(item.services)}
                </p>
                <span className="text-zinc-400">
                    {item.services.reduce((acc, service) => acc + service.price, 0).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </span>
            </section>
            <section>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <button className="button bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-base md:text-lg py-2 px-4 hover:from-red-600 hover:to-red-700" >
                            <IconTrash size={24} stroke={1.5} />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Agendamento</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tem certeza que deseja excluir este agendamento?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="button rounded">
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction className="button rounded bg-gradient-to-r from-red-500 to-red-600
                            text-white font-semibold text-base md:text-lg
                            py-2 px-4 hover:from-red-600 hover:to-red-700"
                                onClick={() => props.delete(props.item.id)}>
                                Excluir
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </section>
        </li>
    )
}