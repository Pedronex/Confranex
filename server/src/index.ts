import { Elysia } from "elysia";
import { lotteryRoute } from "./functions/lottery";
import swagger from "@elysiajs/swagger";
import { database } from "./db";
import cors from "@elysiajs/cors";
import { participantRoute } from "./functions/participants";
import { awardRoute } from "./functions/award";

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .use(database)
  .use(awardRoute)
  .use(participantRoute)
  .use(lotteryRoute)
  .listen(process.env.PORT ?? 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
