import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserProvider } from './data/contexts/UserContext'
import { AppointmentProvider } from './data/contexts/AppointmentContext'

const Stack = createNativeStackNavigator()
export default function App() {
    return (
        <UserProvider>
            <AppointmentProvider>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Hello, Barba-Brutal!</Text>
                </View>
            </AppointmentProvider>
        </UserProvider>
    )
}