"use client";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

export function SortParticipant() {
  const [isLoading, setLoading] = useState(false);
  const [awards, setAwards] = useState<IAward[]>([]);
  const [selectedAward, setSelectedAward] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);

  const routes = useRouter();

  useEffect(() => {
    async function getProducts() {
      const res = await fetch("/api/award");
      const result = (await res.json()) as
        | {
            error: string;
          }
        | IAward[];

      if ("error" in result) {
        alert(result.error);
      } else {
        setAwards(result);
      }
    }

    if (awards.length === 0) {
      getProducts();
    }
  }, [awards.length]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/sort", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listAwards: selected }),
    });
    const result = await res.json();
    setLoading(false);

    if ("error" in result) {
      alert(result.error);
    } else {
      alert(result.message);
    }
  }

  function redirectToList() {
    routes.push("/admin/winners");
  }

  return (
    <>
      <form
        className="w-3/4 bg-pink-500 flex flex-col p-2 rounded items-center gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <span className="text-center text-neutral-100 text-sm font-bold w-full">
          Selecione os prêmios
        </span>
        <div className="flex flex-row flex-wrap gap-3 items-center justify-between w-full">
          <select
            onChange={(e) => setSelectedAward(Number(e.target.value))}
            className="p-1 rounded text-lg text-black w-full h-12"
          >
            <option value={0} disabled>
              Selecione
            </option>
            {awards.map((award) => (
              <option key={award.id} value={award.id}>
                {award.sequence} - {award.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSelected([...selected, selectedAward])}
            className="p-1 rounded text-lg text-black w-1/3 h-12 bg-slate-500 font-bold"
          >
            Adicionar
          </button>
          <button
            type="button"
            onClick={() => setSelected(selected.slice(0, -1))}
            className="p-1 rounded text-lg text-black w-1/3 h-12 bg-slate-500 font-bold"
          >
            Remover
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Prêmio</th>
            </tr>
          </thead>
          <tbody className="w-full bg-slate-300">
            {selected.map((id, index) => (
              <tr
                key={`${id}-${index.toString()}`}
                className="w-full border-b-2 border-black"
              >
                <td className="text-center">
                  {awards.find((a) => a.id === id)?.name}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-right font-bold">
                {selected.length} prêmios
              </td>
            </tr>
          </tfoot>
        </table>

        <button
          type="submit"
          className="rounded p-2 w-full bg-slate-500 font-bold"
          disabled={isLoading}
        >
          {isLoading ? "Sorteando..." : "Sortear"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => redirectToList()}
        className="rounded p-2 w-2/5 bg-slate-500 font-bold"
      >
        Ganhadores
      </button>
    </>
  );
}
