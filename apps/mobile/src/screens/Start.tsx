import { Pressable, Text, View } from "react-native";

export default function Start({navigation}: any){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Página inicial</Text>
            <Pressable onPress={() => {
                navigation.navigate('Main')
            }}>
                <Text>Ir para Main</Text>
            </Pressable>
        </View>
    )
}