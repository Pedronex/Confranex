import { NextResponse } from "next/server";

const API_SERVER = process.env.API_SERVER;

export async function GET() {
  if (!API_SERVER) {
    return NextResponse.json({ error: "API_SERVER not found" });
  }

  try {
    const awards = await fetch(`${API_SERVER}/award`);

    const result = await awards.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao chamar a API:", error);
    return NextResponse.json({ error: "Erro ao chamar a API" });
  }
}
