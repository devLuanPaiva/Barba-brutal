import { Pressable, StyleSheet, Text, View } from "react-native";
import useAppointment from "../data/hooks/useAppointments";
import { UtilsDate } from "@barba/core";
import { StackParamList } from "../data/types";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";

type SummaryProps = StackScreenProps<StackParamList, 'Summary'>

export default function Summary({ route, navigation }: Readonly<SummaryProps>) {
  const { update, idAppointment } = route.params;
  const { date, professional, services, totalPrice, totalDuration, schedule, updateSchedule } = useAppointment();

  async function finalizeAppointment() {
    try {
      if (!update) {
        await schedule();
      } else (
        await updateSchedule(idAppointment)
      )
      navigation.navigate("Home" as any);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Resumo do Agendamento</Text>
        <Text style={styles.subtitulo}>Será um prazer atendê-lo!</Text>

        <Text style={styles.label}>PROFISSIONAL</Text>
        <Text style={styles.valor}>{professional?.name}</Text>

        <Text style={styles.label}>SERVIÇOS</Text>
        {services.map((s, index) => (
          <Text key={s.id} style={styles.servico}>
            {index + 1}. {s.name}
          </Text>
        ))}

        <Text style={styles.label}>DURAÇÃO</Text>
        <Text style={styles.valor}>{totalDuration()}</Text>

        <Text style={styles.label}>HORÁRIO</Text>
        <Text style={styles.valor}>{date && UtilsDate.formatDate(date)}</Text>

        <Text style={styles.valorTotalLabel}>VALOR TOTAL</Text>
        <Text style={styles.valorTotal}>
          {totalPrice().toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>

        <Pressable
          style={styles.botao}
          onPress={finalizeAppointment}
        >
          <Text style={styles.textoBotao}>Finalizar Agendamento</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    gap: 5,
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitulo: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    color: "#AAAAAA",
    fontSize: 12,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  valor: {
    color: "#FFFFFF",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  servico: {
    color: "#FFFFFF",
    fontSize: 16,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  valorTotalLabel: {
    color: "#AAAAAA",
    fontSize: 12,
    alignSelf: "flex-start",
    marginTop: 20,
  },
  valorTotal: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  botao: {
    backgroundColor: "#22c55e",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 30,
  },
  textoBotao: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
