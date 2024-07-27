import useAppointment from '@/src/data/hooks/useAppointments'
import { UtilsSchedule, UtilsDate } from '@barba/core'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'


interface TimesInputProps {
    date: Date
    numTimes: number
    dateChanged(date: Date): void
}

export default function TimesInput(props: TimesInputProps) {
    const [currentHour, setCurrentHour] = useState<string | null>(null)
    const { occupiedSchedules } = useAppointment()
    const { morning, afternoon, evening } = UtilsSchedule.timesOfTheDay()

    const selectedHour = props.date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    })

    function getPeriod(hour: string | null, num: number) {
        if (!hour) return []
        const times = morning.includes(hour) ? morning : afternoon.includes(hour) ? afternoon : evening
        const index = times.findIndex((h) => hour == h)
        return times.slice(index, index + num)
    }

    function renderTime(time: string) {
        const period = getPeriod(currentHour, props.numTimes)
        const hasTime = period.length === props.numTimes

        const selectedPeriod = getPeriod(selectedHour, props.numTimes)

        const selected =
            selectedPeriod.length === props.numTimes && selectedPeriod.includes(time)

        const blockedPeriod = period.some((h) =>
            occupiedSchedules.some((occupied) => occupied === h)
        )

        const unavailableHour = selectedPeriod.includes(time)
        const occupied = occupiedSchedules.includes(time)

        const getButtonProps = () => {
            if (selected && !blockedPeriod && !occupied) {
                return {
                    background: '#22c55e',
                    disabled: false,
                }
            } else if (blockedPeriod && !occupied && unavailableHour) {
                return {
                    background: '#ef4444',
                    disabled: true,
                }
            } else if (!hasTime && !occupied && selectedPeriod.includes(time)) {
                return {
                    background: '#ef4444',
                    disabled: true,
                }
            } else if (occupied) {
                return {
                    background: '#09090b',
                    disabled: true,
                }
            } else {
                return {
                    background: '#18181b',
                    disabled: false,
                }
            }
        }

        return (
            <Pressable
                key={time}
                onPress={() => {
                    setCurrentHour(time)
                    if (getButtonProps().disabled) return
                    props.dateChanged(UtilsDate.applySchedule(props.date, time))
                }}
                style={{
                    ...styles.timeContainer,
                    backgroundColor: getButtonProps().background,
                }}
            >
                {getButtonProps().disabled ? (
                    <View style={styles.timeContent}>
                        <Text style={{ color: '#e4e4e7' }}>X</Text>
                    </View>
                ) : (
                    <View style={styles.timeContent}>
                        <Text style={{ color: '#e4e4e7' }}>{time}</Text>
                    </View>
                )}
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.timesText}>Manhã</Text>
                <View style={styles.timesContent}>{morning.map(renderTime)}</View>
            </View>
            <View>
                <Text style={styles.timesText}>Tarde</Text>
                <View style={styles.timesContent}>{afternoon.map(renderTime)}</View>
            </View>
            <View>
                <Text style={styles.timesText}>Noite</Text>
                <View style={styles.timesContent}>{evening.map(renderTime)}</View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 30,
    },
    timesText: {
        color: '#e4e4e7',
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    timesContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        justifyContent: 'center',
    },
    timeContent: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    timeContainer: {
        borderWidth: 1,
        borderColor: '#27272a',
        padding: 10,
        borderRadius: 6,
        width: 90,
    },
})
