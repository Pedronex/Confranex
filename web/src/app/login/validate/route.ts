import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();
  console.log(password);
  if (password && password === "c@nfra2024") {
    (await cookies()).set("adminCookie", btoa("approved"));
    return NextResponse.json({ route: "/admin" });
  }

  if (password && password === "cadastro2024") {
    (await cookies()).set("createCookie", btoa("approved"));
    return NextResponse.json({ route: "/participante/cadastro" });
  }

  return NextResponse.json({ error: "senha inválida" });
}
