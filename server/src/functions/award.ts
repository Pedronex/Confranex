import Elysia, { t } from "elysia";
import { database } from "../db";
import { award } from "../db/schema";
import { eq } from "drizzle-orm";

export const awardRoute = new Elysia({ prefix: "award" })
  .use(database)
  .get("/", async ({ database }) => {
    // Apresenta todos os ganhadores
    return await database.select().from(award);
  })
  .post(
    "/create",
    async ({ database, body }) => {
      const { name, sequence } = body;

      const [hasName] = await database
        .select({ id: award.id })
        .from(award)
        .where(eq(award.name, name))
        .limit(1);

      if (hasName) {
        return { message: "Premio ja cadastrado" };
      }

      await database.insert(award).values({
        name,
        sequence,
      });

      return { message: "Premio cadastrado" };
    },
    {
      body: t.Object({
        name: t.String(),
        sequence: t.String(),
      }),
    }
  );
