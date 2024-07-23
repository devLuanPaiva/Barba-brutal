import UserForm from "@/components/user/UserForm";
import { Suspense } from "react";

export default function Page(){
    return(
        <Suspense fallback={<div>Carregando...</div>}>
            <UserForm/>
        </Suspense>
    )
}