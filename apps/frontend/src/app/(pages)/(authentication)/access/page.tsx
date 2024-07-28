import UserForm from "@/components/user/UserForm";
import { Suspense } from "react";

export default function Page(){
    return(
        <Suspense fallback={<div>Carregando...</div>}>
            <UserForm/>
        </Suspense>
        // Esse suspense serve para mostrar fallback enquanto as informações de UserForm não estão prontas para serem mostradas. Quando estiverem prontas, o UserForm é exibido. Isso é obrigatório no caso do UserForm que utilizou o hook useSearchParams(), que busca parametros na URL
    )
}