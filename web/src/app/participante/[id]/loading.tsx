"use client";

import { Header } from "@/components/Header";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-col items-center min-h-screen max-h-screen">
      <Header />
      <div className="h-[90vh] w-full flex items-center justify-center flex-col gap-7">
        <div className="w-4/5 h-fit bg-[#04BF68] inline-flex flex-col rounded-lg p-3 gap-2.5">
          <span className="w-full text-sm text-center font-bold">
            Número da Sorte
          </span>
          <span className="w-full text-xl text-center font-bold">00000</span>
        </div>
        <div className="w-4/5 h-fit bg-slate-500 inline-flex flex-col rounded-lg p-3 gap-2.5">
          <span className="w-full text-sm text-center font-bold">Aguarde</span>
          <span className="w-full text-xl text-center font-bold">Carregando...</span>
        </div>
      </div>
    </main>
  );
}
