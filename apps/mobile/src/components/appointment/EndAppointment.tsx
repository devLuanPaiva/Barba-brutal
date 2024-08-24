import { StyleSheet, Text, View, Image } from "react-native";
import { Appointment } from "@barba/core";
import React from "react";
import useUser from "@/src/data/hooks/useUser";
import ItemAppointment from "./ItemAppointment";
import useLoadSchedule from "@/src/data/hooks/useLoadSchedule";

export default function EndAppointments() {
  const { user } = useUser();
  const { appointments, deleteAppointment } = useLoadSchedule()
  function renderContent() {
    if (appointments && appointments?.length > 0) {
      const upcomingAppointments = appointments
        .filter((a: Appointment) => new Date(a.date).getTime() >= Date.now())
        .slice()
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      if (upcomingAppointments.length > 0) {
        return (
          <View>
            <Text style={styles.caption}>
              Aqui estão seus últimos agendamentos:
            </Text>
            {upcomingAppointments.map((a: Appointment) => (
              <ItemAppointment item={a} key={a.id} delete={deleteAppointment} />
            ))
            }
          </View>
        );
      } else {
        return (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.caption}>Você não tem agendamentos futuros.</Text>
            <Text style={styles.caption}>Vamos agendar um novo serviço?</Text>
            <Image
              source={require("../../../assets/inicio/garoto-propaganda.png")}
              style={styles.coverBoy}
            />
          </View>
        );
      }
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.caption}>Você ainda não tem agendamentos.</Text>
          <Text style={styles.caption}>Vamos agendar um novo serviço?</Text>
          <Image
            source={require("../../../assets/inicio/garoto-propaganda.png")}
            style={styles.coverBoy}
          />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/inicio/logo-brutal.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Fala, {user?.name}!</Text>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 30,
    color: "#e4e4e7",
    fontWeight: "800",
  },
  caption: {
    fontSize: 16,
    textAlign: "center",
    color: "#e4e4e7",
  },
  appointmentItemContainer: {
    backgroundColor: "#09090b",
    borderRadius: 10,
    height: 144,
  },
  appointmentItemContent: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  appointmentItemText: {
    fontSize: 16,
    color: "white",
  },
  appointmentTitle: {
    fontSize: 40,
    color: "white",
  },
  appointmentTime: {
    fontSize: 25,
    color: "white",
  },
  logo: {
    marginTop: 20,
  },
  coverBoy: {
    marginBottom: 20,
    marginTop: 20,
  },
});
