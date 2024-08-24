import { AppointmentItemProps, UtilsDate } from "@barba/core";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

export default function ScheduleProfessionalItem(props: Readonly<AppointmentItemProps>) {
  const cor =
    new Date(props.item.date).getTime() > Date.now()
      ? "#007aff"
      : "#AAAAAA";

  function addTotalServices() {
    return props.item.services.reduce(
      (acc, service) => acc + service.price,
      0,
    );
  }

  function renderServices() {
    return props.item.services.reduce((acc, service, index) => {
      return `${acc}${index + 1}. ${service.name}${index < props.item.services.length - 1 ? ", " : ""
        }`;
    }, "");
  }

  function confirmDelete() {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este agendamento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => props.delete(props.item.id),
        },
      ]
    );
  }

  return (
    <View style={{ ...styles.card, borderColor: cor }}>
      <Text style={{ ...styles.nameCustumer }}>
        {props.item.user.name
          ? props.item.user.name
          : "Não informado"}
      </Text>
      <Text style={{ ...styles.date, color: cor }}>
        {UtilsDate.formatDateAndTime(new Date(props.item.date))}
      </Text>
      <Text style={styles.services}>{renderServices()}</Text>
      <Text style={styles.price}>
        {addTotalServices().toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Excluir" onPress={confirmDelete} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    paddingLeft: 35,
    borderRadius: 8,
    margin: 8,
    borderWidth: 0.5,
    borderRightWidth: 10,
    minWidth: "90%",
  },
  nameCustumer: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 4,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  services: {
    fontSize: 12,
    color: "#ffffff",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: 10,
    marginTop: 10,
  },
});
