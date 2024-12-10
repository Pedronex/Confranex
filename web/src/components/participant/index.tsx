'use client'
import { useRouter } from "next/navigation";

interface Props {
  participant: IParticipant;
}

export function Participant({ participant }: Props) {
  const route = useRouter();

  function handleGetParticipant(numberTicket: number) {
    route.push(`/participante/${numberTicket}`);
  }

  return (
    <button
      onClick={() => handleGetParticipant(participant.numberTicket)}
      key={participant.id}
      className="bg-slate-500 p-2 text-2xl rounded w-full"
    >
      {String(participant.numberTicket).padStart(5, "0")}
    </button>
  );
}
