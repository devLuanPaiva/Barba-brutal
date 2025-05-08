import { ReactNode, useContext, useEffect } from "react";
import SectionContext from "./SectionContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
type RootStackParamList = {
    Register: undefined;
};
interface ChildrenProps {
    children: ReactNode;

}
export default function RequireAuth({ children }: Readonly<ChildrenProps>) {
    const { user, loading } = useContext(SectionContext)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        if (!loading && !user) {
            navigation.navigate("Register");
        }
    }, [loading, navigation, user])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return <>{children}</>
}