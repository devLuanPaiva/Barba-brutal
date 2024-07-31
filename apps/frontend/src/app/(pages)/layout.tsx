"use client";
import { SectionProvider } from "@/data/contexts/SectionContext";
import { UserProvider } from "@/data/contexts/UserContext";

export default function Layout({ children }: any) {
  return (
    <SectionProvider>
      <UserProvider>{children}</UserProvider>
    </SectionProvider>
  )
}
