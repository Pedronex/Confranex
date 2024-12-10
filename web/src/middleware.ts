import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith("/admin")) {
    let adminCookie = request.cookies.get("adminCookie");
    if (!adminCookie || adminCookie.value != btoa("approved")) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
  
  if (request.nextUrl.pathname.startsWith("/participante")) {
    let createCookie = request.cookies.get("createCookie");
    if (!createCookie || createCookie.value != btoa("approved")) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/participante/cadastro:path*",
    "/participante/faixa:path*",
  ],
};
