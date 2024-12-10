"use client";

import { Header } from "@/components/Header";
import { useState } from "react";

export default function ProductPage() {
  const [name, setName] = useState("");
  const [sequence, setSequence] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({ name, sequence }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if ("error" in result) {
      alert(result.error);
    } else {
      setName("");
      alert(result.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="w-full flex h-full flex-col justify-center gap-2 items-center">
        <form className="flex flex-row gap-2 w-1/2" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Sequência"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            required
            className="p-2 border-2 rounded"
          />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Nome do Produto"
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border-2 rounded"
          />
          <button type="submit" className="p-2 bg-green-500 text-white rounded">
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
