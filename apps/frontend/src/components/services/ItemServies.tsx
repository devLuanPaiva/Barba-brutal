import ItemServicesProps from "@/data/interfaces/ItemServicesProps.interfaces";
import Image from "next/image";

export default function ItemServices(props: Readonly<ItemServicesProps>) {
  return (
    <article className='flex rounded-xl overflow-hidden bg-zinc-800  select-none '>
      <Image
        src={props.service.imageURL}
        width={150}
        height={150}
        alt={props.service.name}
        className="object-cover"
      />
      <div className="flex flex-col p-5 gap-2">
        <h2 className="text-xl font-black">{props.service.name}</h2>
        <p className="text-xs text-zinc-400 flex-1 text-justify">
          {props.service.description}
        </p>
        <span className="text-lg font-bold">
          {props.service.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </article>
  );
}
