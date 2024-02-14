CREATE UNLOGGED TABLE IF NOT EXISTS "balances" (
	"id" serial PRIMARY KEY NOT NULL,
	"costumerId" integer,
	"value" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNLOGGED TABLE IF NOT EXISTS "costumers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"limit" integer NOT NULL
);
--> statement-breakpoint
CREATE UNLOGGED TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"costumerId" integer,
	"value" integer DEFAULT 0 NOT NULL,
	"transactionType" varchar,
	"description" varchar(10),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "costumerBalanceIdx" ON "balances" ("costumerId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "costumerTransactionIdx" ON "transactions" ("costumerId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "balances" ADD CONSTRAINT "balances_costumerId_costumers_id_fk" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_costumerId_costumers_id_fk" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
