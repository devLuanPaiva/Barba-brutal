import PageProps from "@/data/interfaces/PageProps.interface";
import Footer from "./Footer";

export default function Pagina(props: PageProps) {
    return (
        <div className="flex flex-col min-h-screen w-screen">
            <main>{props.children}</main>
            <Footer />
        </div>
    )
}
