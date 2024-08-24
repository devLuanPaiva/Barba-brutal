import { useServices } from "@barba/ui";
import { Service, ServicesInputProps } from "@barba/core";
import Image from "next/image";

function Option(props: Readonly<{
  service: Service;
  onClick: (s: Service) => void;
  selected?: boolean;
}>) {
  return (
    <button className={`flex flex-col items-center cursor-pointer select-none border rounded-lg overflow-hidden ${props.selected ? "border-green-400" : "border-zinc-700"}`}
      onClick={() => props.onClick(props.service)}>
      <Image
        src={props.service.imageURL}
        alt={props.service.name}
        width={150}
        height={120}
      />
      <p className={`py-2 w-full h-full text-center text-xs ${props.selected ? "text-black bg-green-400 font-semibold" : "text-zinc-400 font-light bg-zinc-900 "}`}>
        {props.service.name}
      </p>
    </button>
  );
}

export default function ServicesInput(props: Readonly<ServicesInputProps>) {
  const { changedValue } = props;
  const { services: allServices } = useServices();

  function toggleServiceSelection(service: Service) {
    const selectedService = props.services.find((s) => s.id === service.id);
    changedValue(
      selectedService
        ? props.services.filter((s) => s.id !== service.id)
        : [...props.services, service],
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-sm uppercase text-zinc-400">
        Serviços Disponíveis
      </h2>
      <section className="grid grid-cols-3 self-start gap-5">
        {allServices.map((service) => (
          <Option
            key={service.id}
            service={service}
            onClick={toggleServiceSelection}
            selected={props.services.some((serv) => serv.id === service.id)}
          />
        ))}
      </section>
    </section>
  );
}
