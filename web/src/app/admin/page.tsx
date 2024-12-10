"use client";

import { Header } from "@/components/Header";
import { SortParticipant } from "@/components/SortParticipant";

export default function Admin() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <div className="w-full flex h-[90vh] flex-col justify-center gap-2 items-center">
        <SortParticipant />
      </div>
    </main>
  );
}
