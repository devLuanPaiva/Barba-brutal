import { ServicesItemProps } from "@barba/core";
import Image from "next/image";

export default function ItemServices(props: Readonly<ServicesItemProps>) {
  return (
    <article className='flex rounded-xl overflow-hidden bg-zinc-800  select-none '>
      <Image
        src={props.item.imageURL}
        width={150}
        height={150}
        alt={props.item.name}
        className="object-cover"
      />
      <div className="flex flex-col p-5 gap-2">
        <h2 className="text-xl font-black">{props.item.name}</h2>
        <p className="text-xs text-zinc-400 flex-1 text-justify">
          {props.item.description}
        </p>
        <span className="text-lg font-bold">
          {props.item.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </article>
  );
}
