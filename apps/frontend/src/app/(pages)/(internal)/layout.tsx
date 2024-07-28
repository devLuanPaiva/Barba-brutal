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
        // O fato da aplicação estar aclopada no UserForce, significa dizer que só poderá ser acessado se tiver usuário logado. Tendo em vista que a partir daqui são páginas internas.
    )
}