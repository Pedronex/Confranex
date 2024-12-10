import { CreateParticipantRange } from "@/components/CreateParticipantRange";
import { Header } from "@/components/Header";

export default function Cadastro() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Header />
      <div className="w-full flex h-[90vh] flex-col justify-center items-center">
        <CreateParticipantRange />
      </div>
    </main>
  );
}
