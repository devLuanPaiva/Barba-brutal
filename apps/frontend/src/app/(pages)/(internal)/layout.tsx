import Page from "@/components/shared/Page";
import UserForce from "@/components/shared/UserForce";
import { AppointmentProvider } from "@/data/contexts/AppointmentContext";

export default function Layout(props: any) {
    return (
        <UserForce>
            <AppointmentProvider>
                <Page> {props.children} </Page>
            </AppointmentProvider>
        </UserForce>
    )
}