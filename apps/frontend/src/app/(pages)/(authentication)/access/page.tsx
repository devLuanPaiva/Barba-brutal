import UserForm from "@/components/user/UserForm";
import Image from "next/image";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={
      <section className="flex justify-center items-center h-screen relative">
        <Image
          src="/banners/principal.webp"
          fill
          alt="Barbearia"
          className="object-cover"
        />
        <h2 className="text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black pb-2">Carregando...</h2>
      </section>
    }>
      <UserForm />
    </Suspense>
  );
}
