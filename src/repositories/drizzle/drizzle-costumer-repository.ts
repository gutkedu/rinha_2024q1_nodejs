import { CostumerEntity } from '@/core/entities/costumer'
import { CostumerRepository } from '../costumer-repository'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { costumerSchema } from '@drizzle/schema/drizzle-schema'
import { db } from '@/app'

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
  async updateBalance(costumerId: string, balance: number): Promise<void> {
    await this.db
      .update(costumerSchema)
      .set({ balance })
      .where(eq(costumerSchema.id, costumerId))
  }
}
