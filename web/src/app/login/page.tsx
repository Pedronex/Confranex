"use client";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const route = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/login/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const result = await res.json();

    if ("error" in result) {
      alert(result.error);
    } else {
      route.push(result.route);
    }
    setLoading(false);
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-row gap-2 p-5"
      >
        <label className="sr-only" htmlFor="password-input">
          Senha
        </label>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Digite a senha"
        />
        <button
          type="submit"
          className="flex-none rounded-md bg-slate-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
