import { TransactionEntity } from '@/core/entities/transaction'
import { TransactionRepository } from '../transaction-repository'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { IntegrationError } from '@/shared/errors/integration-error'
import { desc, eq } from 'drizzle-orm'
import { transactionSchema } from '@drizzle/schema/drizzle-schema'
import { db } from '@/app'

export class DrizzleTransactionRepository implements TransactionRepository {
  private db: NodePgDatabase

  constructor() {
    this.db = db
  }

  async findLast10TransactionsByCostumerId(
    costumerId: number,
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

  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    try {
      await this.db.insert(transactionSchema).values({
        id: transaction.id,
        costumerId: transaction.costumerId,
        value: transaction.value,
        transactionType: transaction.transactionType,
        description: transaction.description,
      })

      return transaction
    } catch (error) {
      console.log(error)
      throw new IntegrationError('Error creating transaction.')
    }
  }
}
