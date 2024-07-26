import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import EndAppointments from "../components/appointment/EndAppointment";

export default function Home({ navigation }: any) {
    return (
        <ImageBackground
            source={require('../../assets/inicio/fundo.png')}
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.areaView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.view}>
                        <EndAppointments />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    areaView: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
    },
    scrollViewContent: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    view: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
})