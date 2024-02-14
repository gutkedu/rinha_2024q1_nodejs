import { TransactionEntity } from '@/core/entities/transaction'
import { DbTxRepository } from '../db-tx-repository'
import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver'
import { db } from '@/app'
import { eq, sql } from 'drizzle-orm'
import {
  balanceSchema,
  transactionSchema,
} from '@drizzle/schema/drizzle-schema'

export class DrizzleDbTxRepository implements DbTxRepository {
  private db: NodePgDatabase

  constructor() {
    this.db = db
  }

  async createTxAndUpdateCostumerBalance({
    costumerId,
    tx,
    balanceValue,
  }: {
    balanceValue: number
    costumerId: number
    tx: TransactionEntity
  }): Promise<void> {
    try {
      await this.db.transaction(
        async (trx) => {
          await trx.execute(sql`select pg_advisory_xact_lock(${costumerId})`)

          await trx.insert(transactionSchema).values({
            id: transactionSchema.id.default,
            costumerId: tx.costumerId,
            description: tx.description,
            transactionType: tx.transactionType,
            value: tx.value,
          })

          await trx
            .update(balanceSchema)
            .set({
              value: balanceValue,
            })
            .where(eq(balanceSchema.costumerId, costumerId))
        },
        {
          isolationLevel: 'read committed',
          accessMode: 'read write',
        },
      )
    } catch (error) {
      console.log(error)
      throw new Error('Error creating transaction.')
    }
  }
}
