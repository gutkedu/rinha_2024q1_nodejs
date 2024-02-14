import { BalanceEntity } from '@/core/entities/balance'
import { TransactionEntity } from '@/core/entities/transaction'
import { DbTxRepository } from '@/repositories/db-tx-repository'
import { createTxAndUpdateCostumerBalanceDto } from '@/repositories/dtos/db-tx-dtos'

export class InMemoryDbTxRepository implements DbTxRepository {
  public balanceItems: BalanceEntity[] = []
  public txItems: TransactionEntity[] = []

  async createTxAndUpdateCostumerBalance(
    payload: createTxAndUpdateCostumerBalanceDto,
  ): Promise<void> {
    const balance = this.balanceItems.find(
      (item) => item.costumerId === payload.costumerId,
    )

    if (balance) {
      balance.value = payload.balanceValue
    } else {
      this.balanceItems.push(
        BalanceEntity.create({
          costumerId: payload.costumerId,
          value: payload.balanceValue,
          id: Math.random(),
        }),
      )
    }

    this.txItems.push(payload.tx)
  }
}
