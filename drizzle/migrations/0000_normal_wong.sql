CREATE TABLE IF NOT EXISTS "costumers" (
	"id" varchar PRIMARY KEY NOT NULL,
	"limit" integer DEFAULT 0 NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"costumerId" varchar,
	"value" integer DEFAULT 0 NOT NULL,
	"transactionType" varchar,
	"description" varchar(10),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "costumerIdIdx" ON "transactions" ("costumerId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_costumerId_costumers_id_fk" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
