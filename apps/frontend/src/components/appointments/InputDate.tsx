import InputDateProps from "@/data/interfaces/InputDateProps.interface";
import InputDay from "./InputDay";
import InputTimes from "./InputTimes";

export default function InputDate(props: Readonly<InputDateProps>) {
  const { amountSlots, date, dateChanged } = props;
  return (
    <section className="flex flex-col gap-10">
      <InputDay date={date} changedDate={dateChanged} />
      <InputTimes
        date={date}
        slotsQuantity={amountSlots}
        dateChanged={dateChanged}
      />
    </section>
  );
}
