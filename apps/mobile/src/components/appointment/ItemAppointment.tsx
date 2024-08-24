import { AppointmentItemProps, UtilsDate } from "@barba/core";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';


type RootStackParamList = {
  EditAppointment: { id: string | number }
}

type EditAppointmenScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditAppointment'>

export default function ItemAppointment(props: Readonly<AppointmentItemProps>) {
  const navigation = useNavigation<EditAppointmenScreenNavigationProp>();
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

  function confirmEdit() {
    Alert.alert(
      "Confirmar Edição",
      "Tem certeza que deseja editar este agendamento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Editar",
          onPress: () => navigation.navigate("EditAppointment", { id: props.item.id }),
        },
      ]
    );
  }

  return (
    <View style={{ ...styles.card, borderColor: cor }}>
      <Text style={{ ...styles.nameProfessional }}>
        {props.item.professional.name
          ? props.item.professional.name
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
        <Button title="Editar" onPress={confirmEdit} />
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
  nameProfessional: {
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
