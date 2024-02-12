import { CostumerEntity } from '@/core/entities/costumer'
import { CostumerRepository } from '../costumer-respository'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { db } from '@/lib/drizzle'
import { costumerSchema } from '@drizzle/schema/costumer'
import { eq } from 'drizzle-orm'

export class DrizzleCostumerRepository implements CostumerRepository {
  private db: NodePgDatabase

  constructor() {
    this.db = db
  }

  async findById(costumerId: string): Promise<CostumerEntity | null> {
    const costumer = await this.db
      .select()
      .from(costumerSchema)
      .where(eq(costumerSchema.id, costumerId))
      .limit(1)

    if (!costumer.length) {
      return null
    }

    return CostumerEntity.create(costumer[0])
  }
  async updateBalance(
    costumer: CostumerEntity,
    balance: number,
  ): Promise<CostumerEntity> {
    await this.db
      .update(costumerSchema)
      .set({ balance: costumer.balance + balance })
      .where(eq(costumerSchema.id, costumer.id))

    costumer.balance += balance

    return costumer
  }
}
