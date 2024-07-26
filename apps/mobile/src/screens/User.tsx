import { Pressable, Text, View } from "react-native";

export default function User({navigation}: any){
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Página de usuário</Text>
            <Pressable onPress={() => {
                navigation.navigate('Main')
            }}>
                <Text>Ir para Main</Text>
            </Pressable>
        </View>
    )
}