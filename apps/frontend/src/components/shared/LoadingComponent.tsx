import Image from "next/image";
import Img from '../../../public/banners/principal.webp'

export default function LoadingComponent(){
    return(
        <section className="flex justify-center items-center h-screen relative">
            <Image
                src={Img}
                fill
                alt="Barbearia"
                className="object-cover"
            />
            <div className="absolute text-center">
                <h2 className="text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black pb-2 z-20">
                    Carregando...
                </h2>
            </div>
        </section>
    )
}
