import { AppointmentItemProps } from "@/data/interfaces";
import { UtilsDate, UtilsSchedule } from "@barba/core";
import { IconCalendar, IconPencil, IconTrash } from "@tabler/icons-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export default function ItemAppointment(props: Readonly<AppointmentItemProps>) {
    const addTotalServices = () => {
        return props.item.services.reduce((acc, service) => acc + service.price, 0)
    }
    const renderServices = () => {
        return props.item.services.reduce((acc, service, index) => {
            return `${acc}${index + 1}. ${service.name}${index < props.item.services.length - 1 ? ", " : ""}`
        }, "")
    }
    return (
        <li className="flex item-center gap-6 bg-zinc-800 rounded-md p-7">
            <IconCalendar size={60} stroke={1} />
            <section className="flex-1 flex flex-col">
                <h3 className="text-xl">{props.item.professional.name ? props.item.professional.name : 'Não informado'}</h3>
                <p className="text-zinc-400 text sm">
                    {UtilsDate.formatDateAndTime(new Date(props.item.date))}h
                </p>
                <p className="">{renderServices()}</p>
            </section>
            <section className="flex flex-col items-center">
                <p className="text-xl font-black"> {UtilsSchedule.durationTotal(props.item.services)}</p>
                <span className="text-zinc-400">
                    {addTotalServices().toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </span>
            </section>
            <section className="flex justify-between gap-1">
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
                {/* <AlertDialog>
                    <AlertDialogTrigger>
                        <button className="button bg-gradient-to-r from-zinc-500 to-zinc-600 text-white font-semibold text-base md:text-lg py-2 px-4 hover:from-zinc-600 hover:to-zinc-700" >
                            <IconPencil size={24} stroke={1.5} />
                        </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Editar Agendamento</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tem certeza que deseja editar este agendamento?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="button rounded">Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="button rounded bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-base md:text-lg py-2 px-4 hover:from-blue-600 hover:to-blue-700"
                                onClick={() => props.edit(props.item.id)}>
                                Editar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog> */}
            </section>
        </li>
    )
}