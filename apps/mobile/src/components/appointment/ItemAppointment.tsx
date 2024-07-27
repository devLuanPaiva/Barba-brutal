import { Appointment } from '@barba/core'
import { StyleSheet, Text, View } from 'react-native'

interface AgendamentoItemProps {
    appointment: Appointment
}

export default function ItemAppointment(props: AgendamentoItemProps) {
    const cor = new Date(props.appointment.date).getTime() > Date.now() ? '#007aff' : '#AAAAAA'

    function formatDate(date: Date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return ''
        }

        return date.toLocaleDateString('pt-BR', {
            dateStyle: 'long',
        })
    }

    function formatTime(date: Date) {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return ''
        }
        return ` às ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}h`
    }

    function addTotalServices() {
        return props.appointment.services.reduce((acc, service) => acc + service.price, 0)
    }

    function renderServices() {
        return props.appointment.services.reduce((acc, service, index) => {
            return `${acc}${index + 1}. ${service.name}${index < props.appointment.services.length - 1 ? ', ' : ''}`
        }, '')
    }

    return (
        <View style={{ ...styles.card, borderColor: cor }}>
            <Text style={{ ...styles.nameProfessional }}>
                {props.appointment.professional.name
                    ? props.appointment.professional.name
                    : 'Não informado'}
            </Text>
            <Text style={{ ...styles.date, color: cor }}>
                {props.appointment.date && formatDate(new Date(props.appointment.date))}
                {props.appointment.date && formatTime(new Date(props.appointment.date))}
            </Text>
            <Text style={styles.services}>{renderServices()}</Text>
            <Text style={styles.price}>{addTotalServices().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a1a',
        padding: 16,
        paddingLeft: 35,
        borderRadius: 8,
        margin: 8,
        borderWidth: 0.5,
        borderRightWidth: 10,
        minWidth: '90%',
    },
    nameProfessional: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 4,
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    services: {
        fontSize: 12,
        color: '#ffffff',
        marginBottom: 8,
    },
    price: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
})
