import { Pressable, StyleSheet, Text, View } from "react-native";
import useAppointment from "../data/hooks/useAppointments";
import { UtilsDate } from "@barba/core";

export default function Summary({ navigation }: any) {
    const { date, professional, services, totalPrice, totalDuration, schedule } = useAppointment()
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titulo}>Resumo do Agendamento</Text>
                <Text style={styles.subtitulo}>Será um prazer atendê-lo!</Text>

                <Text style={styles.label}>PROFISSIONAL</Text>
                <Text style={styles.valor}>{professional?.name}</Text>

                <Text style={styles.label}>SERVIÇOS</Text>
                {services.map((s, index) => (
                    <Text key={index} style={styles.servico}>
                        {index + 1}. {s.name}
                    </Text>
                ))}

                <Text style={styles.label}>DURAÇÃO</Text>
                <Text style={styles.valor}>{totalDuration()}</Text>

                <Text style={styles.label}>HORÁRIO</Text>
                <Text style={styles.valor}>{date && UtilsDate.formatDate(date)}</Text>

                <Text style={styles.valorTotalLabel}>VALOR TOTAL</Text>
                <Text style={styles.valorTotal}>{totalPrice().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Text>

                <Pressable
                    style={styles.botao}
                    onPress={async () => {
                        await schedule()
                        navigation.navigate('Home')
                    }}
                >
                    <Text style={styles.textoBotao}>Finalizar Agendamento</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        gap: 5,
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    titulo: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitulo: {
        color: '#FFFFFF',
        fontSize: 14,
        marginBottom: 20,
    },
    label: {
        color: '#AAAAAA',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    valor: {
        color: '#FFFFFF',
        fontSize: 16,
        alignSelf: 'flex-start',
    },
    servico: {
        color: '#FFFFFF',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    valorTotalLabel: {
        color: '#AAAAAA',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginTop: 20,
    },
    valorTotal: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    botao: {
        backgroundColor: '#22c55e',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 30,
    },
    textoBotao: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
