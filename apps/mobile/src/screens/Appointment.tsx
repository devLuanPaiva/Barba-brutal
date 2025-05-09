import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Professional, Service } from "@barba/core";
import useAppointment from "../data/hooks/useAppointments";
import Steps from "../components/appointment/Steps";
import ProfessionalInput from "../components/appointment/ProfessionalInput";
import ServicesInput from "../components/appointment/ServicesInput";
import DateInput from "../components/appointment/DateInput";

export default function Appointment({ navigation }: any) {
  const [allowNextStep, setAllowNextStep] = useState<boolean>(false);
  const {
    professional,
    services,
    date,
    selectProfessional,
    selectServices,
    selectDate,
    numberOfSlots,
  } = useAppointment();

  function professionalChanged(professional: Professional) {
    selectProfessional(professional);
    setAllowNextStep(!!professional);
  }

  function servicesChanged(services: Service[]) {
    selectServices(services);
    setAllowNextStep(services.length > 0);
  }

  function dateChanged(date: Date) {
    selectDate(date);

    const hasDate = date;
    const validHour = date.getHours() >= 8 && date.getHours() <= 21;
    setAllowNextStep(hasDate && validHour);
  }

  return (
    <SafeAreaView style={{ ...styles.areaView }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Agende seu horário</Text>
          <Steps
            labels={["Profissional", "Serviços", "Horário"]}
            allowNextStep={allowNextStep}
            allowNextStepChanged={setAllowNextStep}
            update={false}
            idAppointment={null}
            finalize={() => navigation.navigate("Summary", {
              update: false,
              idAppointment: null
          })}
          >
            <ProfessionalInput
              professionals={professional}
              onChange={professionalChanged}
              changedValue={professionalChanged}
            />
            <ServicesInput
              services={services}
              changedValue={servicesChanged}
              onChange={servicesChanged}
            />
            <DateInput
              date={date}
              changedValue={dateChanged}
              amountSlots={numberOfSlots()}
            />
          </Steps>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaView: {
    display: "flex",
    flex: 1,
    gap: 12,
    width: "100%",
    backgroundColor: "black",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
