import Image from "next/image";
import Avaliation from "../shared/Avaliation";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ProfessionalItemProps } from "@/data/interfaces";

export default function ItemProfessionals(props: Readonly<ProfessionalItemProps>) {
  return (
    <article className="flex flex-col items-center p-1 bg-zinc-800 rounded-lg">
      <figure className="relative h-72 w-full">
        <Image
          src={props.item.imageURL}
          fill
          alt={props.item.name}
          className="object-cover object-top rounded-t-lg"
        />
      </figure>
      <section className="flex flex-col p-4 gap-5">
        <h2 className="text-2xl font-black">{props.item.name}</h2>
        <p className="text-sm text-zinc-400">
          {props.item.description}
        </p>

        <div className="flex gap-3 flex-wrap">
          <Avaliation
            value={props.item.avaliation}
            amount={props.item.amountAvaliation}
          />
        </div>

        <div className="flex gap-3 text-zinc-300">
          <IconBrandYoutube stroke={1} />
          <IconBrandInstagram stroke={1} />
          <IconBrandX stroke={1} />
          <IconBrandLinkedin stroke={1} />
        </div>
      </section>
    </article>
  );
}
