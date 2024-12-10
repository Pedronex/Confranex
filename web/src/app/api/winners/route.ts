import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const API_SERVER = process.env.API_SERVER;

  if (!API_SERVER) {
    return NextResponse.json({ error: "API_SERVER not found" });
  }

  try {
    const winners = await fetch(`${API_SERVER}/lottery/`);

    const result = await winners.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return NextResponse.json({ error: "Erro ao chamar a API" });
  }
}
