import UpdateAppointment from "@/components/appointments/UpdateAppointment";
import LoadingComponent from "@/components/shared/LoadingComponent";
import { Suspense } from "react";

export default function EditAppointment() {
    return (
        <Suspense fallback={<LoadingComponent />}>
            <UpdateAppointment/>
        </Suspense>
    )
}