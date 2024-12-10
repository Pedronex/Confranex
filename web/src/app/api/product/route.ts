import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name } = await request.json();
  const API_SERVER = process.env.API_SERVER;

  try{
    if (!API_SERVER) {
      return NextResponse.json({ error: "API_SERVER not found" });
    }

    await fetch(`${API_SERVER}/award/create`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json({ message: "Produto cadastrado com sucesso" });
  }catch (error) {
    console.error("Erro ao chamar a API:", error);
    return NextResponse.json({ error: "Erro ao chamar a API" });
  }

}