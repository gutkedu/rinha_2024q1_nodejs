import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver'
import { BalanceRepository } from '../balance-repository'
import { db } from '@/app'
import { balanceSchema } from '@drizzle/schema/drizzle-schema'
import { eq, sql } from 'drizzle-orm'
import { IntegrationError } from '@/shared/errors/integration-error'

export class DrizzleBalanceRepository implements BalanceRepository {
  private db: NodePgDatabase

  constructor() {
    this.db = db
  }
  async updateBalanceByCostumerId(
    costumerId: number,
    value: number,
  ): Promise<void> {
    try {
      await this.db.transaction(
        async (trx) => {
          await trx.execute(sql`select pg_advisory_xact_lock(${costumerId})`)

          await trx
            .update(balanceSchema)
            .set({
              value,
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
      throw new IntegrationError('Error updating balance.')
    }
  }
}
