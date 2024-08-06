import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import { UtilsDate, UtilsSchedule } from "@barba/core";
import useAppointment from "@/data/hooks/useAppointments";
import { TimesInputProps } from "@/data/interfaces/BaseInputProps.interface";

export default function InputTimes(props: Readonly<TimesInputProps>) {
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  const { occupiedSchedules } = useAppointment();
  const { morning, afternoon, evening } = UtilsSchedule.timesOfTheDay();

  const selectedTime = props.date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function getTimePeriod(time: string | null, quantity: number) {
    if (!time) return [];
    let times = [];
    if (morning.includes(time)) {
      times = morning;
    } else if (afternoon.includes(time)) {
      times = afternoon;
    } else {
      times = evening;
    }
    const index = times.findIndex((t) => time == t);
    return times.slice(index, index + quantity);
  }

  function renderTime(time: string) {
    const period = getTimePeriod(hoveredTime, props.slotsQuantity);
    const hasSlots = period.length === props.slotsQuantity;
    const highlightTime = hasSlots && period.includes(time);
    const selectedPeriod = getTimePeriod(selectedTime, props.slotsQuantity);
    const selected =
      selectedPeriod.length === props.slotsQuantity &&
      selectedPeriod.includes(time);
    const notSelectable = !hasSlots && period.includes(time);
    const blockedPeriod =
      period.includes(time) &&
      period.some((t) => occupiedSchedules.includes(t));
    const occupied = occupiedSchedules.includes(time);

    return (
      <button
        key={time}
        className={cn(
          "flex justify-center items-center cursor-pointer h-8 border border-zinc-800 rounded select-none",
          {
            "bg-yellow-400": highlightTime,
            "bg-red-500": notSelectable || blockedPeriod,
            "text-white bg-green-500": selected,
            "cursor-not-allowed bg-zinc-800": occupied,
          },
        )}
        onMouseEnter={(_) => setHoveredTime(time)}
        onMouseLeave={(_) => setHoveredTime(null)}
        onClick={() => {
          if (notSelectable) return;
          if (occupied || blockedPeriod) return;
          props.changedValue(UtilsDate.applySchedule(props.date, time));
        }}
      >
        <span className={cn("text-sm text-zinc-400", {
          "text-black font-semibold": highlightTime,
          "text-white font-semibold": selected,
          "text-zinc-400 font-semibold": occupied,
        })}
        >
          {notSelectable || blockedPeriod || occupied ? (
            <IconX size={18} className="text-white" />
          ) : (
            time
          )}
        </span>
      </button>
    );
  }
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-sm uppercase text-zinc-400">
        Horários Disponíveis
      </h2>
      <section className="flex flex-col gap-3 select-none">
        <h3 className="text-xs uppercase text-zinc-400">Manhã</h3>
        <article className="grid grid-cols-8 gap-1">{morning.map(renderTime)}</article>

        <h3 className="text-xs uppercase text-zinc-400">Tarde</h3>
        <article className="grid grid-cols-8 gap-1">{afternoon.map(renderTime)}</article>

        <h3 className="text-xs uppercase text-zinc-400">Noite</h3>
        <article className="grid grid-cols-8 gap-1">{evening.map(renderTime)}</article>
      </section>
    </section>
  );
}
