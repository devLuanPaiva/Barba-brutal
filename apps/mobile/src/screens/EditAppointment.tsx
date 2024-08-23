import { RouteProp, useNavigation } from "@react-navigation/native"
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import useFetchAppointment from "../data/hooks/useFetchAppointment"
import { useEffect, useState } from "react"
import useAppointment from "../data/hooks/useAppointments"
import { Professional, Service } from "@barba/core"
import Steps from "../components/appointment/Steps"
import ProfessionalInput from "../components/appointment/ProfessionalInput"
import ServicesInput from "../components/appointment/ServicesInput"
import DateInput from "../components/appointment/DateInput"
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    EditAppointment: { id: number | string };
    Summary: { update: boolean; idAppointment: number | string };
}
type EditAppointmentNavigationProp = StackNavigationProp<RootStackParamList, 'EditAppointment'>;
type EditAppointmenRouteProp = RouteProp<RootStackParamList, 'EditAppointment'>

export default function EditAppointment({ route }: Readonly<{ route: { params: { id: string | number } } }>) {
    const navigation = useNavigation<EditAppointmentNavigationProp>()
    const { id } = route.params
    const { appointment } = useFetchAppointment(id)
    const [allowNextStep, setAllowNextStep] = useState<boolean>(false)
    const { date, numberOfSlots, professional, selectDate, selectProfessional, selectServices, services } = useAppointment()

    useEffect(() => {
        if (appointment) {
            selectDate(new Date(appointment.date));
            selectProfessional(appointment.professional);
            selectServices(appointment.services);
        }
    }, [appointment, selectDate, selectProfessional, selectServices])

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
                    <Text style={styles.title}>Edite seu Agendamento</Text>
                    <Steps
                        labels={["Profissional", "Serviços", "Horário"]}
                        allowNextStep={allowNextStep}
                        allowNextStepChanged={setAllowNextStep}
                        idAppointment={id}
                        update={true}
                        finalize={() => navigation.navigate("Summary", {
                            update: true,
                            idAppointment: id
                        })}
                    >
                        <ProfessionalInput
                            professionals={professional}
                            professionalChanged={professionalChanged}
                        />
                        <ServicesInput
                            services={services}
                            servicesChanged={servicesChanged}
                        />
                        <DateInput
                            date={date}
                            dateChanged={dateChanged}
                            numberOfSlots={numberOfSlots()}
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
