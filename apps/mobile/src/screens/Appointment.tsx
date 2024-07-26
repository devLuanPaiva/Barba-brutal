import { Pressable, Text, View } from "react-native";

export default function Appointment({navigation}: any){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Página de Agendamento</Text>
            <Pressable onPress={() => {
                navigation.navigate('Main')
            }}>
                <Text>Ir para Main</Text>
            </Pressable>
        </View>
    )
}