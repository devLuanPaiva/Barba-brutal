import  ContainerBgProps from '@/data/interfaces/ContainerBgProps.interface'
import Image from 'next/image'

export default function ContainerBackground(props: ContainerBgProps) {
    return (
        <figure className="relative">
            <Image src={props.image} fill alt="Background" className="object-cover -z-30" />
            <section className="bg-black/90 sm:bg-transparent sm:bg-gradient-to-r from-black/80 via-black/95 to-black/80">
                <div className="container py-10">{props.children}</div>
            </section>
        </figure>
    )
}