// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/node-postgres";
import Elysia from "elysia";
// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

export const database = new Elysia().decorate("database", db);
