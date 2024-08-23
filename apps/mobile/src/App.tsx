import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./data/contexts/UserContext";
import { AppointmentProvider } from "./data/contexts/AppointmentContext";
import Main from "./screens/Main";
import Register from "./screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import Summary from "./screens/Summary";
import { SectionProvider } from "./data/contexts/SectionContext";
import Toast from "react-native-toast-message";
import EditAppointment from "./screens/EditAppointment";
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <SectionProvider>

          <UserProvider>
            <AppointmentProvider>
              <Stack.Navigator>
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Main"
                  component={Main}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Summary"
                  component={Summary as React.ComponentType<any>}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditAppointment"
                  component={EditAppointment as React.ComponentType<any>}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </AppointmentProvider>
          </UserProvider>
        </SectionProvider>
      </NavigationContainer>
      <Toast />

    </>
  );
}
