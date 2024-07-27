import { View } from 'react-native'
import TimesInput from './TimesInput'
import DayInput from './DayInput'

export interface DateInputProps {
    date: Date
    numberOfSlots: number
    dateChanged: (date: Date) => void
}

export default function DateInput(props: DateInputProps) {
    const { date, numberOfSlots, dateChanged } = props

    return (
        <View>
            <DayInput date={date} dateChanged={dateChanged} />
            <TimesInput date={date} numTimes={numberOfSlots} dateChanged={dateChanged} />
        </View>
    )
}
