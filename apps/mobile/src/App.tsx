import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserProvider } from './data/contexts/UserContext'
import { AppointmentProvider } from './data/contexts/AppointmentContext'
import Main from './screens/Main'
import Register from './screens/Register'
import { NavigationContainer } from '@react-navigation/native'
import Summary from './screens/Summary'

const Stack = createNativeStackNavigator()
export default function App() {
    return (
        <UserProvider>
            <AppointmentProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
                        <Stack.Screen name="Summary" component={Summary} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AppointmentProvider>
        </UserProvider>
    )
}