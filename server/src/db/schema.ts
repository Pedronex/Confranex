import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const participant = pgTable("participant", {
  id: serial("id").primaryKey().notNull(),
  numberTicket: text('numberTicket').notNull(),
  createdAt: date("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const award = pgTable("award", {
  id: serial("id").primaryKey().notNull(),
  sequence: text('sequence').notNull(),
  name: text("name").notNull(),
  createdAt: date("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const lot = pgTable("lot", {
  id: serial("id").primaryKey().notNull(),
  numberLot: integer("numberLot").notNull().default(0),
  idParticipant: integer("idParticipant")
    .references(() => participant.id)
    .notNull(),
  idAward: integer("idAward")
    .references(() => award.id)
    .notNull(),
  createdAt: date("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export type IParticipant = typeof participant.$inferSelect;
export type IParticipants = IParticipant[];

export type ILot = typeof lot.$inferSelect;
export type ILots = ILot[];

export type IAward = typeof award.$inferSelect;
export type IAwards = IAward[];
