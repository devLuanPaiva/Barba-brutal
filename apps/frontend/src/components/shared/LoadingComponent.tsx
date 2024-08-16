import Image from "next/image";

export default function LoadingComponent(){
    return(
        <section className="flex justify-center items-center h-screen relative">
        <Image
          src="/banners/principal.webp"
          fill
          alt="Barbearia"
          className="object-cover"
        />
        <h2 className="text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black pb-2">Carregando...</h2>
      </section>
    )
}