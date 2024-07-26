import { StyleSheet, Text, View, Image } from 'react-native'
import { Appointment } from '@barba/core'
import useAPI from '../../data/hooks/useAPI'
import React, { useEffect, useState } from 'react'
import useUser from '@/src/data/hooks/useUser'
import ItemAppointment from './ItemAppointment'

export default function EndAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>()
    const { httpGET } = useAPI()
    const { user } = useUser()

    useEffect(() => {
        LoadingAppointments()
    }, [user])

    async function LoadingAppointments() {
        if (!user?.email) return
        const appointments = await httpGET(`appointment/${user?.email}`)
        setAppointments(appointments)
    }

    function renderContent() {
        if (appointments && appointments?.length > 0) {
            return (
                <View>
                    <Text style={styles.caption}>Aqui estão seus últimos agendamentos:</Text>
                    {appointments
                        ?.toReversed()
                        .map((a: Appointment) => <ItemAppointment appointment={a} key={a.id} />)}
                </View>
            )
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.caption}>Você ainda não tem agendamentos.</Text>
                    <Text style={styles.caption}>Vamos agendar um novo serviço?</Text>
                    <Image
                        source={require('../../../assets/inicio/garoto-propaganda.png')}
                        style={styles.coverBoy}
                    />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/inicio/logo-brutal.png')} style={styles.logo} />
            <Text style={styles.title}>Fala, {user?.name}!</Text>
            {renderContent()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    title: {
        fontSize: 30,
        color: '#e4e4e7',
        fontWeight: '800',
    },
    caption: {
        fontSize: 16,
        textAlign: 'center',
        color: '#e4e4e7',
    },
    appointmentItemContainer: {
        backgroundColor: '#09090b',
        borderRadius: 10,
        height: 144,
    },
    appointmentItemContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
    },
    appointmentItemText: {
        fontSize: 16,
        color: 'white',
    },
    appointmentTitle: {
        fontSize: 40,
        color: 'white',
    },
    appointmentTime: {
        fontSize: 25,
        color: 'white',
    },
    logo: {
        marginTop: 20,
    },
    coverBoy: {
        marginBottom: 20,
        marginTop: 20,
    },
})
