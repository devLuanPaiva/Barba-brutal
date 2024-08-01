"use client";
import useUser from "@/data/hooks/useUser";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../shared/Logo";
import { PhoneUtils } from "@barba/core";

export default function UserForm() {
  const [mode, setMode] = useState<'access' | 'register'>('access');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div className="flex justify-center items-center h-screen relative">
      <Image
        src="/banners/principal.webp"
        fill
        alt="Barbearia"
        className="object-cover"
      />
      <div
        className="
                flex flex-col justify-center items-center gap-10
                absolute top-0 left-0 w-full h-full
                bg-black/80 md:bg-transparent md:bg-gradient-to-r from-black/30 via-black/90 to-black/30
            "
      >
        <Logo />
        <div className="flex flex-col w-1/5 gap-5">
          <form className="flex flex-col gap-4 rounded">
            {mode === 'register' && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                className="bg-zinc-900 px-4 py-2 rounded"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="bg-zinc-900 px-4 py-2 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="bg-zinc-900 px-4 py-2 rounded "
            />
            {mode === 'register' && (
              <input
                type="tel"
                value={PhoneUtils.format(phone)}
                onChange={(e) => setPhone(PhoneUtils.unformat(e.target.value))}
                placeholder="Telefone"
                className="bg-zinc-900 px-4 py-2 rounded"
              />

            )}
            <div className="flex gap-5">
              <button onClick={submit} className="button bg-green-600 flex-1">
                {mode === 'access' ? 'Entrar' : 'Cadastrar'}
              </button>
              <button
                onClick={() => {
                  router.push('/')
                }}
                className="button flex-1"
              >
                Cancelar
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
        </div>
      </div>
    </div>
  );
}
