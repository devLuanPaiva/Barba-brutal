import { useProfessionals } from "@barba/ui";
import { Professional } from "@barba/core";
import Image from "next/image";
import { ProfessionalInputProps } from "@/data/interfaces";

function Option(props: Readonly<{
  professional: Professional;
  onClick: (p: Professional) => void;
  selected?: boolean;
}>) {
  return (
    <button className={`flex flex-col items-center cursor-pointer select-none rounded-lg border w-[150px] h-[180px] ${props.selected ? "border-green-400" : "border-zinc-700"} overflow-hidden`} onClick={() => props.onClick(props.professional)}>
      <Image
        src={props.professional.imageURL}
        alt={props.professional.name}
        width={150}
        height={150}
      />
      <p className={`py-2 w-full h-full text-center text-xs ${props.selected ? "text-black bg-green-400 font-semibold" : "text-zinc-400 font-light bg-zinc-900 "}`}>
        {props.professional.name.split(" ")[0]}
      </p>
    </button>
  );
}

export default function ProfessionalInput(props: Readonly<ProfessionalInputProps>) {
  const { professional } = useProfessionals();
  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-sm uppercase text-zinc-400">
        Profissionais Disponíveis
      </h2>
      <section className="grid grid-cols-2 md:grid-cols-3 self-start gap-5">
        {professional && Array.isArray(professional) ? (
          professional.map((professional) => (
            <Option
              key={professional.id}
              professional={professional}
              onClick={props.onChange}
              selected={professional.id === props.professional?.id}
            />
          ))
        ) : (
          <p>Não tem serviços disponiveis</p>
        )}
      </section>
    </section>
  );
}
