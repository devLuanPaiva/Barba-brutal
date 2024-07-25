import DayInputProps from "@/data/interfaces/DayInputProps.interface";
import { UtilsDate } from "@barba/core";

export default function InputDay(props: DayInputProps) {
    function renderDay(date: Date) {
        if (date.getDay() === 0) {
            date.setDate(date.getDate() + 1)
        }
        const selected = date.getDate() === props.date.getDate()
        return (
            <div
                key={date.toISOString()}
                onClick={() => props.changedDate(date)}
                className={`
                    flex-1 flex flex-col items-center gap-2 py-4 cursor-pointer
                    ${selected ? 'bg-yellow-400 text-black' : 'text-zinc-400'}
                `}
            >
                <div className="flex items-center gap-1">
                    <span className="text-2xl font-black">{date.getDate()}</span>
                    <span className="text-xs font-light uppercase">
                        {date.toLocaleDateString('pt-BR', { month: 'short' }).slice(0, 3)}
                    </span>
                </div>
                <div
                    className={`
                        text-center text-xs font-light uppercase 
                        ${selected ? 'bg-black/10' : 'bg-white/10'}
                        py-0.5 px-3 rounded-full
                    `}
                >
                    {date.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3)}
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-5">
            <span className="text-sm uppercase text-zinc-400">Dias Disponíveis</span>
            <div className="flex gap-5 bg-zinc-950 rounded-lg overflow-hidden">
                {Array.from({ length: 7 })
                    .map((_, i) => new Date(UtilsDate.today().getTime() + 86400000 * i))
                    .filter((date) => date.getDay() !== 0)
                    .map((date) => renderDay(date))}
            </div>
        </div>
    )
}