import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { costumerSchema } from './costumer'

export const transactionSchema = pgTable(
  'transactions',
  {
    id: varchar('id').primaryKey(),
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

export type TransactionInsert = typeof transactionSchema.$inferInsert
export type TransactionSelect = typeof transactionSchema.$inferSelect
