import { relations } from 'drizzle-orm'
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
  serial,
} from 'drizzle-orm/pg-core'

export const transactionSchema = pgTable(
  'transactions',
  {
    id: serial('id').primaryKey(),
    costumerId: varchar('costumerId').references(() => costumerSchema.id),
    value: integer('value').default(0).notNull(),
    transactionType: varchar('transactionType'),
    description: varchar('description', { length: 10 }),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    costumerIdIdx: index('costumerIdIdx').on(table.costumerId),
  }),
)

export const transactionRelations = relations(transactionSchema, ({ one }) => ({
  costumer: one(costumerSchema, {
    fields: [transactionSchema.costumerId],
    references: [costumerSchema.id],
  }),
}))

export type TransactionInsert = typeof transactionSchema.$inferInsert
export type TransactionSelect = typeof transactionSchema.$inferSelect

export const costumerSchema = pgTable('costumers', {
  id: varchar('id').primaryKey(),
  limit: integer('limit').default(0).notNull(),
  balance: integer('balance').default(0).notNull(),
})

export const costumerRelations = relations(transactionSchema, ({ many }) => ({
  transactions: many(transactionSchema),
}))

export type CostumerInsert = typeof costumerSchema.$inferInsert
export type CostumerSelect = typeof costumerSchema.$inferSelect
