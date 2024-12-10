'use client'

import notFound from '@/assets/notfound.svg'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const route = useRouter();
  
  function handleBack() {
    route.back();
  }

  return (
    <main className="flex flex-col justify-center items-center gap-3 min-h-screen">
      <Image alt="Logo" src={notFound} className="w-3/4 max-w-xl" />
      <span className="p-4 text-2xl bg-slate-500 rounded font-black">
        Página Não Encontrada
      </span>
      <button
        type="button"
        title="Voltar para a tela anterior"
        className="p-2 text-2xl bg-pink-500 rounded font-black"
        onClick={handleBack}
      >
        Voltar
      </button>
    </main>
  );
}
