"use client";
import useUser from "@/data/hooks/useUser";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../shared/Logo";
import { PhoneUtils } from "@barba/core";
import { IconEye, IconEyeOff, IconMail, IconPassword, IconPhone, IconUser } from "@tabler/icons-react";

export default function UserForm() {
  const [mode, setMode] = useState<'access' | 'register'>('access');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [toggleButton, setToggleButton] = useState(false)

  const { user, login, register } = useUser();
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (user?.email) {
      const dest = params.get("destiny") as string;
      router.push(dest || '/');
    }
  }, [user, router, params]);

  async function submit(e: any) {
    e.preventDefault();
    if (mode === 'access') {
      await login({ email, password });
    } else {
      await register({ name, email, phone, password });
    }
    clearForm()

  }
  function clearForm() {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setMode('access')
  }

  function changeButton() {
    setToggleButton(!toggleButton)
  }
  return (
    <section className="flex justify-center items-center h-screen relative">
      <Image
        src="/banners/principal.webp"
        fill
        alt="Barbearia"
        className="object-cover"
      />
      <section className="flex flex-col justify-center items-center gap-10 absolute top-0 left-0 w-full h-full bg-black/80 md:bg-transparent 
      md:bg-gradient-to-r from-black/30 via-black/90 to-black/30">
        <Logo />
        <form className="flex flex-col justify-center items-center gap-4 rounded w-[35%]">
          {mode === 'register' && (
            <label className="w-[100%] flex justify-center relative">
              <IconUser size={20} className="absolute left-1 top-2.5" />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="bg-zinc-900  w-[100%] px-4 py-2 rounded indent-3"
              />
            </label>
          )}
          <label className="w-[100%] flex justify-center relative">
            <IconMail size={20} className="absolute left-1 top-2.5" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="bg-zinc-900 w-[100%] px-4 py-2 rounded indent-3"
            />
          </label>
          <label className="w-[100%] flex justify-center relative">
            <IconPassword size={20} className="absolute left-1 top-2.5" />
            <input
              required
              type={!toggleButton ? 'password' : 'text'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="bg-zinc-900 w-[100%] px-4 py-2 rounded indent-3"
            />
            <button onClick={(e) => { e.preventDefault(); changeButton() }} className="absolute top-2.5 right-3">
              {!toggleButton ? <IconEye size={20} /> : <IconEyeOff size={20} />}
            </button>
          </label>
          {mode === 'register' && (
            <label className="w-[100%] flex justify-center relative">
              <IconPhone size={20} className="absolute left-1 top-2.5" />
              <input
                required
                type="tel"
                value={PhoneUtils.format(phone)}
                onChange={(e) => setPhone(PhoneUtils.unformat(e.target.value))}
                placeholder="Telefone"
                className="bg-zinc-900 w-[100%] px-4 py-2 rounded indent-3"
              />
            </label>

          )}
          <div className="flex gap-5 w-[100%]">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push('/')
              }}
              className="button flex-1"
            >
              Cancelar
            </button>
            <button onClick={submit} className="button bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-base 
              md:text-lg py-2 px-4 rounded hover:from-green-600 hover:to-green-700 flex-1">
              {mode === 'access' ? 'Entrar' : 'Cadastrar'}
            </button>
          </div>
          <div className="flex gap-5 justify-center">
            {mode === 'access' ? (
              <button
                onClick={(e) => { e.preventDefault(); setMode('register') }}
                className="text-zinc-300 hover:text-white"
              >
                Ainda não tem conta? Cadastre-se!
              </button>
            ) : (
              <button
                onClick={(e) => { e.preventDefault(); setMode('access') }}
                className="text-zinc-300 hover:text-white"
              >
                Já tem conta? Entre na plataforma!
              </button>
            )}
          </div>
        </form>

      </section>
    </section>
  );
}
