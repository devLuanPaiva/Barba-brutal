import InputDateProps from "@/data/interfaces/InputDateProps.interface";
import InputDay from "./InputDay";
import InputTimes from "./InputTimes";

export default function InputDate(props: InputDateProps) {
    const { amountSlots, date, dateChanged } = props;
    return (
        <div className="flex flex-col gap-10">
            <InputDay date={date} changedDate={dateChanged} />
            <InputTimes date={date} slotsQuantity={amountSlots} dateChanged={dateChanged} />
        </div>
    )
}