import { AvaliationProps } from "@/data/interfaces";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";

export default function Avaliation(props: Readonly<AvaliationProps>) {
  const { value: avaliation, amount } = props;

  const stars = Array.from({ length: 5 }, (_, index) => {
    const valueIndex = index + 1;
    if (avaliation >= valueIndex) {
      return <IconStarFilled key={index} size={18} />;
    }
    if (avaliation + 1 > valueIndex) {
      return <IconStarHalfFilled key={index} size={18} />;
    }
    return <IconStar key={index} size={18} />;
  });

  return (
    <section className="flex items-end gap-2">
      <section className="flex items-center gap-1 text-yellow-400">{stars}</section>
      <p className="flex text-xs text-zinc-300">({amount})</p>
    </section>
  );
}
