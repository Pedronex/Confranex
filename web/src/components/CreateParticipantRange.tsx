"use client";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export function CreateParticipantRange() {
  const [numberTicketStart, setNumberTicketStart] = useState("");
  const [numberTicketEnd, setNumberTicketEnd] = useState("");
  const [isLoading, setLoading] = useState(false);

  const route = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const numbersTicket: number[] = [];

    for (
      let index = Number(numberTicketStart);
      index <= Number(numberTicketEnd);
      index++
    ) {
      numbersTicket.push(index);
    }

    console.log(numbersTicket);

    const res = await fetch("/api/participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numbersTicket }),
    });
    const result = await res.json();

    if ("error" in result) {
      alert(result.error);
      setLoading(false);
      return;
    }

    console.log(result)

    alert(
      `Números da Sorte de ${numberTicketStart} até ${numberTicketEnd} cadastrado`
    );
    setLoading(false);
  }

  return (
    <form
      className="w-fit bg-pink-500 flex flex-col p-2 rounded items-center gap-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <span className="text-center text-neutral-100 text-sm font-bold">
        Cadastrar Números da Sorte por Faixa:
      </span>
      <div className="flex flex-row flex-wrap justify-between gap-2 w-fit">
        <input
          title="Número da Sorte inicio"
          type="number"
          required
          value={numberTicketStart}
          onChange={(e) => setNumberTicketStart(e.target.value)}
          placeholder="De"
          className="p-2 rounded text-lg text-black w-2/5"
        />
        <input
          title="Número da Sorte fim"
          type="number"
          required
          placeholder="Para"
          value={numberTicketEnd}
          onChange={(e) => setNumberTicketEnd(e.target.value)}
          className="p-2 rounded text-lg text-black w-2/5"
        />
      </div>
      <button
        type="submit"
        className="rounded p-2 w-full bg-slate-500 font-bold"
        disabled={isLoading}
      >
        {isLoading
          ? "Adicionando Números da Sorte..."
          : "Cadastrar Número da Sorte"}
      </button>
      <button
        type="button"
        onClick={() => route.push("/participante/cadastro")}
        className="rounded p-2 w-full bg-slate-500 font-bold"
        disabled={isLoading}
      >
        Cadastrar por Número
      </button>
    </form>
  );
}
