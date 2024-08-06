import { IconCalendar } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAppointment from "@/data/hooks/useAppointments";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "../ui/alert-dialog";
export default function Summary() {
  const [loading, setLoading] = useState(false);
  const { date, professional, services, totalPrice, totalDuration, schedule } =
    useAppointment();
  const router = useRouter();

  async function finalizeAppointment() {
    try {
      setLoading(true);
      await schedule();
      router.push("/appointment/success");
    } finally {
      setLoading(false);
    }
  }

  function renderService(name: string, i: number) {
    return (
      <p key={i} className="flex items-center bg-zinc-700 rounded-md">
        <span className="flex justify-center items-center text-xs text-zinc-400 px-3 bg-black/25 w-5 py-1.5">
          {i}
        </span>
        <span className="text-sm font-light text-zinc-300 px-2">{name}</span>
      </p>
    );
  }

  function canFinalize() {
    if (!professional) return false;
    if (!services.length) return false;
    return date && date.getHours() >= 8 && date.getHours() <= 21;
  }
  return (
    <aside className="flex flex-col bg-zinc-950 rounded-lg w-96 lg:w-80">
      <header className="flex gap-2 p-4 border-b border-zinc-800">
        <figure className="flex justify-center items-center bg-zinc-800 h-9 w-9 rounded-full">
          <IconCalendar stroke={1} size={20} />
        </figure>
        <div className="flex flex-col ">
          <h2 className="font-bold text-zinc-300 leading-6">
            Sumário do Agendamento
          </h2>
          <p className="text-xs text-zinc-500 leading-3">
            Será um prazer atendê-lo!
          </p>
        </div>
      </header>
      <main className="flex flex-col p-5 gap-6 border-b border-zinc-800">
        <section className="flex flex-col gap-3">
          <h3 className="text-xs uppercase text-zinc-400">Profissional</h3>
          <p className="text-sm text-white">
            {professional ? professional.name : "Não selecionado"}
          </p>
        </section>
        <ul className="flex flex-col gap-3">
          <h3 className="text-xs uppercase text-zinc-400">Serviços</h3>
          <li className="flex gap-2 flex-wrap text-sm text-white list-none">
            {services.length
              ? services.map((service: { name: string }, i: number) =>
                renderService(service.name, i + 1),
              )
              : "Não selecionado"}
          </li>
        </ul>
        <section className="flex flex-col gap-3">
          <h3 className="text-xs uppercase text-zinc-400">Duração</h3>
          <p className="text-sm text-white">{totalDuration()}</p>
        </section>
        <section className="flex flex-col gap-3">
          <h3 className="text-xs uppercase text-zinc-400">Horário</h3>
          <p className="text-sm text-white">
            {date?.toLocaleDateString?.("pt-BR", { dateStyle: "long" })}{" "}
            {date &&
              ` às ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}h`}
          </p>
        </section>
      </main>

      <section className="flex justify-between items-center border-b border-zinc-800 p-5">
        <h3 className="text-xs uppercase text-zinc-400">Valor Total</h3>
        <span className=" text-white font-semibold">
          {totalPrice().toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </section>
      <section className="p-5">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className={`flex justify-center items-center text-sm font-semibold ${canFinalize() ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold text-base md:text-lg py-2 px-4 hover:from-yellow-500 hover:to-yellow-600" : "bg-zinc-600"} text-zinc-900 w-full py-3 rounded`}
              disabled={!canFinalize()}

            >
              {loading && date ? (
                <Loader2 className="animate-spin" size={32} />
              ) : (
                "Finalizar Agendamento"
              )}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Agendamento</AlertDialogTitle>
              <AlertDialogDescription>Tem certeza de que deseja finalizar o agendamento?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="button rounded">Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={finalizeAppointment}
                className="button rounded bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-base md:text-lg
               py-2 px-4 hover:from-green-600 hover:to-green-700">
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </aside>
  );
}
