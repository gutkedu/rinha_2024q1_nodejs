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
    costumerId: integer('costumerId').references(() => costumerSchema.id),
    value: integer('value').default(0).notNull(),
    transactionType: varchar('transactionType'),
    description: varchar('description', { length: 10 }),
    createdAt: timestamp('createdAt').defaultNow(),
  },
  (table) => ({
    costumerTransactionIdx: index('costumerTransactionIdx').on(
      table.costumerId,
    ),
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

export const balanceSchema = pgTable(
  'balances',
  {
    id: serial('id').primaryKey(),
    costumerId: integer('costumerId').references(() => costumerSchema.id),
    value: integer('value').default(0).notNull(),
  },
  (table) => ({
    costumerBalanceIdx: index('costumerBalanceIdx').on(table.costumerId),
  }),
)

export type BalanceInsert = typeof balanceSchema.$inferInsert
export type BalanceSelect = typeof balanceSchema.$inferSelect

export const costumerSchema = pgTable('costumers', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  limit: integer('limit').notNull(),
})

export const costumerOneToManyTransactions = relations(
  transactionSchema,
  ({ many }) => ({
    transactions: many(transactionSchema),
  }),
)

export const costumerOneToOneBalance = relations(balanceSchema, ({ one }) => ({
  balance: one(balanceSchema),
}))
export type CostumerInsert = typeof costumerSchema.$inferInsert
export type CostumerSelect = typeof costumerSchema.$inferSelect
