import { UtilsDate } from '@barba/core'
import { StyleSheet, Text, Pressable, View } from 'react-native'

export interface DayInputProps {
    date: Date
    dateChanged(date: Date): void
}

export default function DayInput(props: DayInputProps) {
    function renderDay(date: Date) {
        if (date.getDay() === 0) {
            date.setDate(date.getDate() + 1)
        }

        const selected = date.getDate() === props.date.getDate()
        return (
            <View
                key={date.getTime()}
                style={{ ...styles.card, backgroundColor: selected ? '#fbbf24' : '#18181b' }}
            >
                <Pressable onPress={() => props.dateChanged(date)}>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text
                                style={{
                                    ...styles.monthNumber,
                                    color: selected ? 'black' : '#e4e4e7',
                                }}
                            >
                                {date.getDate()}
                            </Text>
                            <Text
                                style={{
                                    ...styles.monthText,
                                    color: selected ? 'black' : '#e4e4e7',
                                }}
                            >
                                {date.toLocaleDateString('pt-BR', { month: 'short' }).slice(0, 3)}
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: selected ? 'black' : '#e4e4e7',
                                textTransform: 'uppercase',
                            }}
                        >
                            {date.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3)}
                        </Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={{ marginTop: 30, alignItems: 'center' }}>
            <Text style={{ color: '#e4e4e7', fontSize: 18, fontWeight: 'bold' }}>
                Available Days
            </Text>
            <View style={styles.dayContainer}>
                {Array.from({ length: 7 })
                    .map((_, i) => new Date(UtilsDate.today().getTime() + 86400000 * i))
                    .filter((date) => date.getDay() !== 0)
                    .map((date) => renderDay(date))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dayContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 16,
        flexWrap: 'wrap',
        borderRadius: 10,
        overflow: 'hidden',
    },
    monthNumber: { fontSize: 20, fontWeight: '800', color: '#e4e4e7' },
    monthText: {
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#e4e4e7',
    },
    card: {
        flex: 1,
        paddingVertical: 10,
    },
})
