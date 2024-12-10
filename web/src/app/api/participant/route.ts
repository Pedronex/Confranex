import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { numbersTicket, numberTicket } = await request.json();

  const API_SERVER = process.env.API_SERVER;

  if (!API_SERVER) {
    return NextResponse.json({ error: "API_SERVER not found" });
  }

  if (!numbersTicket && !numberTicket) {
    return NextResponse.json({ error: "Dados inválidos" });
  }

  try {
    const request = await fetch(`${API_SERVER}/participant/create`, {
      method: "POST",
      body: JSON.stringify({ numberTicket, numbersTicket }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(await request.json());

    return NextResponse.json({ message: "Sorteio realizado com sucesso" });
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return NextResponse.json({ error: "Erro ao chamar a API" });
  }
}
