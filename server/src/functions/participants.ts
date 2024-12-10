import Elysia, { t } from "elysia";
import { database } from "../db";
import { participant } from "../db/schema";
import { eq, inArray } from "drizzle-orm";

export const participantRoute = new Elysia({ prefix: "participant" })
  .use(database)
  .get("/", async ({ database }) => {
    // Apresenta todos os ganhadores
    return (
      await database
        .select({ numberTicket: participant.numberTicket })
        .from(participant)
        .orderBy(participant.createdAt)
    ).map((participant) => participant.numberTicket);
  })
  .post(
    "/create",
    async ({ database, body }) => {
      const { numberTicket, numbersTicket } = body;

      if (numberTicket) {
        const [hasNumber] = await database
          .select({ id: participant.id })
          .from(participant)
          .where(eq(participant.numberTicket, numberTicket))
          .limit(1);

        if (hasNumber) {
          return { message: "Pulseira já cadastrada" };
        }

        await database.insert(participant).values({
          numberTicket,
        });

        return { message: "Participante cadastrado" };
      }

      if (numbersTicket) {
        const participants = await database
          .select({ numbers: participant.numberTicket })
          .from(participant)
          .where(inArray(participant.numberTicket, numbersTicket));

        const result = await database
          .insert(participant)
          .values(
            numbersTicket
              .filter(
                (number) =>
                  !participants.find((value) => value.numbers === number.toString())
              )
              .map((number) => ({
                numberTicket: number.toString(),
              }))
          )
          .returning();

        return { message: `Criado ${result.length} participantes` };
      }
    },
    {
      body: t.Object({
        numberTicket: t.Optional(t.String()),
        numbersTicket: t.Optional(t.Array(t.Number())),
      }),
    }
  );
