import Elysia, { t } from "elysia";
import { database } from "../db";
import { award, lot, participant } from "../db/schema";
import { Socket } from "./socket";
import { desc, eq, inArray, isNull } from "drizzle-orm";

export const lotteryRoute = new Elysia({ prefix: "lottery" })
  .use(database)
  .get("/", async ({ database }) => {
    // Apresenta todos os ganhadores
    const winners = await database
      .select({
        numberTicket: participant.numberTicket,
        award: award.name,
        sequence: award.sequence,
        lot: lot.numberLot,
      })
      .from(lot)
      .leftJoin(participant, eq(participant.id, lot.idParticipant))
      .leftJoin(award, eq(award.id, lot.idAward));

    return { winners };
  })
  .get("/painel", async ({ database }) => {
    // Apresenta todos os ganhadores
    const [lastLot] = await database
      .select({ lotLast: lot.numberLot })
      .from(lot)
      .orderBy(desc(lot.numberLot))
      .limit(1);

    const winners = await database
      .select({
        numberTicket: participant.numberTicket,
        award: award.name,
        sequence: award.sequence,
      })
      .from(lot)
      .leftJoin(participant, eq(participant.id, lot.idParticipant))
      .leftJoin(award, eq(award.id, lot.idAward))
      .where(eq(lot.numberLot, lastLot?.lotLast));

    return { winners, lastLot: lastLot?.lotLast };
  })
  .get(
    "/:bracelet",
    async ({ database, params }) => {
      const { bracelet } = params;

      // Valida se o participante está presente
      const [winner] = await database
        .select({ winner: participant.numberTicket })
        .from(lot)
        .leftJoin(participant, eq(participant.id, lot.idParticipant))
        .where(eq(participant.numberTicket, bracelet));

      // Apresenta se o participante ganhou
      return {
        isWinner: !!winner,
      };
    },
    {
      params: t.Object({
        bracelet: t.String(),
      }),
    }
  )
  .post(
    "/sort",
    async ({ database, body }) => {
      const { quantity, listAwards } = body;

      if (quantity <= 0) throw new Error("Quantidade inválida");
      if (listAwards.length < quantity) throw new Error("Quantidade inválida");

      // Coleta a url do socket
      const socketUrl = Bun.env.SOCKET_URL;

      // Valida se o socket está presente
      if (!socketUrl) {
        throw new Error("SOCKET_URL environment variable is not set");
      }

      // Monta o Socket
      const socket = new Socket(socketUrl);

      // Inicia o Sorteio
      const startEvent = new Date();
      socket.sendLoading(true);
      console.log("Começou Sortear");

      // Coleta os participantes para o sorteio
      const list = await database
        .select()
        .from(participant)
        .leftJoin(lot, eq(participant.id, lot.idParticipant))
        .where(isNull(lot.id));

      const [lastLot] = await database
        .select({ lotLast: lot.numberLot })
        .from(lot)
        .orderBy(desc(lot.id))
        .limit(1);

      // Remove os vencedores do sorteio e embaralha o restante
      const shuffledParticipants = shuffle(list);

      // Valida se tem participantes suficientes
      if (shuffledParticipants.length < quantity) {
        socket.sendLoading(false);
        return {
          error: "Não tem participantes o suficiente",
        };
      }

      // Atualiza os novos vencedores
      const inserted = await database
        .insert(lot)
        .values(
          shuffledParticipants
            .slice(0, quantity)
            .map(({ participant }, index) => ({
              idAward: listAwards[index],
              idParticipant: participant.id,
              numberLot: lastLot?.lotLast + 1 || 1,
            }))
        )
        .returning();

      // Envia os novos vencedores para o socket
      const winners = await database
        .select()
        .from(participant)
        .where(
          inArray(
            participant.id,
            inserted.map(({ idParticipant }) => idParticipant)
          )
        );

      socket.sendWinners(winners);

      // Comunica o tempo de duração do sorteio
      console.log("Terminou");
      const endEvent = new Date();
      const duration = endEvent.getTime() - startEvent.getTime();
      const ms = duration % 1000;
      const secs = Math.floor((duration / 1000) % 60);
      const mins = Math.floor((duration / 1000 / 60) % 60);
      console.log(`${mins}:${secs.toString().padStart(2, "0")}.${ms}`);

      setTimeout(() => socket.sendLoading(false), 5000);
      return;
    },
    {
      body: t.Object({
        quantity: t.Number(),
        listAwards: t.Array(t.Number()),
      }),
    }
  );

function shuffle<T>(array: T[]): T[] {
  let m = array.length;
  let t: T;
  let i: number;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
