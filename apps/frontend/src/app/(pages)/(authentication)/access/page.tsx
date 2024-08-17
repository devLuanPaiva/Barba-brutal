import LoadingComponent from "@/components/shared/LoadingComponent";
import UserForm from "@/components/user/UserForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <UserForm />
    </Suspense>
  );
}
