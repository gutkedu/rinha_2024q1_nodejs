import { CostumerEntity } from '@/core/entities/costumer'
import { CostumerRepository } from '../costumer-repository'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { balanceSchema, costumerSchema } from '@drizzle/schema/drizzle-schema'
import { db } from '@/app'
import { BalanceEntity } from '@/core/entities/balance'

export class DrizzleCostumerRepository implements CostumerRepository {
  private db: NodePgDatabase

  constructor() {
    this.db = db
  }

  async findById(costumerId: number): Promise<{
    costumer: CostumerEntity | null
    balance: BalanceEntity | null
  }> {
    const [response] = await this.db
      .select()
      .from(costumerSchema)
      .where(eq(costumerSchema.id, costumerId))
      .innerJoin(balanceSchema, eq(costumerSchema.id, balanceSchema.costumerId))
      .limit(1)

    if (!response) {
      return {
        costumer: null,
        balance: null,
      }
    }

    return {
      costumer: CostumerEntity.fromDatabase(response.costumers),
      balance: BalanceEntity.fromDatabase(response.balances),
    }
  }
}
