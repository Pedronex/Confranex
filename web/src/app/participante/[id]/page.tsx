"use client";

import Image from "next/image";
import { useEffect, useState, use } from "react";

import { Header } from "@/components/Header";
import Party from "@/assets/party.svg";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [participant, setParticipant] = useState<IParticipant>();

  useEffect(() => {
    async function getParticipant() {
      const res = await fetch(`/api/participant/${params.id}`);

      const result = await res.json();
      console.log(result);
      if ("error" in result) {
        alert(result.error);
      } else {
        setParticipant(result);
      }
    }

    getParticipant();

    const intervalId = setInterval(() => {
      getParticipant();
    }, 500);
    return () => clearInterval(intervalId);
  }, [params.id]);

  return (
    <main className="flex flex-col items-center min-h-screen max-h-screen">
      <Header />
      <div className="h-[90vh] w-full flex items-center justify-center flex-col gap-7">
        <div className="w-4/5 h-fit bg-[#04BF68] inline-flex flex-col rounded-lg p-3 gap-2.5">
          <span className="w-full text-sm text-center font-bold">
            Número da Sorte
          </span>
          <span className="w-full text-xl text-center font-bold">
            {params.id.padStart(5, "0")}
          </span>
        </div>
        {participant?.isWinner ? (
          <div className="w-4/5 h-4/5 bg-[#04BF68] inline-flex flex-col items-center justify-center rounded-lg p-3 gap-2.5">
            <span className="w-full text-2xl text-center font-bold">
              Parabéns!!!!
            </span>
            <Image alt="Sucesso" src={Party} width={250} height={250} className="w-1/2" />
            <span className="w-full text-2xl text-center font-bold">
              Número Sorteado
            </span>
            <span className="w-full text-2xl text-center font-bold">
              Série {participant.lot}
            </span>
          </div>
        ) : (
          <div className="w-4/5 h-fit bg-slate-500 inline-flex flex-col rounded-lg p-3 gap-2.5">
            <span className="w-full text-sm text-center font-bold">
              Você ainda não foi sorteado
            </span>
            <span className="w-full text-xl text-center font-bold">
              Aguarde
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
