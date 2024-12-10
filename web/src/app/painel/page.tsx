"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Manager, type Socket } from "socket.io-client";

import Logo from "@/assets/Logo.png";
import { Card } from "@/components/card";
import { Gift } from "lucide-react";

export default function Home() {
  const [socket, setSocket] = useState<Socket>();
  const [data, setData] = useState<{ numberTicket: number; award: string, sequence: string }[]>(
    []
  );
  const [lot, setLot] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function handleWebSocket() {
      const manager = new Manager(`${window.location.hostname}:3333`, {
        path: "/client",
      });

      setSocket(manager.socket("/"));
    }

    handleWebSocket();
  }, []);

  if (socket) {
    socket.on("status activity", (payload) => {
      setLoading(payload.status);
    });
  }

  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `http://${window.location.hostname}:8002/lottery/painel`,
            {
              cache: "no-store",
            }
          );
          const { winners, lastLot } = (await res.json()) as {
            winners: { numberTicket: number; award: string,sequence: string }[];
            lastLot: number;
          };
          setLot(lastLot);
          setData(winners);
        } catch (error) {
          console.error("Erro ao chamar a API:", error);
        }
      };

      fetchData();
    }
  }, [loading]);

  return (
    <main className="flex min-h-screen flex-col justify-between overflow-x-hidden">
      <header className="flex flex-row p-3 w-screen justify-between border-b-2 ">
        <Image alt="Logo da OVG" src={Logo} className="object-contain" />
        <h2 className="text-5xl font-black">
          Confraternização {new Date().getFullYear()}
        </h2>
        <Image alt="Logo da OVG" src={Logo} className="object-contain" />
      </header>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <Gift
            size={"25%"}
            color="#04BF68"
            className="animate-[wiggle_1s_ease-in-out_infinite]"
          />
          <div className="flex flex-row gap-2 text-2xl">
            <strong className="animate-bounce">
              Sorteando
            </strong>
          </div>
        </div>
      ) : (
        <div className="inline-flex h-full flex-row justify-center flex-wrap w-screen items-center overflow-x-auto">
          {data.sort((a, b) => a.sequence.localeCompare(b.sequence)).map((participant) => (
            <Card
              key={participant.numberTicket + participant.award}
              sequence={participant.sequence}
              name={participant.award}
              number={participant.numberTicket}
            />
          ))}
        </div>
      )}

      <span className="text-3xl text-center font-black p-2 bg-slate-500 h-[5vh]">
        Série: {lot}
      </span>
    </main>
  );
}
