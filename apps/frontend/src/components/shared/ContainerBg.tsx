import { ContainerBgProps } from "@/data/interfaces";
import Image from "next/image";

export default function ContainerBackground(props: Readonly<ContainerBgProps>) {
  return (
    <section className="relative">
      <Image
        src={props.image}
        fill
        alt="Background"
        className="object-cover -z-30"
      />
      <section className="bg-black/90 sm:bg-transparent sm:bg-gradient-to-r from-black/80 via-black/95 to-black/80">
        {props.children}
      </section>
    </section>
  );
}
