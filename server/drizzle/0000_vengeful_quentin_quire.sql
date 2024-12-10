CREATE TABLE IF NOT EXISTS "award" (
	"id" serial PRIMARY KEY NOT NULL,
	"sequence" text NOT NULL,
	"name" text NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lot" (
	"id" serial PRIMARY KEY NOT NULL,
	"numberLot" integer DEFAULT 0 NOT NULL,
	"idParticipant" integer NOT NULL,
	"idAward" integer NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "participant" (
	"id" serial PRIMARY KEY NOT NULL,
	"numberTicket" text NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lot" ADD CONSTRAINT "lot_idParticipant_participant_id_fk" FOREIGN KEY ("idParticipant") REFERENCES "public"."participant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lot" ADD CONSTRAINT "lot_idAward_award_id_fk" FOREIGN KEY ("idAward") REFERENCES "public"."award"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
