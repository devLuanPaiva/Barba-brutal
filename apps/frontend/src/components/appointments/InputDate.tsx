import { DateInputProps } from "@/data/interfaces/BaseInputProps.interface";
import InputDay from "./InputDay";
import InputTimes from "./InputTimes";

export default function InputDate(props: Readonly<DateInputProps>) {
  const { amountSlots, date, changedValue } = props;
  return (
    <section className="flex flex-col gap-10">
      <InputDay date={date} changedValue={changedValue} />
      <InputTimes
        date={date}
        slotsQuantity={amountSlots}
        changedValue={changedValue}
      />
    </section>
  );
}
