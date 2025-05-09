"use client";
import useUser from "@/data/hooks/useUser";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function UserForce(props: any) {
  const { loading, user } = useUser();
  const path = usePathname();
  const router = useRouter();

  function redirect(url: string) {
    router.push(url);
    return (
      <div className="flex justify-center items-center h-screen">
        Direcionando...
      </div>
    );
  }
  if (!user?.email && loading) return <section className="flex justify-center items-center h-screen relative">
    <Image
      src="/banners/principal.webp"
      fill
      alt="Barbearia"
      className="object-cover"
    />
    <h2 className="text-gradient text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black pb-2">Carregando...</h2>
  </section>;
  if (!user?.email) return redirect(`/access?destiny=${path}`);

  return props.children;
}
