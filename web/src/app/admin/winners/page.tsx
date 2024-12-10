"use client";

import { useEffect, useState } from "react";

import gift from "@/assets/gift.svg";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Winners() {
  const [data, setData] = useState<
    {
      numberTicket: string;
      award: string;
      sequence: string;
      lot: number;
    }[]
  >([]);
  const [show, setShow] = useState(0);

  const route = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/winners");
      const data = await response.json();
      setData(data.winners);
      console.log(data.winners);
    }
    fetchData();
  }, []);

  function handleBack() {
    route.push("/admin");
  }

  if (data.length === 0) {
    return (
      <main className="flex min-h-screen flex-col">
        <Header />
        <div className="w-full flex h-[90vh] flex-col justify-center gap-2 items-center">
          <span className="w-full text-2xl text-center font-bold">
            Carregando...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col ">
      <Header />
      {Array.from(new Set(data.map((winners) => winners.lot))).map((lot) => (
        <button
          key={lot}
          type="button"
          className="text-3xl text-center font-black p-2 bg-slate-500"
          onClick={() => setShow(lot)}
        >
          Série: {lot}
        </button>
      ))}

      <div className="grid grid-cols-2 place-items-center w-full h-full ">
        {show !== 0 &&
          data
            .filter((winners) => winners.lot === show)
            .map((winners) => (
              <article
                key={winners.numberTicket}
                className="bg-[#04BF68] flex-row gap-2 w-4/5 justify-between inline-flex items-center rounded-xl p-3 m-4 h-fit"
              >
                <span className="text-white text-xl font-black w-fit pr-3">
                  {winners.sequence}
                </span>
                <span className="text-white text-xl font-black w-full border-r-2 border-l-2 text-center">
                  {winners.award}
                </span>
                <span className="text-white text-xl font-black">
                  {String(winners.numberTicket).padStart(5, "0")}
                </span>
              </article>
            ))}
        {show !== 0 && (
          <button
            className="text-3xl text-center font-black p-2 bg-slate-500 w-full"
            type="button"
            onClick={() => setShow(0)}
          >
            voltar
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => handleBack()}
        className="text-xl text-center font-black p-2 bg-pink-500 w-full"
      >
        Voltar para o Sorteio
      </button>
    </main>
  );
}
