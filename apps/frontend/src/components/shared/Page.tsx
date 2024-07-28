import PageProps from "@/data/interfaces/PageProps.interface";
import Footer from "./Footer";

export default function Page(props: PageProps) {
    return (
        <div className="flex flex-col min-h-screen ">
            <main>{props.children}</main>
            <Footer />
        </div>
        // cria esse componente compartilhado page, para que todas as telas envolvidas com ele, obtenham esse estilo, esse footer e estejam dentro de main.
    )
}
