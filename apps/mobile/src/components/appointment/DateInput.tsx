import { View } from "react-native";
import TimesInput from "./TimesInput";
import DayInput from "./DayInput";
import { DateInputProps } from "@barba/core";
export default function DateInput(props: Readonly<DateInputProps>) {
  const { date, amountSlots, changedValue } = props;

  return (
    <View>
      <DayInput date={date} changedValue={changedValue} />
      <TimesInput
        date={date}
        slotsQuantity={amountSlots}
        changedValue={changedValue}
      />
    </View>
  );
}
