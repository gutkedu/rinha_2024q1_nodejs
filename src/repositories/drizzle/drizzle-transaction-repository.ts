import { TransactionEntity } from '@/core/entities/transaction'
import { TransactionRepository } from '../transaction-repository'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { IntegrationError } from '@/shared/errors/integration-error'
import { desc, eq } from 'drizzle-orm'
import {
  costumerSchema,
  transactionSchema,
} from '@drizzle/schema/drizzle-schema'
import { db } from '@/app'

export class DrizzleTransactionRepository implements TransactionRepository {
  private db: NodePgDatabase

  constructor() {
    this.db = db
  }

  async create(data: TransactionEntity): Promise<TransactionEntity> {
    try {
      await this.db.insert(transactionSchema).values({
        id: transactionSchema.id.default,
        costumerId: data.costumerId,
        description: data.description,
        transactionType: data.transactionType,
        value: data.value,
      })

      return data
    } catch (error) {
      console.log(error)
      throw new IntegrationError('Error creating transaction.')
    }
  }
  async findLast10TransactionsByCostumerId(
    costumerId: string,
  ): Promise<TransactionEntity[]> {
    try {
      const transactions = await this.db
        .select({
          id: transactionSchema.id,
          costumerId: transactionSchema.costumerId,
          value: transactionSchema.value,
          transactionType: transactionSchema.transactionType,
          description: transactionSchema.description,
          createdAt: transactionSchema.createdAt,
        })
        .from(transactionSchema)
        .where(eq(transactionSchema.costumerId, costumerId))
        .orderBy(desc(transactionSchema.id))
        .limit(10)

      return transactions.map(TransactionEntity.fromDatabase)
    } catch (error) {
      console.log(error)
      throw new IntegrationError('Error finding transactions.')
    }
  }

  async createTransactionAndUpdateBalance(
    costumerId: string,
    balance: number,
    transaction: TransactionEntity,
  ): Promise<void> {
    try {
      await this.db.transaction(async (tx) => {
        await tx
          .select()
          .from(costumerSchema)
          .where(eq(costumerSchema.id, costumerId))
          .for('update')

        await tx
          .update(costumerSchema)
          .set({ balance })
          .where(eq(costumerSchema.id, costumerId))
          .execute()

        await tx.insert(transactionSchema).values({
          id: transactionSchema.id.default,
          costumerId: transaction.costumerId,
          description: transaction.description,
          transactionType: transaction.transactionType,
          value: transaction.value,
        })
      })
    } catch (error) {
      console.log(error)
      throw new IntegrationError('Error finding transactions.')
    }
  }
}
