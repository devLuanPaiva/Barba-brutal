import { IconCalendar } from '@tabler/icons-react'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAppointment from '@/data/hooks/useAppointments'
export default function Summary() {
    const [loading, setLoading] = useState(false)
    const { date, professional, services, totalPrice, totalDuration, schedule } = useAppointment()
    const router = useRouter()

    async function finalizeAppointment() {
        try {
            setLoading(true)
            await schedule()
            router.push('/appointment/success')
        } finally {
            setLoading(false)
        }
    }

    function renderService(name: string, i: number) {
        return (
            <div key={i} className="flex items-center bg-zinc-700 rounded-md">
                <span className="flex justify-center items-center text-xs text-zinc-400 px-3 bg-black/25 w-5 py-1.5">
                    {i}
                </span>
                <span className="text-sm font-light text-zinc-300 px-2">{name}</span>
            </div>
        )
    }

    function canFinalize() {
        if (!professional) return false
        if (!services.length) return false
        return date && date.getHours() >= 8 && date.getHours() <= 21
    }
    return (
        <div className="flex flex-col bg-zinc-950 rounded-lg w-96 lg:w-80">
            <div className="flex gap-2 p-4 border-b border-zinc-800">
                <div className="flex justify-center items-center bg-zinc-800 h-9 w-9 rounded-full">
                    <IconCalendar stroke={1} size={20} />
                </div>
                <div className="flex flex-col ">
                    <span className="font-bold text-zinc-300 leading-6">
                        Sumário do Agendamento
                    </span>
                    <span className="text-xs text-zinc-500 leading-3">
                        Será um prazer atendê-lo!
                    </span>
                </div>
            </div>
            <div className="flex flex-col p-5 gap-6 border-b border-zinc-800">
                <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase text-zinc-400">Profissional</span>
                    <span className="text-sm text-white">
                        {professional ? professional.name : 'Não selecionado'}
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase text-zinc-400">Serviços</span>
                    <span className="flex gap-2 flex-wrap text-sm text-white">
                        {services.length
                            ? services.map((service: { name: string }, i: number) => renderService(service.name, i + 1))
                            : 'Não selecionado'}
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase text-zinc-400">Duração</span>
                    <span className="text-sm text-white">{totalDuration()}</span>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-xs uppercase text-zinc-400">Horário</span>
                    <span className="text-sm text-white">
                        {date &&
                            date?.toLocaleDateString?.('pt-BR', {
                                dateStyle: 'long',
                            })}{' '}
                        {date &&
                            ` às ${String(date?.getHours()).padStart(2, '0')}:${String(date?.getMinutes()).padStart(2, '0')}h`}
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center border-b border-zinc-800 p-5">
                <span className="text-xs uppercase text-zinc-400">Valor Total</span>
                <span className=" text-white font-semibold">
                    {totalPrice().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}

                </span>
            </div>
            <div className="p-5">
                <button
                    className={`flex justify-center items-center text-sm font-semibold ${canFinalize() ? 'bg-yellow-400' : 'bg-zinc-600'} text-zinc-900 w-full py-3 rounded-lg`}
                    disabled={!canFinalize()}
                    onClick={finalizeAppointment}
                >
                    {loading && date ? (
                        <Loader2 className="animate-spin" size={32} />
                    ) : (
                        'Finalizar Agendamento'
                    )}
                </button>
            </div>
        </div>
    )
}