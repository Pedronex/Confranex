import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { listAwards } = await request.json();
  const api = process.env.API_SERVER;

  if (!api) {
    return NextResponse.json({ error: "API_SERVER not found" });
  }

  try {
    await fetch(`${api}/lottery/sort`, {
      body: JSON.stringify({ listAwards, quantity: listAwards.length }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json({
      message: "Sorteio realizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return NextResponse.json({ error: "Erro ao chamar a API" });
  }
}

export async function GET(request: Request) {}
