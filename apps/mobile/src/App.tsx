import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./data/contexts/UserContext";
import { AppointmentProvider } from "./data/contexts/AppointmentContext";
import Main from "./screens/Main";
import Register from "./screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import Summary from "./screens/Summary";
import { SectionProvider } from "./data/contexts/SectionContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
                component={Summary}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </AppointmentProvider>
        </UserProvider>
      </SectionProvider>
    </NavigationContainer>
  );
}
