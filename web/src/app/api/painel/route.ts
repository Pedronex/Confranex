import { NextResponse } from "next/server";

export async function GET() {
  const API_SERVER = process.env.API_SERVER;

  if (!API_SERVER) {
    return NextResponse.json({ error: "API_SERVER not found" });
  }

  try {
    const res = await fetch(`${API_SERVER}/lottery/painel`, {
      cache: "no-store",
    });

    const { winners, lastLot } = (await res.json()) as {
      winners: { numberTicket: number; award: string; sequence: string }[];
      lastLot: number;
    };

    return NextResponse.json({ winners, lastLot });
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return NextResponse.json({ error: "Erro ao chamar a API" });
  }
}
