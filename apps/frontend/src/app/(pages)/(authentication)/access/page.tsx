import LoadingComponent from "@/components/shared/LoadingComponent";
import UserForm from "@/components/user/UserForm";
import Image from "next/image";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <UserForm />
    </Suspense>
  );
}
