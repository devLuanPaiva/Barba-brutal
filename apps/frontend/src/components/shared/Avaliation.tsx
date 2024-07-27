import AvaliationProps from '@/data/interfaces/AvaliationProps.interface'
import { IconStar, IconStarFilled, IconStarHalfFilled } from '@tabler/icons-react'

export default function Avaliation(props: AvaliationProps) {
    const { value: avaliation, amount } = props

    const stars = Array.from({ length: 5 }, (_, index) => {
        const valueIndex = index + 1
        if (avaliation >= valueIndex) {
            return <IconStarFilled key={index} size={18} />
        }
        if (avaliation + 1 > valueIndex) {
            return <IconStarHalfFilled key={index} size={18} />
        }
        return <IconStar key={index} size={18} />
    })

    return (
        <div className="flex items-end gap-2">
            <div className="flex items-center gap-1 text-yellow-400">{stars}</div>
            <div className="flex text-xs text-zinc-300">({amount})</div>
        </div>
    )
}