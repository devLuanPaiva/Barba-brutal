import { StyleSheet, Text, View } from "react-native";
import Icon from '../components/shared/Icon'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from "./Home";
import Appointment from "./Appointment";
import User from "./User";

const Tab = createBottomTabNavigator()
export default function Main({ navigation }: any) {
    function tab(name: string, component: any, label: string, icon: string) {
        return (
            <Tab.Screen
                name={name}
                component={component}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabScreen}>
                            <Icon
                                nameIcon={icon as any}
                                size={24}
                                color={focused ? '#29A7EA' : '#9DA2AE'}
                            />
                            <Text
                                style={{
                                    ...styles.tabScreenText,
                                    color: focused ? '#29A7EA' : '#9DA2AE',
                                }}
                            >
                                {label}
                            </Text>
                        </View>
                    ),
                }}
            />
        )
    }

    return (
        <Tab.Navigator
            initialRouteName="Inicio"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#222',
                tabBarInactiveBackgroundColor: '#222',
                tabBarStyle: {
                    backgroundColor: '#222',
                },
            }}
        >
            {tab('Home', Home, 'Início', 'home-outline')}
            {tab('Appointment', Appointment, 'Agendamento', 'calendar-outline')}
            {tab('User', User, 'Usuário', 'person-outline')}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabScreen: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    tabScreenText: {
        fontSize: 10,
    },
})
