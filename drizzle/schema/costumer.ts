import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const costumerSchema = pgTable('costumers', {
  id: varchar('id').primaryKey(),
  limit: integer('limit').default(0).notNull(),
  balance: integer('balance').default(0).notNull(),
})

export type CostumerInsert = typeof costumerSchema.$inferInsert
export type CostumerSelect = typeof costumerSchema.$inferSelect
