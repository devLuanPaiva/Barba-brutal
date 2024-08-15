"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import useUser from "@/data/hooks/useUser";
import { useRouter } from "next/navigation";
import { UserMenuProps } from "@/data/interfaces";

export default function UserMenu(props: Readonly<UserMenuProps>) {
  const { user, logout } = useUser()
  const router = useRouter()
  return props.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <article className="flex gap-2 items-center">
          <section className="flex flex-col items-end">
            <h2 className="text-lg font-bold leading-5">
              {props.user.name}
            </h2>
            <p className="text-xs text-zinc-400">{props.user.email}</p>
          </section>
          <figure className="flex justify-center items-center rounded-full overflow-hidden w-10 h-10 p-1 bg-zinc-700">
            <Image
              src="/avatar.png"
              width={40}
              height={40}
              alt={props.user.name ?? ''}
            />
          </figure>
        </article>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu Usuário</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.barber && (
          <DropdownMenuItem onClick={() => router.push('/schedule')}>
            Minha agenda
          </DropdownMenuItem>
        )}
        {!user?.barber && (
          <DropdownMenuItem onClick={() => router.push('/myAppointments')}>
            Meus agendamentos
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => router.push('/appointment')}>Agendar agora</DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
}
